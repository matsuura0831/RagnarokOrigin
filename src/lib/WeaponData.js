class Weapon {
    static VERSION = [1, 0];    // major, minor

    constructor(
        custom_skill_up
    ) {
        this.custom_skill_up = custom_skill_up || 0;
    }

    serialize() {
        return [
            ...Weapon.VERSION,
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