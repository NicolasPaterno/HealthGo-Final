using entra21_atividade_crud_api.Contracts.Repository;
using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MyFirstCRUD.Repository;

namespace entra21_atividade_crud_api.Services
{
    public class PessoaService : IPessoaService
    {

        private IPessoaRepository _repository;

        public PessoaService(IPessoaRepository repository)
        {
            _repository = repository;
        }

        public async Task<PessoaGetAllResponse> GetAllPessoa()
        {
            return new PessoaGetAllResponse
            {
                Data = await _repository.GetAllPessoa()
            };
        }
        public async Task<PessoaEntity> GetPessoaById(int id)
        {
            return await _repository.GetPessoaById(id);
        }

        private void ValidatePassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password) || password.Length < 8)
            {
                throw new ArgumentException("A senha deve ter no mínimo 8 caracteres.");
            }

            if (!password.Any(char.IsUpper))
            {
                throw new ArgumentException("A senha deve conter pelo menos uma letra maiúscula.");
            }

            // Verify if the password contains at least one lowercase letter
            if (!password.Any(c => !char.IsLetterOrDigit(c)))
            {
                throw new ArgumentException("A senha deve conter pelo menos um caractere especial (ex: !@#$&*).");
            }
        }

        public async Task<MessageResponse> Post(PessoaInsertDTO pessoaDto)
        {
            ValidatePassword(pessoaDto.Senha);

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(pessoaDto.Senha);
            pessoaDto.Senha = passwordHash;

            await _repository.InsertPessoa(pessoaDto); // Chama o repositório para inserir os dados

            return new MessageResponse
            {
                Message = "Pessoa inserida com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(PessoaEntity pessoa)
        {
            await _repository.UpdatePessoa(pessoa);
            return new MessageResponse
            {
                Message = "Pessoa atualizada com sucesso!"
            };
        }
        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.DeletePessoa(id);
            return new MessageResponse
            {
                Message = "Pessoa Excluída com sucesso"
            };
        }

    }
}


