const produtos = []

//Criar novo produto.
document.getElementById('formulario-produto').addEventListener('submit', function(event) {
    event.preventDefault(); // Corrigido para prevenir o comportamento padrão

    const nomeProduto = document.getElementById("nome-produto").value;
    const valProduto = document.getElementById("valor-produto").value;

    let idProduto = 0;
    
    // Encontrar o maior ID existente
    for(let i = 0; i < produtos.length; i++) {
        if(produtos[i].id > idProduto) {
            idProduto = produtos[i].id;
        }
    }
    
    // Incrementar o ID para o novo produto
    idProduto += 1;

    const novoProduto = {
        id: idProduto,
        nome: nomeProduto,
        valor: valProduto
    };

    produtos.push(novoProduto);

    console.log(produtos);
});