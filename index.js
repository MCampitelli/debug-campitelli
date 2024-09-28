document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("option1").value = "_w";
  document.getElementById("option2").value = "_p";
  document.getElementById('texto-inserido').focus();
});

  function formatarTexto() {
    var textoInserido = document.getElementById('texto-inserido').value;
    var textoSubstituido = (textoInserido.replace(/[.,\/\\;:()]/g, ' ')).replace("into",' ');
    var textoConvertido = textoSubstituido.replace(/\t/g, ' ');
    var linhas = textoConvertido.split('\n');
    var modoFormatacao = document.querySelector('input[name="modo-formatacao"]:checked').value;
    var palavrasFormatadas = [];
    var palavrasExibidas = {};

    var option1 = document.getElementById('option1').value.toLowerCase();
    var option2 = document.getElementById('option2').value.toLowerCase();
    var option3 = document.getElementById('option3').value.toLowerCase();
    var option4 = document.getElementById('option4').value.toLowerCase();
    var option5 = document.getElementById('option5').value.toLowerCase();
    
    for (var i = 0; i < linhas.length; i++) {
      var palavras = linhas[i].split(' ');
      for (var j = 0; j < palavras.length; j++) {
        if (((palavras[j].toLowerCase().endsWith(option1) && document.getElementById("check1").checked)
            || (palavras[j].toLowerCase().endsWith(option2) && document.getElementById("check2").checked)
            || (palavras[j].toLowerCase().endsWith(option3) && document.getElementById("check3").checked)
            || (palavras[j].toLowerCase().endsWith(option4) && document.getElementById("check4").checked)
            || (palavras[j].toLowerCase().endsWith(option5) && document.getElementById("check5").checked)
          ) 
          && !palavrasExibidas[palavras[j]]) {
          if (modoFormatacao ==='modo2') {
            var palavraFormatada = "|| '" + palavras[j] + ": ' || " + palavras[j] + " || ' |'";
          } else {
            var palavraFormatada = "|| chr(13) || '" + palavras[j] + ": ' || " + palavras[j];
          }
          palavrasFormatadas.push(palavraFormatada);
          palavrasExibidas[palavras[j]] = true;
        }
      }
    }
  
    var textoFormatado = "";
    if (palavrasFormatadas.length > 0) {
      
      if (modoFormatacao === 'modo1') {
        textoFormatado = "raise_application_error(-20000, 'Atributos:'" + '\n' + palavrasFormatadas.join('\n') + ");";
      } else if (modoFormatacao === 'modo2') {
        textoFormatado = "wheb_mensagem_pck.exibir_mensagem_abort(191072, 'ERRO='" + '\n' + palavrasFormatadas.join('\n') + ");";
      } else if (modoFormatacao === 'modo3') {
        textoFormatado = "insert into nm_tabela (nm_campo) values (" + '\n' + palavrasFormatadas.join('\n') + ");";
      }
    } else {
      textoFormatado = "Nenhuma palavra encontrada para exibição.";
    }
  
    document.getElementById('texto-formatado').innerHTML = textoFormatado;
  }
  
  function limparPainel() {
    document.getElementById('texto-inserido').value = '';
    document.getElementById('texto-formatado').innerHTML = "";
    document.getElementById('option3').value = '';
    document.getElementById('option4').value = '';
    document.getElementById('option5').value = '';
    document.getElementById("check3").checked = false;
    document.getElementById("check4").checked = false;
    document.getElementById("check5").checked = false;
    document.getElementById('texto-inserido').focus();
  }
  
  function copiarTexto() {
    var textoPainelSuperior = document.getElementById('texto-formatado').textContent;
  
    if (textoPainelSuperior.trim() !== '') {
      var tempInput = document.createElement('textarea');
      tempInput.value = textoPainelSuperior;
      document.body.appendChild(tempInput);
  
      tempInput.select();
      document.execCommand('copy');
  
      document.body.removeChild(tempInput);
  
      swal({
        text: "Texto copiado com sucesso!",
        icon: "success"
      });
      
  
    } else {
      swal ( "Oops" , "Não há um resultado para ser copiado, realize o processo novamente" ,  "error" )    
    }
  }

  function openInfo() {
    var modalContent = document.getElementById("modal_content");
    var modalInfo = document.getElementById("modalInfo");
    modalContent.style.display = "block";
    modalInfo.style.display = "block";
  }

  function closeInfo() {
    var modalInfo = document.getElementById("modalInfo");
    modalInfo.style.display = "none";
  };
  