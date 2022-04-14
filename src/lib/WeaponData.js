class Weapon {
    static VERSION = [2, 0];    // major, minor

    constructor(
        // 精練
        skill_up,
        skill_mul_up,
        ignore_mdef,
        vcast_p,
        fcast_p,
        fcast_s,
        // 改造
        custom_skill_up
    ) {
        this.skill_up = skill_up || 0;
        this.skill_mul_up = skill_mul_up || 0;
        this.ignore_mdef = ignore_mdef || 0;
        this.vcast_p = vcast_p || 0;
        this.fcast_p = fcast_p || 0;
        this.fcast_s = fcast_s || 0;
        
        this.custom_skill_up = custom_skill_up || 0;
    }

    serialize() {
        return [
            ...Weapon.VERSION,
            this.skill_up,
            this.skill_mul_up,
            this.ignore_mdef,
            this.vcast_p,
            this.fcast_p,
            this.fcast_s,
            this.custom_skill_up,
        ];
    }

    clone() {
        return Weapon.deserialize(this.serialize());
    }

    static deserialize(v) {
        const [crnt_major, crnt_minor] = Weapon.VERSION;
        const [major, minor, ...rest] = v;

        if (major != crnt_major) {
            throw `Mismatch major version of Weapon: expected ${crnt_major}.*, actual ${major}.${minor}`;
        }
        if (minor != crnt_minor) {
            console.warn(`Mismatch minor version of Weapon: expected ${crnt_major}.${crnt_minor}, actual ${major}.${minor}`)
        }
        return new Weapon(...rest);
    }
}

export default {
    clazz: Weapon,

    EMPTY() {
        return new Weapon();
    },
}