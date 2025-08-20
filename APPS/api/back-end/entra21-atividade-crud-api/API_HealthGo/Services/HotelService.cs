using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

namespace API_HealthGo.Services
{
    public class HotelService : IHotelService
    {
        private IHotelRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ICidadeRepository _cidadeRepository;
        private readonly IEstadoRepository _estadoRepository;

        public HotelService(IHotelRepository repository, IHttpContextAccessor httpContextAccessor, 
                          ICidadeRepository cidadeRepository, IEstadoRepository estadoRepository)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
            _cidadeRepository = cidadeRepository;
            _estadoRepository = estadoRepository;
        }

        public async Task<HotelGetAllResponse> GetAll()
        {
            return new HotelGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<HotelEntity> GetHotelById(int id)
        {
            return await _repository.GetHotelById(id);
        }

        public async Task<MessageResponse> Post(HotelInsertDTO hotel, int pessoaId)
        {
            // Log de debug para coordenadas
            Console.WriteLine($"DEBUG - Hotel recebido:");
            Console.WriteLine($"  Nome: {hotel.Nome}");
            Console.WriteLine($"  Latitude: {hotel.Latitude}");
            Console.WriteLine($"  Longitude: {hotel.Longitude}");
            Console.WriteLine($"  Tipo Latitude: {hotel.Latitude?.GetType()}");
            Console.WriteLine($"  Tipo Longitude: {hotel.Longitude?.GetType()}");

            // Validações básicas
            if (string.IsNullOrWhiteSpace(hotel.Nome))
            {
                return new MessageResponse
                {
                    Message = "Nome do hotel é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.CNPJ))
            {
                return new MessageResponse
                {
                    Message = "CNPJ é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.Tipo))
            {
                return new MessageResponse
                {
                    Message = "Tipo do hotel é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.Email))
            {
                return new MessageResponse
                {
                    Message = "Email é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.Telefone))
            {
                return new MessageResponse
                {
                    Message = "Telefone é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.CEP))
            {
                return new MessageResponse
                {
                    Message = "CEP é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.Bairro))
            {
                return new MessageResponse
                {
                    Message = "Bairro é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.Rua))
            {
                return new MessageResponse
                {
                    Message = "Rua é obrigatória!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.NumeroEndereco))
            {
                return new MessageResponse
                {
                    Message = "Número do endereço é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.CidadeNome))
            {
                return new MessageResponse
                {
                    Message = "Nome da cidade é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.EstadoSigla))
            {
                return new MessageResponse
                {
                    Message = "Sigla do estado é obrigatória!"
                };
            }

            // Buscar estado pela sigla
            var estados = await _estadoRepository.GetAll();
            var estado = estados.FirstOrDefault(e => e.Sigla.Equals(hotel.EstadoSigla, StringComparison.OrdinalIgnoreCase));
            
            if (estado == null)
            {
                return new MessageResponse
                {
                    Message = $"Estado com sigla '{hotel.EstadoSigla}' não encontrado!"
                };
            }

            // Buscar cidade pelo nome e estado
            var cidades = await _cidadeRepository.GetAll();
            var cidade = cidades.FirstOrDefault(c => 
                c.Nome.Equals(hotel.CidadeNome, StringComparison.OrdinalIgnoreCase) && 
                c.Estado_Id == estado.Id);
            
            if (cidade == null)
            {
                return new MessageResponse
                {
                    Message = $"Cidade '{hotel.CidadeNome}' não encontrada no estado '{estado.Nome}'!"
                };
            }

            // Criar o DTO para inserção no repositório
            var hotelInsert = new HotelInsertDTO
            {
                CNPJ = hotel.CNPJ,
                Nome = hotel.Nome,
                Tipo = hotel.Tipo,
                Email = hotel.Email,
                Telefone = hotel.Telefone,
                Site = hotel.Site,
                Acessibilidade = hotel.Acessibilidade,
                CEP = hotel.CEP,
                Bairro = hotel.Bairro,
                Rua = hotel.Rua,
                NumeroEndereco = hotel.NumeroEndereco,
                Descricao = hotel.Descricao,
                Ativo = hotel.Ativo,
                DataInicio = hotel.DataInicio,
                Cidade_Id = cidade.Id,
                Pessoa_Id = pessoaId,
                Latitude = hotel.Latitude,
                Longitude = hotel.Longitude
            };

            await _repository.Insert(hotelInsert);
            return new MessageResponse
            {
                Message = "Hotel inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(HotelEntity hotel)
        {
            await _repository.Update(hotel);
            return new MessageResponse
            {
                Message = "Hotel atualizado com sucesso!"
            };
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Hotel deletado com sucesso!"
            };
        }

        public async Task<HotelGetAllResponse> GetHotelsByPessoaId(int pessoaId)
        {
            var hotels = await _repository.GetHotelsByPessoaId(pessoaId);
            return new HotelGetAllResponse
            {
                Data = hotels
            };
        }
    }
}
