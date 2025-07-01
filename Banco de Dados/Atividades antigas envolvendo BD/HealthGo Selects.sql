-- Selecionar Todos os Hoteis de uma cidade.
CREATE VIEW V_SelecionarHotelPorCidade AS
SELECT 
    H.Nome AS Nome_Hotel,
    H.Tipo,
    H.Email,
    H.Telefone,
    C.Nome AS Nome_Cidade
FROM 
    Hotel H
JOIN 
    Cidade C ON C.id = H.Cidade_id
WHERE 
    C.Nome = 'SÃO PAULO'
ORDER BY 
    H.Nome;
 
 SELECT * FROM V_SelecionarHotelPorCidade;
 

 
-- Todas as datas que um quarto esta ocupado.
CREATE VIEW V_ReservaQuarto AS
SELECT 
    Q.Numero AS Numero_Quarto,
    OSH.DataInicio,
    OSH.DataFim
FROM 
    Quarto Q
JOIN 
    OrdemServico_Hotel OSH ON OSH.Quarto_id = Q.id
WHERE 
    Q.Numero = '212'
ORDER BY 
    OSH.DataInicio;

SELECT * FROM V_ReservaQuarto;


-- Todos os Lembretes de um Cliente.
CREATE VIEW V_LembreteCliente AS
SELECT 
    L.Titulo AS Titulo_Lembrete,
    L.DataInicio,
    L.DataFim,
    L.Descricao,
    L.Frequencia
FROM 
    Lembrete L
WHERE 
    L.Pessoa_id = 1
ORDER BY 
    L.DataInicio;

SELECT * FROM V_LembreteCliente;

-- Histórico de serviços de um Colaborador. Defindo o Cliente, Data, Valor do trabalho e Horas.

CREATE VIEW V_HistoricoColaborador AS
SELECT 
    PP.Nome AS Nome_Prestador,
    PC.Nome AS Nome_Cliente,
    OP.Preco AS Preco_Hora,
    OP.DataInicio AS Data_Inicio,
    OP.DataFim AS Data_Fim,
    OP.HorasTrabalhadas AS Horas_Trabalhadas
FROM 
    OrdemServico_PrestadorServico OP
JOIN 
    PrestadorServico PS ON OP.PrestadorServico_id = PS.id
JOIN 
    OrdemServico OS ON OP.OrdemServico_id = OS.id
JOIN 
    Pessoa PP ON PP.id = PS.Pessoa_id
JOIN 
    Pessoa PC ON PC.id = OS.Pessoa_id
WHERE 
    PP.Nome = 'Patricia Rocha'
ORDER BY 
    OP.DataInicio;

SELECT * FROM V_HistoricoColaborador;

-- Preço dos Serviços por Ordem de Serviço.
CREATE VIEW V_ServicoOrdemServico AS
SELECT 
    P.Nome AS Nome_Prestador,
    E.Nome AS Nome_Especialidade,
    OP.Preco AS Valor_Servico,
    OP.HorasTrabalhadas,
    OP.DataInicio,
    OP.DataFim,
    OP.StatusOS AS Status_Servico
FROM 
    OrdemServico_PrestadorServico OP
JOIN 
    PrestadorServico PS ON OP.PrestadorServico_id = PS.id
JOIN 
    Pessoa P ON P.id = PS.Pessoa_id
JOIN 
    Especialidade E ON PS.Especialidade_id = E.id
JOIN 
    OrdemServico OS ON OP.OrdemServico_id = OS.id
WHERE 
    OS.id = 3;
 
 SELECT * FROM V_PRECO;
 
 
-- Histórico de Compra de Quarto por usuário.
CREATE VIEW V_HistoricoQuartoCompra AS
SELECT 
    P.Nome AS Nome_Cliente,
    OS.id AS Numero_Ordem_Servico,
    OSH.Preco AS Preco_Estadia,
    OSH.StatusOS AS Status_Servico,
    OSH.Observacao,
    OSH.QuantAcompanhante AS Quantidade_Acompanhantes,
    H.Nome AS Nome_Hotel,
    H.CEP AS CEP_Hotel,
    H.NumeroEndereco
FROM 
    OrdemServico OS
JOIN 
    OrdemServico_Hotel OSH ON OS.id = OSH.OrdemServico_id
JOIN 
    Quarto Q ON Q.id = OSH.Quarto_id
JOIN 
    Hotel H ON H.id = Q.Hotel_id
