namespace API_HealthGo.DTO
{
    public class PessoaGetAllDTO // ao fazermos o GetAll, pegamos a senha da pessoa,
                              // então deveríamos fazer um dto assim para ações no back que n precisem de senha?
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public DateTime DataNascimento { get; set; }

        public string CPF { get; set; }

        public string Telefone { get; set; }

        public string Email { get; set; }

        public string EnderecoFoto { get; set; }

        public bool CaoGuia { get; set; }

        public string CEP { get; set; }

        public string Bairro { get; set; }

        public string Rua { get; set; }

        public string NumeroEndereco { get; set; }

        public int Cidade_Id { get; set; }
    }
}
