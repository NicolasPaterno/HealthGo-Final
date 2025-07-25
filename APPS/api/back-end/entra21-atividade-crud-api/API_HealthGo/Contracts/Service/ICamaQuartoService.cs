﻿using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

namespace API_HealthGo.Contracts.Service
{
    public interface ICamaQuartoService
    {
        Task<CamaQuartoGetAllResponse> GetAll();

        Task<CamaQuartoEntity> GetById(int id);

        Task<MessageResponse> Post(CamaQuartoInsertDTO camaQuarto);

        Task<MessageResponse> Update(CamaQuartoEntity camaQuarto);

        Task<MessageResponse> Delete(int id);
    }
}
