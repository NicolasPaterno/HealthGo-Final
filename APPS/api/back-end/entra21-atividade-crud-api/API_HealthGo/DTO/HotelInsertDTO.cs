using System.ComponentModel.DataAnnotations;

namespace API_HealthGo.DTO
{
    public class HotelInsertDTO
    {
        [Required(ErrorMessage = "CNPJ é obrigatório")]
        [StringLength(18, MinimumLength = 14, ErrorMessage = "CNPJ deve ter entre 14 e 18 caracteres")]
        public string CNPJ { get; set; } = string.Empty;

        [Required(ErrorMessage = "Nome é obrigatório")]
        [StringLength(255, ErrorMessage = "Nome deve ter no máximo 255 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "Tipo é obrigatório")]
        public string Tipo { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        [StringLength(150, ErrorMessage = "Email deve ter no máximo 150 caracteres")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Telefone é obrigatório")]
        [StringLength(45, ErrorMessage = "Telefone deve ter no máximo 45 caracteres")]
        public string Telefone { get; set; } = string.Empty;

        [StringLength(255, ErrorMessage = "Site deve ter no máximo 255 caracteres")]
        public string? Site { get; set; }

        [StringLength(255, ErrorMessage = "Acessibilidade deve ter no máximo 255 caracteres")]
        public string? Acessibilidade { get; set; }

        [Required(ErrorMessage = "CEP é obrigatório")]
        [StringLength(20, ErrorMessage = "CEP deve ter no máximo 20 caracteres")]
        public string CEP { get; set; } = string.Empty;

        [Required(ErrorMessage = "Bairro é obrigatório")]
        [StringLength(255, ErrorMessage = "Bairro deve ter no máximo 255 caracteres")]
        public string Bairro { get; set; } = string.Empty;

        [Required(ErrorMessage = "Rua é obrigatória")]
        [StringLength(255, ErrorMessage = "Rua deve ter no máximo 255 caracteres")]
        public string Rua { get; set; } = string.Empty;

        [Required(ErrorMessage = "Número do endereço é obrigatório")]
        [StringLength(255, ErrorMessage = "Número do endereço deve ter no máximo 255 caracteres")]
        public string NumeroEndereco { get; set; } = string.Empty;

        [StringLength(255, ErrorMessage = "Descrição deve ter no máximo 255 caracteres")]
        public string? Descricao { get; set; }

        [Required(ErrorMessage = "Ativo é obrigatório")]
        public bool Ativo { get; set; } = true;

        [Required(ErrorMessage = "Data de início é obrigatória")]
        public DateTime DataInicio { get; set; }

        [Required(ErrorMessage = "Nome da cidade é obrigatório")]
        [StringLength(255, ErrorMessage = "Nome da cidade deve ter no máximo 255 caracteres")]
        public string CidadeNome { get; set; } = string.Empty;

        [Required(ErrorMessage = "Sigla do estado é obrigatória")]
        [StringLength(4, ErrorMessage = "Sigla do estado deve ter no máximo 4 caracteres")]
        public string EstadoSigla { get; set; } = string.Empty;

        [Required(ErrorMessage = "ID da pessoa é obrigatório")]
        public int Pessoa_Id { get; set; }

        // Propriedade interna para o repositório
        public int Cidade_Id { get; set; }
    }
}