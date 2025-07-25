﻿using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_HealthGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LembreteController : ControllerBase
    {
        private ILembreteService _service;

        public LembreteController(ILembreteService lembreteService)
        {
            _service = lembreteService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllLembrete());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLembreteById(int id)
        {
            return Ok(await _service.GetLembreteById(id));
        }

        [HttpGet("Pessoa/{pessoaId}")]
        [Authorize]
        public async Task<IActionResult> GetLembreteByPessoaId(int pessoaId)
        {
            return Ok(await _service.GetLembreteByPessoaId(pessoaId));
        }

        [HttpPost]
        [Authorize] 
        public async Task<ActionResult<MessageResponse>> Post(LembreteInsertDTO lembrete)
        {
            return Ok(await _service.Post(lembrete));
        }

        [HttpPut]
        public async Task<ActionResult<MessageResponse>> Update(LembreteEntity lembrete)
        {
            return Ok(await _service.Update(lembrete));
        }

        [HttpDelete("{id}")] 
        [Authorize] 
        public async Task<ActionResult<MessageResponse>> Delete(int id)
        {
            return Ok(await _service.Delete(id));
        }

    }
}