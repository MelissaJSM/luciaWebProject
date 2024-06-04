const cubism4Model =
    "../model/melissa_vts/멜리사3.model3.json";

const live2d = PIXI.live2d;

(async function main() {
    const app = new PIXI.Application({
        view: document.getElementById("canvas"),
        autoStart: true,
        resizeTo: window,
        backgroundColor: 0x333333
    });

    const models = await Promise.all([
        live2d.Live2DModel.from(cubism4Model)
    ]);

    models.forEach((model) => {
        app.stage.addChild(model);

        const scaleX = (innerWidth * 0.4) / model.width;
        const scaleY = (innerHeight * 0.8) / model.height;

        // fit the window
        model.scale.set(Math.min(scaleX, scaleY));

        model.y = innerHeight * 0.1;

        //캐릭터 드래그모드
        //draggable(model);
        addFrame(model);
        addHitAreaFrames(model);
    });

    const model4 = models[1];

    model2.x = (innerWidth- model4.width) / 2;
    model4.x = model2.x + model2.width;

    // handle tapping

    model4.on("hit", (hitAreas) => {
        if (hitAreas.includes("Body")) {
            model4.motion("Tap");
        }

        if (hitAreas.includes("Head")) {
            model4.expression();
        }
    });
})();

function draggable(model) {
    model.buttonMode = true;
    model.on("pointerdown", (e) => {
        model.dragging = true;
        model._pointerX = e.data.global.x - model.x;
        model._pointerY = e.data.global.y - model.y;
    });
    model.on("pointermove", (e) => {
        if (model.dragging) {
            model.position.x = e.data.global.x - model._pointerX;
            model.position.y = e.data.global.y - model._pointerY;
        }
    });
    model.on("pointerupoutside", () => (model.dragging = false));
    model.on("pointerup", () => (model.dragging = false));
}

function addFrame(model) {
    const foreground = PIXI.Sprite.from(PIXI.Texture.WHITE);
    foreground.width = model.internalModel.width;
    foreground.height = model.internalModel.height;
    foreground.alpha = 0.2;

    model.addChild(foreground);

    checkbox("Model Frames", (checked) => (foreground.visible = checked));
}

function addHitAreaFrames(model) {
    const hitAreaFrames = new live2d.HitAreaFrames();

    model.addChild(hitAreaFrames);

    checkbox("Hit Area Frames", (checked) => (hitAreaFrames.visible = checked));
}

function checkbox(name, onChange) {
    const id = name.replace(/\W/g, "").toLowerCase();

    let checkbox = document.getElementById(id);

    if (!checkbox) {
        const p = document.createElement("p");
        p.innerHTML = `<input type="checkbox" id="${id}"> <label for="${id}">${name}</label>`;

        document.getElementById("control").appendChild(p);
        checkbox = p.firstChild;
    }

    checkbox.addEventListener("change", () => {
        onChange(checkbox.checked);
    });

    onChange(checkbox.checked);
}
