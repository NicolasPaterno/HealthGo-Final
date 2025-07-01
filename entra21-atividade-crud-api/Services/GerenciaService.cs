using API_HealthGo.Contracts.Repository;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;
using Microsoft.AspNetCore.Mvc;
using MinhaPrimeiraApi.Contracts.Infrastructure;
using MyFirstCRUD.Repository;
using System.Security.Cryptography.X509Certificates;

namespace API_HealthGo.Services
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
                Message = "Gerente inserido com sucesso!!"
            };
        }
        public async Task<MessageResponse> Update(GerenciaEntity gerencia)
        {
            await _repository.UpdateGerencia(gerencia);
            return new MessageResponse
            {
                Message = "Gerente atualizado com sucesso!!"
            };
        }
        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.DeleteGerencia(id);
            return new MessageResponse
            {
                Message = "Gerente Removido com sucesso!!"
            };
        }
    }
}
