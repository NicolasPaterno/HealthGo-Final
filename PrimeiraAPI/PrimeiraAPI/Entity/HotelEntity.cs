using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace atividade_bd_csharp.Entity
{
    public class HotelEntity
    {
        public int Id { get; set; } 
        public string Cnpj{ get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string EnderecoFoto { get; set; }
        public string Site { get; set; }
        public string Acessibilidade { get; set; }
        public string Cep { get; set; }
        public string Bairro { get; set; }
        public string Rua { get; set; }
        public string NumeroEndereco { get; set; }
        public string Cidade_Id { get; set; }
        
        public StatusTipo Tipo { get; set; }

        public enum StatusTipo
        {
            Hotel = 1,
            Apartamento = 2,
            Casa = 3,
            Hostel = 4,
            Pousada = 5
        }



        /*
           static async Task MenuHotel(HotelRepository repo)
           {
               char op = '0';
               do
               {
                   Console.WriteLine("==Menu Hotel===");
                   Console.WriteLine("1 - Listar Hoteis");
                   Console.WriteLine("2 - Listar hotéis por cidade");
                   Console.WriteLine("3 - BUscar hotll por id");
                   Console.WriteLine("4 - Cadastrar novo hotel\n");
                   Console.WriteLine("5 - Atualizar hotel");
                   Console.WriteLine("6 - Excluir hotel");
                   Console.WriteLine("7 - Sair");

                   op = Console.ReadLine().ToUpper()[0];

                   switch (op)
                   {
                       case '1':
                           await ListarHoteis();
                           break;
                       case '2':
                           await Read();
                           break;
                       case '3':
                           await Update();
                           break;
                       case '4':
                           await Delete();
                           break;
                       case '5':
                           await Delete();
                           break;
                       case '6':
                           await GetById();
                           break;
                       case '7':
                           break;
                   }

                   Console.WriteLine("Pressione 'Enter' para continuar.");
                   Console.ReadLine();
                   Console.Clear();
               } while (op != '5');
           }

       }



       static async Task ListarHoteis()
       {
           try
           {
               Console.Clear();
               Console.WriteLine("===Lista de Hotéis===");

               var hoteis = await _hotelRepository.GetAll();

               if (hoteis.Any())
               {
                   foreach (var hotel in hoteis)
                   {
                       Console.WriteLine($"Id: {hotel.Id}");
                       Console.WriteLine($"Nome: {hotel.Nome}");
                       Console.WriteLine($"CNPJ: {hotel.Cnpj}");
                       Console.WriteLine($"Email: {hotel.Email}");
                       Console.WriteLine($"Telefone: {hotel.Telefone}");
                       Console.WriteLine($"Site: {hotel.Site}");
                       Console.WriteLine($"Cidade: {hotel.Cidade_Id}");
                       Console.WriteLine($"Endereço: {hotel.Rua}, {hotel.NumeroEndereco} - {hotel.Bairro}");
                       Console.WriteLine($"CEP: {hotel.Cep}\n");
                   }
               } else
               {
                   Console.WriteLine("Nenhum hotel encontrado.");
               }

           } catch (Exception ex)
           {
               Console.WriteLine($"Erro ao lstar hotéis: {ex.Message}");
           }

           Console.WriteLine("Pressione enter para continuar.");
           Console.ReadKey();
       }

       static async Task CadastrarHotel()
       {
           try
           {
               Console.Clear();
               Console.WriteLine("===Cadastrar Hotel===");

               var hotel = new HotelInsertDTO();

               Console.WriteLine("Nome:");
               hotel.Nome = Console.ReadLine();
               if (string.IsNullOrWhiteSpace(hotel.Nome))
               {
                   Console.WriteLine("Nome é obrigatório");
                   Console.ReadKey();
                   return;
               }

               Console.WriteLine("Cnpj:");
               hotel.Cnpj = Console.ReadLine();
               if (string.IsNullOrWhiteSpace(hotel.Cnpj))
               {
                   Console.WriteLine("Cnpj é obrigatório!");
                   Console.ReadKey();
                   return;
               }

               Console.WriteLine("Qual Tipo do Hotel?");
               ExibirTiposHotel();
               Console.WriteLine("Escolha uma opção de 1-5.");

               if (int.TryParse(Console.ReadLine(), out int opcao) && opcao >= 1 && opcao <= 5)
               {
                   if (Enum.IsDefined(typeof(StatusTipo), opcao))
                   {
                       hotel.Tipo = (StatusTipo)opcao;
                       Console.WriteLine($"Tipo selecionado: {hotel.Tipo}"); 
                   }
                   else
                   {
                       Console.WriteLine("Tipo inválido! Usando 'Hotel' como padrão.");
                       hotel.Tipo = StatusTipo.Hotel;
                   }
               }
               else
               {
                   Console.WriteLine("Opção inválida! Usando 'Hotel' como padrão.");
                   hotel.Tipo = StatusTipo.Hotel;
               }



               Console.WriteLine("Email:");
               hotel.Email = Console.ReadLine();

               Console.WriteLine("Telefone:");
               hotel.Telefone = Console.ReadLine();

               Console.WriteLine("Site:");
               hotel.Site = Console.ReadLine();

               Console.WriteLine("Rua:");
               hotel.Rua = Console.ReadLine();

               Console.WriteLine("Número do endereço:");
               hotel.NumeroEndereco = Console.ReadLine();

               Console.WriteLine("Bairro:");
               hotel.Bairro = Console.ReadLine();

               Console.WriteLine("Cidade:");
               hotel.Cidade_Id = Console.ReadLine();

               Console.WriteLine("Endereço Foto:");
               hotel.EnderecoFoto = Console.ReadLine();

               Console.Write("Possui Acessibilidade? (S/N): ");
               string acessInput = Console.ReadLine()?.ToUpper();
               hotel.Acessibilidade = (acessInput == "S") ?
                   AcessibilidadeEnum.Sim : AcessibilidadeEnum.Nao;

               await _hotelRepository.Insert(hotel);
               Console.WriteLine("\n Hotel cadastrado com sucesso!");
           }
           catch (Exception ex)
           {
               Console.WriteLine($" Erro ao cadastrar hotel: {ex.Message}");
           }
       }
       static async Task Delete()
       {
           await Read();
           Console.WriteLine("Digite o Id do Hotel que deseja excluir: ");
           int id = int.Parse(Console.ReadLine());

           await _hotelRepository.Delete(id);
           Console.WriteLine("Hotel deletado com sucesso.");

       }

       static async Task AtualizarHotel()
       {
           try
           {
               Console.Clear();
               Console.WriteLine("===Atualizar Hotel===");

               Console.WriteLine("Digite o ID do hotel a ser atualizado:");
               string id = Console.ReadLine();

               var hotelExistente = await _hotelRepository.GetByCidadeId

           }catch (Exception ex)
           {

           }

       }

       static void ExibirTiposHotel()
       {
           Console.WriteLine("Tipos disponíveis:");
           foreach (int valor in Enum.GetValues(typeof(StatusTipo)))
           {
               string nome = Enum.GetName(typeof(StatusTipo), valor);
               Console.WriteLine($"{valor} - {nome}");
           }
       }

       private string ObterDescricaoAcessibilidade(AcessibilidadeEnum acess)
       {
           return acess == AcessibilidadeEnum.Sim ? "Sim" : "Não";
       }*/
    }
}
