// 카드 배열
let row = 4;
let column = 4;
let click_flag = true; /*카드 막 뒤집는 것을 방지하기 위해 사용 */
let count_list = [];
let success_list = [];
let image_list = ['🍇','🍎','🌞','🌈','⚽','🐷','🐶','🐰'];
image_list =[...image_list,...image_list]; /*이미지*/
let image = [];
let start; 

function card_setting(a,b) {
    click_flag = false; 
    for (i = 0; i<a*b;i++) {
    image = image.concat(image_list.splice(Math.floor(Math.random()*image_list.length),1));
    
    // 카드 복제
    var card = document.createElement('div');
    card.classList = 'card';
    card.id = i;
    var cardInner = document.createElement('div');
    cardInner.classList = 'card-inner';
    var cardFront = document.createElement('div'); /*카드 앞*/
    cardFront.classList = 'card-front'; 
    var cardBack = document.createElement('div'); /*카드 뒤*/
    cardBack.classList = 'card-back';
    cardBack.innerHTML = `<p>${image[i]}</p>`
    document.querySelector(".box").appendChild(card);
    card.appendChild(cardInner);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    function clicked() {
        /* 카드가 앞이면 뒤로, 뒤면 앞으로 flip되도록 구현 => 토글(toggle) 사용 */
        if (click_flag && !success_list.includes(this)){
            this.classList.toggle('flipped');
            count_list.push(this)
            if(count_list.length === 2) {
                if (count_list[0].querySelector("p").innerHTML === count_list[1].querySelector("p").innerHTML && count_list[0] !== count_list[1]) {
                    success_list.push(count_list[0])
                    success_list.push(count_list[1])
                    count_list=[]
                    if (success_list.length === image.length) {
                        let last = new Date()
                        setTimeout(function() {
                            alert(`축하합니다🎉 성공하셨습니다!
${Math.round((last-start)/1000)}초 걸렸습니다.`)},800)
                    }
                }
                else {
                    click_flag = false;
                    setTimeout(function() {
                        console.log(count_list)
                        count_list[0].classList.remove("flipped");
                        count_list[1].classList.remove("flipped");
                        click_flag = true;
                        count_list = []; /*비동기 함수이므로 순서 및 위치 주의*/
                    },1000)

                }
            }
        };
    }
    card.addEventListener('click',clicked)
    }

    // 처음에 카드 5초동안 보여주고 뒤집은 상태로 되돌리기
    document.querySelectorAll('.card').forEach(function(card,index) {
        setTimeout(function() {
            card.classList.add("flipped")
        },1000+100*index) /*애니메이션 효과*/

        setTimeout(function() {
            card.classList.remove('flipped')
            click_flag = true;
            start = new Date();
        },4000);
    }
    );
}

card_setting(row, column)

