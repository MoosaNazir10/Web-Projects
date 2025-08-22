    //parse is oppposite of stringify
        let score = JSON.parse(localStorage.getItem('score'))||{
            wins:0,
            losses:0,
            ties:0
        }


        document.querySelector('.js-score').innerHTML = `wins:${score.wins} losses:${score.losses} ties:${score.ties}`;
        let result = JSON.parse(localStorage.getItem('result'))
            
        

        


        function randomfunc() {
            const rand = Math.random();

            let compmove = '';

            if (rand > 0 && rand < 1 / 3) {
                compmove = 'Rock';


            }
            else if (rand > 1 / 3 && rand < 2 / 3) {
                compmove = 'Paper';

            }
            else if (rand > 2 / 3 && rand < 3 / 3) {
                compmove = 'Scissors';

            }
            return compmove;
        }

        document.querySelector('.js-moves').innerHTML=`YOU: ${playermove}, COMPUTER: ${compmove}`;

let playermove = JSON.parse(localStorage.getItem('playermove'))




        function game(playermove) {

            const compmove = randomfunc();

            let result = '';

            //rock move
            if (playermove === 'Rock') {

                if (compmove === 'Rock') {
                    result = 'tie';
                }
                else if (compmove === 'Paper') {
                    result = 'you lose';
                }
                else if (compmove === 'Scissors') {
                    result = 'you win';
                }

                // paper move


            }
            else if (playermove === 'Paper') {

                if (compmove === 'Rock') {
                    result = 'you win';
                }
                else if (compmove === 'Paper') {
                    result = 'tie';
                }
                else if (compmove === 'Scissors') {
                    result = 'you lose';
                }


                //scissors move

            }
            else if (playermove === 'Scissors') {

                if (compmove === 'Rock') {
                    result = 'you lose';
                }
                else if (compmove === 'Paper') {
                    result = 'you win';
                }
                else if (compmove === 'Scissors') {
                    result = 'tie';
                }

            }
        


            if (result === 'you win') {
                score.wins += 1;

            }
            else if (result === 'you lose') {
                score.losses += 1;

            }
            else if (result === 'tie') {
                score.ties += 1;

            }
            localStorage.setItem('score', JSON.stringify(score));
            document.querySelector('.js-score').innerHTML = `wins:${score.wins} losses:${score.losses} ties:${score.ties}`;

            // alert(`you picked ${playermove}, computer picked ${compmove} result is ${result}
            //  wins:${score.wins} losses:${score.losses} ties:${score.ties}`);
            // localStorage.setItem('result', JSON.stringify(result));
            document.querySelector('.js-result').innerHTML=`RESULT: ${result}`;
            
            // localStorage.setItem('playermove' , JSON.stringify(playermove));
       
            document.querySelector('.js-moves').innerHTML=`You <img class="rockicon" src="${playermove}-emoji.png"> 
        <img class="papericon" src="${compmove}-emoji.png"> Computer`;
        




        }
        