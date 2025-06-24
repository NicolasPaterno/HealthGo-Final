using MyFirstCRUD.Entity;

namespace APIHealthGo.Response
{
    public class LembreteGetAllResponse
    {
        public IEnumerable<LembreteEntity> Data { get; set; }
    }
}
