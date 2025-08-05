using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Services
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
        public async Task<MessageResponse> ChangePassword(ChangePasswordDTO changePasswordDto)
        {
            var pessoa = await _repository.GetPessoaById(changePasswordDto.UserId);
            if (pessoa == null)
            {
                throw new ArgumentException("Usuário não encontrado.");
            }

            if (!BCrypt.Net.BCrypt.Verify(changePasswordDto.CurrentPassword, pessoa.Senha))
            {
                throw new ArgumentException("A senha atual está incorreta.");
            }

            ValidatePassword(changePasswordDto.NewPassword);
            pessoa.Senha = BCrypt.Net.BCrypt.HashPassword(changePasswordDto.NewPassword);

            await _repository.UpdatePessoa(pessoa);

            return new MessageResponse { Message = "Senha alterada com sucesso!" };
        }

        public async Task<MessageResponse> ChangeEmail(ChangeEmailDTO changeEmailDto)
        {
            var pessoa = await _repository.GetPessoaById(changeEmailDto.UserId);
            if (pessoa == null)
            {
                throw new ArgumentException("Usuário não encontrado.");
            }

            if (!BCrypt.Net.BCrypt.Verify(changeEmailDto.Password, pessoa.Senha))
            {
                throw new ArgumentException("A senha está incorreta.");
            }

            pessoa.Email = changeEmailDto.NewEmail;
            await _repository.UpdatePessoa(pessoa);

            return new MessageResponse { Message = "E-mail alterado com sucesso!" };
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
