/** 1. 초기 설정 및 모델 로딩 **/

// 모델 사용을 위한 경로 설정
const cubism4Model = "../model/melissa_vts/멜리사3.model3.json";

// 이번 live2d 는 pixi 의 라이브러리를 사용하도록 한다.
const live2d = PIXI.live2d;


/* 메인 어플리케이션을 초기화 하고 실행하는 부분 */
(async function main() {
    const app = new PIXI.Application({
        view: document.getElementById("canvas"), // canvas 로 연결된 view 설정
        autoStart: true, // 렌더링 루프를 자동으로 실행
        resizeTo: window, // 윈도우에 화면을 맞추도록 한다.
    });

    // 배경 이미지 로드
    const background = PIXI.Sprite.from('../model/background/background.png'); // 배경 이미지 경로 설정
    background.width = app.screen.width; // 배경 이미지의 너비를 화면 크기에 맞춘다
    background.height = app.screen.height; // 배경 이미지의 높이를 화면 크기에 맞춘다
    app.stage.addChild(background); // 배경 이미지를 스테이지에 추가

    // live2d 모델 로딩
    const model = await live2d.Live2DModel.from(cubism4Model);

    // 로드된 모델을 pixi 스테이지에 추가하여 렌더링 시작
    app.stage.addChild(model);

    /** 2. 모델의 크기 조정 및 위치 설정 **/

    /* 창 크기에 모델 맞추기 위한 스케일 비율 계산 */
    const scaleX = (innerWidth * 0.4) / model.width; // 모델을 창 너비의 (innerWidth * 0.4) / model.width; (40%) 정도로 맞춘다.
    const scaleY = (innerHeight * 0.8) / model.height; // 모델을 창 높이의 (innerHeight * 0.8) / model.height; (80%) 정도로 맞춘다.

    // 두 스케일 비율 중 작은 값을 사용하여 모델의 크기를 설정
    model.scale.set(Math.max(scaleX, scaleY));

    // 모델을 창 높이의 innerHeight * 0.1; (10%)위치에 배치
    model.y = innerHeight * 0.1;

    /* 함수 이동 */
    //draggable(model); // 드래그 함수
    addFrame(model); // 모델 주위에 프레임 추가하는 함수
    addHitAreaFrames(model,app); // 모델에 히트 영역 추가하는 함수

    model.x = (innerWidth - model.width) / 2; // 모델을 창 중앙에 가로로 배치

    /** 3. 모델 클릭(탭) 처리 **/

    /* 모델의 히트 부분에 대한 처리 영역 */
    // model.on("hit", (hitAreas) => {
    //     if (hitAreas.includes("Body")) {
    //         model.motion("Tap");
    //     } // Body 영역 클릭 시 Tap 모션을 실행하도록 한다.
    //
    //     if (hitAreas.includes("Head")) {
    //         model.expression();
    //     } // Head 영역이 클릭되면 표정을 변경하도록 한다.
    // });

    /** 특정 위치를 터치하면 동작 실행 (원) **/

    //     // 터치 영역 시각화
    // const targetX = app.screen.width / 2; // 화면의 중앙 X 좌표
    // const targetY = app.screen.height / 2; // 화면의 중앙 Y 좌표
    // const radius = 500; // 반경 설정
    // const touchArea = new PIXI.Graphics();
    // touchArea.beginFill(0xFF0000, 0.5); // 반투명 붉은색으로 설정
    // touchArea.drawCircle(targetX, targetY, radius);
    // touchArea.endFill();
    // app.stage.addChild(touchArea); // 터치 영역을 스테이지에 추가
    //
    // app.view.addEventListener('click', (event) => {
    //     const rect = app.view.getBoundingClientRect();
    //     const x = ((event.clientX - rect.left) / rect.width) * app.screen.width;
    //     const y = ((event.clientY - rect.top) / rect.height) * app.screen.height;
    //
    //     console.log(`Clicked at: x=${x}, y=${y}`); // 클릭한 위치의 좌표를 콘솔에 출력
    //
    //     // 터치한 위치가 특정 영역 내에 있는지 확인
    //     if (Math.hypot(x - targetX, y - targetY) <= radius) {
    //         console.log("터치 성공"); // 터치 성공 로그 추가
    //         console.log("Tap 재생");
    //         // 기본 애니메이션 재생
    //         model.motion("Taps");
    //     } else {
    //         console.log("터치 실패"); // 터치 실패 로그 추가
    //     }
    // });

    // /** 특정 위치를 터치하면 동작 실행 (사각형) **/
    //
    //     // 터치 영역 시각화
    // const targetX = app.screen.width / 2; // 화면의 중앙 X 좌표
    // const targetY = app.screen.height / 2; // 화면의 중앙 Y 좌표
    // const rectWidth = 400; // 사각형의 너비
    // const rectHeight = 300; // 사각형의 높이
    // const touchArea = new PIXI.Graphics();
    // touchArea.beginFill(0xFF0000, 0.5); // 반투명 붉은색으로 설정
    // touchArea.drawRect(targetX - rectWidth / 2, targetY - rectHeight / 2, rectWidth, rectHeight);
    // touchArea.endFill();
    // app.stage.addChild(touchArea); // 터치 영역을 스테이지에 추가
    //
    // app.view.addEventListener('click', (event) => {
    //     const rect = app.view.getBoundingClientRect();
    //     const x = ((event.clientX - rect.left) / rect.width) * app.screen.width;
    //     const y = ((event.clientY - rect.top) / rect.height) * app.screen.height;
    //
    //     console.log(`Clicked at: x=${x}, y=${y}`); // 클릭한 위치의 좌표를 콘솔에 출력
    //
    //     // 터치한 위치가 특정 사각형 영역 내에 있는지 확인
    //     if (x >= targetX - rectWidth / 2 && x <= targetX + rectWidth / 2 &&
    //         y >= targetY - rectHeight / 2 && y <= targetY + rectHeight / 2) {
    //         console.log("터치 성공"); // 터치 성공 로그 추가
    //         console.log("Tap 재생");
    //         // 기본 애니메이션 재생
    //         model.motion("Taps");
    //     } else {
    //         console.log("터치 실패"); // 터치 실패 로그 추가
    //     }
    // });

    //지금 이걸 바로 쓸 이유가없이 체크박스에서 구현시키면 되지않나?
    /*
    headTouch(model, app, true); // 머리 터치 영역
    upBodyTouch(model, app, true);
    downBodyTouch(model, app, true);
     */



})();

