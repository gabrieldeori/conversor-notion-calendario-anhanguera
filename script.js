const texto = `
Ta1 - Sistemas Operacionais - A
10/02/24 00:00 à 10/02/24 00:00 (Horario de Brasilia) x

Ta2 - Sistemas Operacionais - A
17/02/24 00:00 à 17/02/24 00:00 (Horrio de Brasilia) x

Ta3 - Sistemas Operacionais - A
24/02/24 00:00 a 24/02/24 00:00 (Horario de Brasilia) x

Av1 - Sistemas Operacionais - A
O 05/02/24 00:00 a 04/03/24 23:59 (Horario de Brasilia)

Av2 - Sistemas Operacionais - A
05/02/24 00:00 a 11/03/24 23:59 (Horario de Brasilia) X

Relatorio de Aula Pratica - Sistemas Operacionais - A
05/02/24 00:00 à 04/05/24 23:59 (Horario de Brasilia) x

Cw1 - Sistemas Operacionais - A
05/02/24 00:00 a 15/06/24 23:59 (Horario de Brasilia)

Cw2 - Sistemas Operacionais - A
05/02/24 00:00 a 15/06/24 23:59 (Horario de Brasilia)

Cw3 - Sistemas Operacionais - A
05/02/24 00:00 a 15/06/24 23:59 (Horario de Brasilia)

Cw4 - Sistemas Operacionais - A
05/02/24 00:00 a 15/06/24 23:59 (Horario de Brasilia) x

Live

O 01/03/24 21:00 à 01/03/24 21:50 (Horário de Brasilia)

Ta4 - Sistemas Operacionais - A
O 02/03/24 00:00 a 02/03/24 00:00 (Horario de Brasilia) x

Av - Subst. 1 - Sistemas Operacionais - A
04/06/24 00:00 a 08/06/24 23:59 (Horario de Brasilia) X

Av - Subst. 2 - Sistemas Operacionais - A
04/06/24 00:00 a 08/06/24 23:59 (Horario de Brasilia) X

Leitura1 - Sistemas Operacionais - A
05/02/24 00:00 a 15/06/24 23:59 (Horario de Brasilia)

Prova Presencial - 1° Chamada - Sistemas Operacionais - A
O 04/03/24 00:00 a 09/03/24 23:59 (Horario de Brasilia) X

Prova Presencial - 20 Chamada - Sistemas Operacionais - A
03/06/24 00:00 à 08/06/24 23:59 (Horario de Brasilia) x

it Prova Presencial - Recuperacao - Sistemas Operacionais - A
10/06/24 00:00 à 15/06/24 23:59 (Horario de Brasilia) x

Eng Ava1 - Sistemas Operacionais - A
05/02/24 00:00 à 15/06/24 23:59 (Horario de Brasilia)
`

const blocos = texto
  .split(/\n\n/)
  .map(bloco => bloco.split(/\n/).filter(pos => pos.trim() !== ''))

const objetoDePrazos = blocos.map((bloco, index) => {
  const splitDash = bloco[0].split(/ - /);

  if(splitDash[0].match(/live/gi)) {
    const dates = blocos[index + 1][0]?.match(/\b\d{2}\/\d{2}\/\d{2}\b/g) || ['', '']; 
    const hours = blocos[index + 1][0]?.match(/\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/g) || ['', ''];
    const timezone = blocos[index + 1][0]?.match(/\((.*?H[oó]rari[oó].*?)\)/gi) || 'none';

    return {
      type: splitDash[0],
      course: splitDash[1] || 'none',
      module: splitDash[2] || 'none',
      initialDate: dates[0] || 'none',
      dueDate: dates[1] || 'none',
      initialHour: hours[0] || 'none',
      dueHour: hours[1] || 'none',
      timezone: timezone[0]?.slice(1, -1) || 'none',
    }
  }

  if (splitDash[0]?.match(/\b\d{2}\/\d{2}\/\d{2}\b/g)) {
    return null;
  }

  const dates = bloco[1]?.match(/\b\d{2}\/\d{2}\/\d{2}\b/g) || ['', '']; 
  const hours = bloco[1]?.match(/\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/g) || ['', ''];
  const timezone = bloco[1]?.match(/\((.*?H[oó]rari[oó].*?)\)/gi) || 'none';

  return {
    type: splitDash[0] || 'none',
    course: splitDash[1] || 'none',
    module: splitDash[2] || 'none',
    initialDate: dates[0] || 'none',
    dueDate: dates[1] || 'none',
    initialHour: hours[0] || 'none',
    dueHour: hours[1] || 'none',
    timezone: timezone[0]?.slice(1, -1) || 'none',
  }
});

console.log(objetoDePrazos);
