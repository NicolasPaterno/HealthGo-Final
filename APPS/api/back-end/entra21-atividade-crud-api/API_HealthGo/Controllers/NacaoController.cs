﻿using Microsoft.AspNetCore.Mvc;
using API_HealthGo.Response;
using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Contracts.Service;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NacaoController : ControllerBase
    {
        private INacaoService _service;

        public NacaoController(INacaoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<NacaoGetAllResponse>> Get()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NacaoEntity>> GetById(int id)
        {
            return Ok(await _service.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<MessageResponse>> Post(NacaoInsertDTO nacao)
        {
            return Ok(await _service.Post(nacao));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(NacaoEntity nacao)
        {
            return Ok(await _service.Update(nacao));
        }
    }
}