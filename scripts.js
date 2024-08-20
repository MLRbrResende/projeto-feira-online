async function lerListaProduto() {
    try {
        const resposta = await fetch("http://localhost:3000/posts");
        const json = await resposta.json();
        document.getElementById("lista-produtos").innerHTML = json.map(post => `<li>${post.nome} R$${post.valor.toFixed(2)}</li>`).join('');
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function quantidadeProduto() {
    try {
        const resposta = await fetch('http://localhost:3000/posts');
        const dados = await resposta.json();
        const ultimoProduto = dados.reduce((max, produto) => produto.id > max.id ? produto : max, {id: 0});
        return ultimoProduto.id;
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function criarProduto() {
    document.getElementById('formulario-produto').addEventListener('submit', async function(event) {
        event.preventDefault();

        try {
            let idProduto = await quantidadeProduto() + 1;

            const nomeProduto = document.getElementById("nome-produto").value;
            const valorProduto = document.getElementById("valor-produto").value;

            const resposta = await fetch("http://localhost:3000/posts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: idProduto,
                    nome: nomeProduto,
                    valor: parseFloat(valorProduto)
                })
            });
            const dados = await resposta.json();
            console.log(dados);
        } catch (error) {
            console.error('Erro:', error);
        }
    });
}

criarProduto();
lerListaProduto();