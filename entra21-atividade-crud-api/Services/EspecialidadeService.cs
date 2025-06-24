using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using MinhaPrimeiraApi.Contracts.Repository;
using MinhaPrimeiraApi.Contracts.Service;
using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Repository;
using MinhaPrimeiraApi.Response;
using MinhaPrimeiraApi.Response.Especialidade;
using Mysqlx;

namespace MinhaPrimeiraApi.Services
{
    public class EspecialidadeService : IEspecialidadeService
    {
        private IEspecialidadeRepository _repository;

        public EspecialidadeService(IEspecialidadeRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Especialidade excluida com sucesso!"
            };
       }

        public async Task <EspecialidadeGetAllResponse> GetAll()
        {
            return new EspecialidadeGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<EspecialidadeEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(EspecialidadeInsertDTO especialidade)
        {
            await _repository.Insert(especialidade);
            return new MessageResponse
            {
                Message = "Especialidade inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(EspecialidadeEntity especialidade)
        {
            await _repository.Update(especialidade);
            return new MessageResponse
            {
                Message = "Especialidade alterada com sucesso!"
            };
        }
    }
}
