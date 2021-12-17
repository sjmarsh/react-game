import { UIElement } from './UIElement';
import { SceneryType } from './SceneryType';

export class SceneryItemModel extends UIElement {
    
    SPAWN_HEIGHT = -20;
    MIN_HEIGHT = 20;
    MIN_WIDTH = 20;

    sceneryType;
    
    constructor(props) {
        super(props);
        super.top = this.SPAWN_HEIGHT;
        super.height = this.MIN_HEIGHT;
        super.width = this.MIN_WIDTH;   
        super.left = props.leftXAxis;
        this.sceneryType = this.getRandomSceneryType(props.stageType);
    }

    moveVertical() {
        const moveDistance = 8;
        const growPerspectiveRatio = 1.08;
        this.top += moveDistance;
        this.width *= growPerspectiveRatio;
        this.height *= growPerspectiveRatio;
    }
    
    moveHorizontal(moveDistance) {
        this.left += moveDistance;
    }

    getRandomSceneryType(stageType) {
        let sceneryType = null;
        let sceneryTypes = [
            new SceneryType({ stageType: 'rural', sceneryName: 'tree'}),
            new SceneryType({ stageType: 'rural', sceneryName: 'tree-2' }),
            new SceneryType({ stageType: 'rural', sceneryName: 'sign' }),
            new SceneryType({ stageType: 'rural', sceneryName: 'sign-2' }),

            new SceneryType({ stageType: 'desert', sceneryName: 'cactus' }),
            new SceneryType({ stageType: 'desert', sceneryName: 'cactus-2' }),
            new SceneryType({ stageType: 'desert', sceneryName: 'weed' }),
            new SceneryType({ stageType: 'desert', sceneryName: 'sign' }),

            new SceneryType({ stageType: 'alpine', sceneryName: 'tree' }),
            new SceneryType({ stageType: 'alpine', sceneryName: 'tree-2' }),
            new SceneryType({ stageType: 'alpine', sceneryName: 'sign' }),
            new SceneryType({ stageType: 'alpine', sceneryName: 'sign-2' }),
            new SceneryType({ stageType: 'alpine', sceneryName: 'snowman' }),

            new SceneryType({ stageType: 'city', sceneryName: 'sign' }),
            new SceneryType({ stageType: 'city', sceneryName: 'sign-2' }),
            new SceneryType({ stageType: 'city', sceneryName: 'sign-3' }),
            new SceneryType({ stageType: 'city', sceneryName: 'sign-4' }),
            new SceneryType({ stageType: 'city', sceneryName: 'sign-5' }),

            new SceneryType({ stageType: 'coast', sceneryName: 'palm' })
        ];
        let filteredSceneryTypes = sceneryTypes.filter(s => s.stageType === stageType);
        if(filteredSceneryTypes.length > 0) {
            let randomIndex = Math.floor(Math.random() * filteredSceneryTypes.length);
            sceneryType = filteredSceneryTypes[randomIndex]; 
        }
        
        return sceneryType;
    }
}