async function lerListaProduto() {
    try {
        const resposta = await fetch("https://db-projeto-feira-online-4mu1.vercel.app/posts");
        if (!resposta.ok) {
            throw new Error(`Erro na resposta: ${resposta.statusText}`);
        }
        const json = await resposta.json();
        console.log('Produtos recebidos:', json); // Log para verificar os dados recebidos
        document.getElementById("lista-produtos").innerHTML = json.map(post => 
            `<li>${post.nome} R$${(post.valor && !isNaN(post.valor)) ? post.valor.toFixed(2) : 'Valor indisponível'}</li>`
        ).join('');
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function quantidadeProduto() {
    try {
        const resposta = await fetch('https://db-projeto-feira-online-4mu1.vercel.app/posts');
        if (!resposta.ok) {
            throw new Error(`Erro na resposta: ${resposta.statusText}`);
        }
        const texto = await resposta.text();
        const dados = JSON.parse(texto);
        console.log('Dados recebidos para quantidadeProduto:', dados); // Log para verificar os dados recebidos
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

            const resposta = await fetch("https://db-projeto-feira-online-4mu1.vercel.app/posts", {
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