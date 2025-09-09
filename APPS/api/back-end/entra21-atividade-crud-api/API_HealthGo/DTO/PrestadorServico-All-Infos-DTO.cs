using API_HealthGo.Entities;

namespace API_HealthGo.DTO
{
    public class PrestadorServico_All_Infos_DTO
    {
        public PrestadorServicoEntity prestadorServicoEntity { get; set; }

        public PessoaEntity PessoaEntity { get; set; }

        public List<EspecialidadeComPrecoDTO> Especialidades { get; set; } = new();
    }
}
