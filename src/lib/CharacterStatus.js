export default class CharacterStatus {
    static VERSION = [1, 0];    // major, minor

    constructor(
        base_atk, equip_atk, refine_atk,
        additional_damage, ignore_mdef, extra_damage,
        magic_damage_up, size_up, race_up, element_enemy_up, boss_up, element_damage_up,
        status_int, status_dex, equip_fix_cast, equip_variable_cast, equip_delay,
    ) {
        this.base_atk = base_atk || 0;
        this.equip_atk = equip_atk || 0;
        this.refine_atk = refine_atk || 0;

        this.additional_damage = additional_damage || 0;
        this.ignore_mdef = ignore_mdef || 0;
        this.extra_damage = extra_damage || 0;

        this.magic_damage_up = magic_damage_up || 0;
        this.size_up = size_up || 0;
        this.race_up = race_up || 0;
        this.element_enemy_up = element_enemy_up || 0;
        this.boss_up = boss_up || 0;
        this.element_damage_up = element_damage_up || 0;

        this.status_int = status_int || 0;
        this.status_dex = status_dex || 0;
        this.equip_fix_cast = equip_fix_cast || 0;
        this.equip_variable_cast = equip_variable_cast || 0;
        this.equip_delay = equip_delay || 0;
    }

    serialize() {
        return [
            ...CharacterStatus.VERSION,
            this.base_atk, this.equip_atk, this.refine_atk,
            this.additional_damage, this.ignore_mdef, this.extra_damage,
            this.magic_damage_up, this.size_up, this.race_up, this.element_enemy_up, this.boss_up, this.element_damage_up,
            this.status_int, this.status_dex, this.equip_fix_cast, this.equip_variable_cast, this.equip_delay,
        ];
    }

    static deserialize(v) {
        const [crnt_major, crnt_minor] = CharacterStatus.VERSION;
        const [major, minor, ...rest] = v;

        if (major != crnt_major) {
            throw `Mismatch major version of CharacterStatus: expected ${crnt_major}.*, actual ${major}.${minor}`;
        }
        if (minor != crnt_minor) {
            console.warn(`Mismatch minor version of CharacterStatus: expected ${crnt_major}.${crnt_minor}, actual ${major}.${minor}`)
        }
        return new CharacterStatus(...rest);
    }

    adjust(adj) {
        function _adj(a, b, k) {
            return Math.round(
                (a[k] / (1 + a.magic_damage_up / 100) + b[k]) * (1 + (a.magic_damage_up + b.magic_damage_up) / 100)
            );
        }

        return new CharacterStatus(
            _adj(this, adj, 'base_atk'),
            _adj(this, adj, 'equip_atk'),
            _adj(this, adj, 'refine_atk'),
            this.additional_damage + adj.additional_damage,
            this.ignore_mdef + adj.ignore_mdef,
            this.extra_damage + adj.extra_damage,
            this.magic_damage_up + adj.magic_damage_up,
            this.size_up + adj.size_up,
            this.race_up + adj.race_up,
            this.element_enemy_up + adj.element_enemy_up,
            this.boss_up + adj.boss_up,
            this.element_damage_up + adj.element_damage_up,
            this.status_int + adj.status_int,
            this.status_dex + adj.status_dex,
            this.equip_fix_cast + adj.equip_fix_cast,
            this.equip_variable_cast + adj.equip_variable_cast,
            this.equip_delay + adj.equip_delay
        );
    }
}
