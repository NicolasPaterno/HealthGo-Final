﻿using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface IEstadoService
    {
        Task<MessageResponse> Delete(int id);

        Task<EstadoGetAllResponse> GetAll();

        Task<EstadoEntity> GetById(int id);

        Task<MessageResponse> Post(EstadoInsertDTO estado);

        Task<MessageResponse> Update(EstadoEntity estado);
    }
}