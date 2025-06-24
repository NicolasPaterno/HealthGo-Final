using APIHealthGo.Contracts.Service;
using APIHealthGo.Response;
using atividade_bd_csharp.Entity;
using MyFirstCRUD.Contracts.Repository;
using MyFirstCRUD.DTO;
using MyFirstCRUD.Repository;

namespace APIHealthGo.Services
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

        public async Task<MessageResponse> Post(PessoaInsertDTO pessoa)
        {
            await _repository.InsertPessoa(pessoa);
            return new MessageResponse
            {
                message = "Pessoa inserida com sucesso!"
            };
        }
        public async Task<MessageResponse> Update(PessoaEntity pessoa)
        {
            await _repository.UpdatePessoa(pessoa);
            return new MessageResponse
            {
                message = "Pessoa atualizada com sucesso!"
            };
        }
        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.DeletePessoa(id);
            return new MessageResponse
            {
                message = "Pessoa Excluída com sucesso"
            };
        }
    }
}


