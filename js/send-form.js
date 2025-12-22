document.getElementById('form-contato').addEventListener('submit', function(e) {
    e.preventDefault();

    // Pega os valores do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const desafio = document.getElementById('mensagem').value.trim();

    // Número do WhatsApp destino (com DDI +55)
    const numeroWhatsApp = '5541987513229'; // Coloque o número do seu WhatsApp

    // Monta a mensagem
    const mensagem = `*Novo Contato do Formulário*\n\n` +
                     `*Nome:* ${nome}\n` +
                     `*E-mail:* ${email}\n` +
                     `*Telefone:* ${telefone}\n` +
                     `*Empresa:* ${empresa}\n` +
                     `*Desafio:* ${desafio}`;

    // Abre o WhatsApp com a mensagem formatada
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');

    // Mostra mensagem de sucesso
    document.getElementById('formOk').classList.remove('hidden');

    // Limpa o formulário
    this.reset();
});