JOIN 
    Pessoa P ON P.id = OS.Pessoa_id
WHERE 
    P.id = 59;
    
SELECT * FROM V_HistoricoCompraQuarto;    
    
    
-- Histórico de Serviços Comprados por pessoa:
CREATE VIEW V_HistoricoCompraServico AS
SELECT 
    P.Nome AS Nome_Cliente,
    OS.id AS Numero_Ordem_Servico,
    OSP.Preco AS Valor_Total,
    OSP.StatusOS AS Status_Servico,
    OSP.DataInicio,
    OSP.DataFim,
    PS.Pessoa_id AS ID_Prestador,
    PPREST.Nome AS Nome_Prestador,
    E.Nome AS Especialidade_Prestador
FROM 
    OrdemServico OS
JOIN 
    OrdemServico_PrestadorServico OSP ON OS.id = OSP.OrdemServico_id
JOIN 
    PrestadorServico PS ON PS.id = OSP.PrestadorServico_id
JOIN 
    Especialidade E ON E.id = PS.Especialidade_id
JOIN 
    Pessoa P ON P.id = OS.Pessoa_id
JOIN 
    Pessoa PPREST ON PPREST.id = PS.Pessoa_id
WHERE 
    P.id = 59;


SELECT * FROM V_HistoricoCompraServico;

EXPLAIN
SELECT 
    P.Nome AS Nome_Cliente,
    OS.id AS Numero_Ordem_Servico,
    OSP.Preco AS Valor_Total,
    OSP.StatusOS AS Status_Servico,
    OSP.DataInicio,
    OSP.DataFim,
    PS.Pessoa_id AS ID_Prestador,
    PPREST.Nome AS Nome_Prestador,
    E.Nome AS Especialidade_Prestador
FROM 
    OrdemServico OS
JOIN 
    OrdemServico_PrestadorServico OSP ON OS.id = OSP.OrdemServico_id
JOIN 
    PrestadorServico PS ON PS.id = OSP.PrestadorServico_id
JOIN 
    Especialidade E ON E.id = PS.Especialidade_id
JOIN 
    Pessoa P ON P.id = OS.Pessoa_id
JOIN 
    Pessoa PPREST ON PPREST.id = PS.Pessoa_id
WHERE 
    P.id = 59;
    
-- Relatório de Reservas de Hotéis, Listando nome hóspede, hotel, quarto e Status.
CREATE VIEW V_RelatorioReservaHotel AS
SELECT 
    p.Nome AS NomeHospede,
    h.Nome AS NomeHotel,
    q.Numero AS NumeroQuarto,
    osh.StatusOS,
    osh.DataInicio,
    osh.DataFim,
    osh.Preco
FROM 
    OrdemServico_Hotel osh
    JOIN OrdemServico os ON osh.OrdemServico_id = os.id
    JOIN Pessoa p ON os.Pessoa_id = p.id
    JOIN Quarto q ON osh.Quarto_id = q.id
    JOIN Hotel h ON q.Hotel_id = h.id
ORDER BY 
    p.Nome, h.Nome;
    
explain
SELECT 
    p.Nome AS NomeHospede,
    h.Nome AS NomeHotel,
    q.Numero AS NumeroQuarto,
    osh.StatusOS,
    osh.DataInicio,
    osh.DataFim,
    osh.Preco
FROM 
    OrdemServico_Hotel osh
    JOIN OrdemServico os ON osh.OrdemServico_id = os.id
    JOIN Pessoa p ON os.Pessoa_id = p.id
    JOIN Quarto q ON osh.Quarto_id = q.id
    JOIN Hotel h ON q.Hotel_id = h.id
ORDER BY 
    p.Nome, h.Nome;
    
SELECT * FROM V_RelatorioReservaHotel;    

    
-- Relatório de Ordens de Serviço Vencidas.

CREATE VIEW V_OrdemVencida AS
SELECT 
    p.Nome AS NomePrestador,
    osp.DataInicio,
    osp.DataFim,
    osp.StatusOS
FROM 
    OrdemServico_PrestadorServico osp
    INNER JOIN PrestadorServico ps ON osp.PrestadorServico_id = ps.id
    INNER JOIN Pessoa p ON ps.Pessoa_id = p.id
WHERE 
    osp.StatusOS = 'Em andamento'
    AND osp.DataFim < NOW()
ORDER BY 
    osp.DataFim;

    
SELECT * FROM V_OrdemVencida;