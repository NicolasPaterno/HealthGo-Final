﻿using Microsoft.AspNetCore.Mvc;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Response;
using API_HealthGo.Entity;
using API_HealthGo.DTO;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PassagemController : ControllerBase
    {
        private IPassagemService _service;

        public PassagemController(IPassagemService passagemService)
        {
            _service = passagemService;
        }

        [HttpGet]
        public async Task<ActionResult<PassagemGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PassagemEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(PassagemInsertDTO passagem)
        {
            return Ok(await _service.Post(passagem));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(PassagemEntity passagem)
        {
            return Ok(await _service.Update(passagem));
        }
    }
}

