using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Contracts.Services;
using MinhaPrimeiraApi.Response;
using MinhaPrimeiraApi.Contracts.Repository;
using MinhaPrimeiraApi.Response.Aeroporto;
using MinhaPrimeiraApi.DTO.Aeroporto;

namespace MinhaPrimeiraApi.Services
{
    public class AeroportoService : IAeroportoService
    {
        
        private IAeroportoRepository _repository;

        public AeroportoService(IAeroportoRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Aeroporto excluido com sucesso!"
            };
        }

        public async Task<AeroportoGetAllResponse> Get(int? cidade_Id)
        {
            var allAeroports = await _repository.GetAll(); // Retorna List<AeroportoEntity>

            if (cidade_Id != 0)
            {
                allAeroports = allAeroports.Where(x => x.Cidade_id == cidade_Id.Value); // filtragem por LINQ

                var aeroportsFiltered = allAeroports.Select(aeroporto => new AeroportoEntity // teve que ser Entity pra eu n perder a cabeça
                {
                    Nome = aeroporto.Nome,
                    CodigoIata = aeroporto.CodigoIata,
                    Cidade_id = aeroporto.Cidade_id
                });

                return new AeroportoGetAllResponse
                {
                    Data = aeroportsFiltered
                };
            }
            else
            {
                return new AeroportoGetAllResponse
                {
                    Data = allAeroports
                };
            }
        }

        //public async Task<AeroportoGetByFilterResponse> GetByFilter(Aeroporto_Cidade_Id listToFilter)
        //{
        //    var result = await _repository.GetByFilter(listToFilter); // Retorna List<AeroportoEntity>

        //    if (listToFilter.Cidade_id.HasValue)
        //    {
        //        result = result.Where(x => x.Cidade_id == listToFilter.Cidade_id.Value);
        //    }
           
        //    return new AeroportoGetByFilterResponse
        //    {
        //        Data = result
        //    };
        //}

        //public async Task<AeroportoGetByFilterResponse> GetByFilter(AeroportoDTO filtro)
        //{
        //    var all = await _repository.GetAllAsync();

        //    // Aplica filtros manualmente com ifs
        //    if (filtro.Cidade_id.HasValue)
        //    {
        //        all = all.Where(a => a.Cidade_id == filtro.Cidade_id.Value);
        //    }

        //    // Aqui você pode aplicar outros ifs para Nome e CodigoIata, se quiser

        //    var result = all.Select(a => new AeroportoDTO
        //    {
        //        Nome = a.Nome,
        //        CodigoIata = a.CodigoIata,
        //        Cidade_id = a.Cidade_id
        //    });

        //    return new AeroportoGetByFilterResponse { Data = result };
        //}



        public async Task<AeroportoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(AeroportoDTO aeroporto)
        {
            await _repository.Insert(aeroporto);
            return new MessageResponse
            {
                Message = "Aeroporto inserido com sucesso!"
            };

        }

        public async Task<MessageResponse> Update(AeroportoEntity aeroporto)
        {
            await _repository.Update(aeroporto);
            return new MessageResponse
            {
                Message = "Aeroporto alterado com sucesso"
            };
        }

        
    }
}