/** 4. 드래그 **/

/* 드래그 함수 */
function draggable(model) {
    model.buttonMode = true; // 버튼 모드를 이용하여 모델을 인터랙티브 하게 만든다. 즉, 드래그 및 터치를 할 수 있도록 상호작용 시킨다는 뜻

    /* 모델에 마우스나 터치가 눌렸을 때의 이벤트 리스너를 추가하는 부분 */
    model.on("pointerdown", (e) => {
        model.dragging = true; // 드래그 중임을 나타내는 플래그
        model._pointerX = e.data.global.x - model.x; // 모델의 위치에 대한 포인터의 상대적인 위치 저장
        model._pointerY = e.data.global.y - model.y;
    });

    /* 포인터가 움직일 때의 이벤트 리스너를 추가하는 부분 */
    model.on("pointermove", (e) => {
        /* 모델이 드래그중인지 확인중 */
        if (model.dragging) {
            model.position.x = e.data.global.x - model._pointerX; // 포인터의 움직임에 따른 x좌표 수정
            model.position.y = e.data.global.y - model._pointerY; // 포인터의 움직임에 따른 y좌표 수정
        }
    });

    /* 포인터가 해제될 때 드래그를 중지하는 이벤트 리스너 (2개 다) */
    model.on("pointerupoutside", () => (model.dragging = false));
    model.on("pointerup", () => (model.dragging = false));
}

/** 5. 모델에 프레임 추가 **/

/* 프레임 추가 함수 */
function addFrame(model) {
    const foreground = PIXI.Sprite.from(PIXI.Texture.WHITE); // 프레임 역할을 할 흰색 스프라이트(영역) 생성
    foreground.width = model.internalModel.width; // 프레임의 크기를 모델의 너비에 맞춘다.
    foreground.height = model.internalModel.height; // 프레임의 크기를 모델의 높이에 맞춘다.
    foreground.alpha = 0.2; // 프레임의 투명도를 설정한다. 지금 값: 20%

    model.addChild(foreground); // 프레임을 모델의 자식영역으로 추가한다.

    checkbox("모델 프레임 확인하기", (checked) => (foreground.visible = checked)); // 프레임을 보여줄 수 있는 체크박스를 추가하도록 한다.
}

/** 6. 히트 영역 프레임 추가 **/

/* 히트 영역 추가 함수 */
function addHitAreaFrames(model, app) {
    const hitAreaFrames = new live2d.HitAreaFrames(); // 모델에 대한 히트 영역 프레임 생성

    model.addChild(hitAreaFrames); // 히트 영역 프레임을 모델의 자식으로 추가

    checkbox("터치 영역 확인하기(live2d 버전에 따라서 동작이 안 될 수도 있음.)", (checked) => {
            headTouch(model, app, checked);
            upBodyTouch(model, app, checked);
            downBodyTouch(model, app, checked);



    });// 터치 영역을 보여줄 수 있는 체크박스를 추가하도록 한다. 이거 checked 처리안하면 짙어진다.
}

/** 7. 체크박스 추가 **/

/* 체크박스 추가 함수 */
function checkbox(name, onChange) {
    const id = name.replace(/\W/g, "").toLowerCase(); // 문자가 아닌 내용은 전부 제거한 뒤 소문자로 변환하여 체크박스의 고유 id 생성

    let checkbox = document.getElementById(id); // id를 사용하여 기존 체크박스 요소를 찾으려고 시도

    /* 체크박스가 없다면 새로 만든다. */
    if (!checkbox) {
        const p = document.createElement("p"); // 새로운 단락 요소 생성
        p.innerHTML = `<input type="checkbox" id="${id}"> <label for="${id}">${name}</label>`; // 체크박스와 레이블을 포함하는 내부 html 설정

        document.getElementById("control").appendChild(p); // 새 체크박스를 제어 요소에 추가
        checkbox = p.firstChild; // 체크박스는 이제 새로 생성된 체크박스를 참조한다.
    }

    /* 체크박스 상태를 처리하는 이벤트리스너 */
    checkbox.addEventListener("change", () => {
        onChange(checkbox.checked); // onChange 에 체크되었다고 변경
    });

    // 얘는 왜 만들었지?
    onChange(checkbox.checked);
}

