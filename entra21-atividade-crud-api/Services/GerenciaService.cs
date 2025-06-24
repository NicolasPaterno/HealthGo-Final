using APIHealthGo.Contracts.Service;
using APIHealthGo.Response;
using Microsoft.AspNetCore.Mvc;
using MinhaPrimeiraApi.Contracts.Infrastructure;
using MyFirstCRUD.Contracts.Repository;
using MyFirstCRUD.DTO;
using MyFirstCRUD.Entity;
using MyFirstCRUD.Repository;
using System.Security.Cryptography.X509Certificates;

namespace APIHealthGo.Services
{
    public class GerenciaService : IGerenciaService
    {
        private IGerenciaRepository _repository;

        public GerenciaService(IGerenciaRepository repository)
        {
            _repository = repository;
        }

        public async Task<GerenciaGetAllResponse> GetAllGerencia()
        {
            return new GerenciaGetAllResponse
            {
                Data = await _repository.GetAllGerencia()
            };
        }
        public async Task<GerenciaEntity> GetGerenciaById(int id)
        {
            return await _repository.GetGerenciaById(id);
        }
        public async Task<MessageResponse> Post(GerenciaInsertDTO gerencia)
        {
            await _repository.InsertGerencia(gerencia);
            return new MessageResponse
            {
                message = "Gerente inserido com sucesso!!"
            };
        }
        public async  Task<MessageResponse> Update(GerenciaEntity gerencia)
        {
            await _repository.UpdateGerencia(gerencia);
            return new MessageResponse
            {
                message = "Gerente atualizado com sucesso!!"
            };
        }
        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.DeleteGerencia(id);
            return new MessageResponse
            {
                message = "Gerente Removido com sucesso!!"
            };
        }
    }
}