function headTouch(model, app, visibility){
    /** 머리 위치는 원으로 처리하도록 한다. **/

        // 터치 영역 시각화
    const targetX = app.screen.width * 0.506; // 화면의 중앙 X 좌표
    const targetY = app.screen.height * 0.253; // 화면의 중앙 Y 좌표
    const radius = 120; // 반경 설정
    const touchArea = new PIXI.Graphics();
    touchArea.beginFill(0xFF0000, 0.5); // 반투명 붉은색으로 설정
    touchArea.drawCircle(targetX, targetY, radius);
    touchArea.endFill();
    app.stage.addChild(touchArea); // 터치 영역을 스테이지에 추가

    app.view.addEventListener('click', (event) => {
        const rect = app.view.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * app.screen.width;
        const y = ((event.clientY - rect.top) / rect.height) * app.screen.height;

        console.log(`Clicked at: x=${x}, y=${y}`); // 클릭한 위치의 좌표를 콘솔에 출력

        // 터치한 위치가 특정 영역 내에 있는지 확인
        if (Math.hypot(x - targetX, y - targetY) <= radius) {
            console.log("터치 성공"); // 터치 성공 로그 추가
            console.log("Tap 재생");
            // 기본 애니메이션 재생
            model.expression();
        } else {
            console.log("터치 실패"); // 터치 실패 로그 추가
        }
    });
}

function upBodyTouch(model, app, visibility){
    /** 상체는 사각형으로 처리하도록 한다. **/

        // 터치 영역 시각화
    const targetX = app.screen.width * 0.506; // 화면의 중앙 X 좌표
    const targetY = app.screen.height * 0.42; // 화면의 중앙 Y 좌표
    const rectWidth = 170; // 사각형의 너비
    const rectHeight = 190; // 사각형의 높이
    const touchArea = new PIXI.Graphics();
    touchArea.beginFill(0x000cff, 0.5); // 반투명 붉은색으로 설정
    touchArea.drawRect(targetX - rectWidth / 2, targetY - rectHeight / 2, rectWidth, rectHeight);
    touchArea.endFill();
    app.stage.addChild(touchArea); // 터치 영역을 스테이지에 추가

    app.view.addEventListener('click', (event) => {
        const rect = app.view.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * app.screen.width;
        const y = ((event.clientY - rect.top) / rect.height) * app.screen.height;

        console.log(`Clicked at: x=${x}, y=${y}`); // 클릭한 위치의 좌표를 콘솔에 출력

        // 터치한 위치가 특정 사각형 영역 내에 있는지 확인
        if (x >= targetX - rectWidth / 2 && x <= targetX + rectWidth / 2 &&
            y >= targetY - rectHeight / 2 && y <= targetY + rectHeight / 2) {
            console.log("터치 성공"); // 터치 성공 로그 추가
            console.log("Tap 재생");
            // 기본 애니메이션 재생
            model.motion("Taps");
        } else {
            console.log("터치 실패"); // 터치 실패 로그 추가
        }
    });
}

function downBodyTouch(model, app, visibility){

    /** 하체는 사각형으로 처리하도록 한다. **/


        // 터치 영역 시각화
    const targetX = app.screen.width * 0.506; // 화면의 중앙 X 좌표
    const targetY = app.screen.height * 0.6; // 화면의 중앙 Y 좌표
    const rectWidth = 350; // 사각형의 너비
    const rectHeight = 270; // 사각형의 높이
    const touchArea = new PIXI.Graphics();
    touchArea.beginFill(0x24ff00, 0.5); // 반투명 붉은색으로 설정
    touchArea.drawRect(targetX - rectWidth / 2, targetY - rectHeight / 2, rectWidth, rectHeight);
    touchArea.endFill();
    app.stage.addChild(touchArea); // 터치 영역을 스테이지에 추가

    app.view.addEventListener('click', (event) => {
        const rect = app.view.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * app.screen.width;
        const y = ((event.clientY - rect.top) / rect.height) * app.screen.height;

        console.log(`Clicked at: x=${x}, y=${y}`); // 클릭한 위치의 좌표를 콘솔에 출력

        // 터치한 위치가 특정 사각형 영역 내에 있는지 확인
        if (x >= targetX - rectWidth / 2 && x <= targetX + rectWidth / 2 &&
            y >= targetY - rectHeight / 2 && y <= targetY + rectHeight / 2) {
            console.log("터치 성공"); // 터치 성공 로그 추가
            console.log("Tap 재생");
            // 기본 애니메이션 재생
            model.motion("Taps");
        } else {
            console.log("터치 실패"); // 터치 실패 로그 추가
        }
    });
}

