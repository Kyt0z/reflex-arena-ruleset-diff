const defaultRuleset = { // Competitive (aka CR1)
  'gconst_default_game_timelimit': '10',
  'gconst_expose_timers_to_lua': '0',
  'gconst_powerups_drop': '1',
  'gconst_player_isbullet': '1',
  'gconst_double_jump_velocity': '105',
  'gconst_jump_velocity': '255',
  'gconst_playerinair_acceleration': '0.95',
  'gconst_playerinair_aircontrol': '150',
  'gconst_playerinair_bunny_accelerate': '60',
  'gconst_playerinair_bunny_wishspeed': '30',
  'gconst_playerinair_decceleration': '2.5',
  'gconst_playerinaircrouched_acceleration': '0.475',
  'gconst_playeronground_acceleration': '4000',
  'gconst_playeronground_friction': '6',
  'gconst_playeronground_speed': '320',
  'gconst_playerongroundcrouched_speed': '120',
  'gconst_wallclipping': '1',
  'gconst_world_gravity': '750',
  'gconst_armor100_faratten': '2200',
  'gconst_armor150_faratten': '2200',
  'gconst_armor50_faratten': '2200',
  'gconst_mega_faratten': '2200',
  'gconst_melee_damage': '80',
  'gconst_melee_knockmult': '1.57',
  'gconst_melee_knockmult_airbourne': '0.94',
  'gconst_melee_range': '68',
  'gconst_melee_reload': '800',
  'gconst_melee_trace_radius': '10',
  'gconst_burst_damage': '6',
  'gconst_burst_knockmult': '1.25',
  'gconst_burst_knockmult_airbourne': '1.5',
  'gconst_burst_speed': '4000',
  'gconst_burstgun_ammopickupammo': '10',
  'gconst_burstgun_burstsegments': '6',
  'gconst_burstgun_lowammo': '5',
  'gconst_burstgun_maxammo': '20',
  'gconst_burstgun_reload': '450',
  'gconst_burstgun_startammo': '10',
  'gconst_burstgun_weaponpickupammo': '10',
  'gconst_shotgun_pellet_damage': '5',
  'gconst_shotgun_pellet_knockmult': '1.6',
  'gconst_shotgun_pellet_knockmult_airbourne': '1.4',
  'gconst_shotgun_pellet_range': '4096',
  'gconst_shotgun_pellet_trace_radius_entities': '0.75',
  'gconst_shotgun_pellet_trace_radius_world': '0.75',
  'gconst_shotgun_ammopickupammo': '6',
  'gconst_shotgun_lowammo': '3',
  'gconst_shotgun_maxammo': '12',
  'gconst_shotgun_reload': '900',
  'gconst_shotgun_weaponpickupammo': '6',
  'gconst_grenade_damage': '100',
  'gconst_grenade_damage_splashmult': '0.85',
  'gconst_grenade_explosion_radius': '180',
  'gconst_grenade_gravity': '700',
  'gconst_grenade_speed_initial': '700',
  'gconst_grenade_trace_radius_entities': '2',
  'gconst_grenade_trace_radius_world': '2',
  'gconst_grenadelauncher_ammopickupammo': '5',
  'gconst_grenadelauncher_lowammo': '2',
  'gconst_grenadelauncher_maxammo': '10',
  'gconst_grenadelauncher_reload': '800',
  'gconst_grenadelauncher_weaponpickupammo': '5',
  'gconst_cell_damage': '16',
  'gconst_cell_damage_splashmult': '1',
  'gconst_cell_explosion_radius': '32',
  'gconst_cell_knockmult': '0.85',
  'gconst_cell_knockmult_airbourne': '1',
  'gconst_cell_knockmult_self': '2',
  'gconst_cell_speed': '2000',
  'gconst_cell_trace_radius_entities': '2.5',
  'gconst_cell_trace_radius_world': '2.5',
  'gconst_plasmarifle_ammopickupammo': '50',
  'gconst_plasmarifle_lowammo': '25',
  'gconst_plasmarifle_maxammo': '100',
  'gconst_plasmarifle_reload': '100',
  'gconst_plasmarifle_weaponpickupammo': '50',
  'gconst_rocket_damage': '100',
  'gconst_rocket_damage_splashmult': '0.85',
  'gconst_rocket_explosion_radius': '120',
  'gconst_rocket_knockmult': '0.85',
  'gconst_rocket_knockmult_airbourne': '1',
  'gconst_rocket_knockmult_self': '1.12',
  'gconst_rocket_speed': '1000',
  'gconst_rocket_trace_radius_entities': '1.25',
  'gconst_rocket_trace_radius_world': '1.25',
  'gconst_rocketlauncher_ammopickupammo': '8',
  'gconst_rocketlauncher_lowammo': '4',
  'gconst_rocketlauncher_maxammo': '16',
  'gconst_rocketlauncher_reload': '800',
  'gconst_rocketlauncher_weaponpickupammo': '8',
  'gconst_beam_damage': '6',
  'gconst_beam_distance': '768',
  'gconst_beam_knockmult': '1.6',
  'gconst_beam_knockmult_airbourne': '1.6',
  'gconst_beam_trace_radius_entities': '0.75',
  'gconst_beam_trace_radius_world': '0.75',
  'gconst_ioncannon_ammopickupammo': '75',
  'gconst_ioncannon_hum': '1',
  'gconst_ioncannon_hum_faratten': '1250',
  'gconst_ioncannon_lowammo': '35',
  'gconst_ioncannon_maxammo': '150',
  'gconst_ioncannon_reload': '44',
  'gconst_ioncannon_weaponpickupammo': '75',
  'gconst_bolt_damage': '80',
  'gconst_bolt_knockmult': '0.5',
  'gconst_bolt_knockmult_airbourne': '0.5',
  'gconst_bolt_range': '16384',
  'gconst_bolt_trace_radius_entities': '0.75',
  'gconst_bolt_trace_radius_world': '0.75',
  'gconst_boltrifle_ammopickupammo': '5',
  'gconst_boltrifle_hum': '1',
  'gconst_boltrifle_hum_faratten': '1500',
  'gconst_boltrifle_lowammo': '2',
  'gconst_boltrifle_maxammo': '10',
  'gconst_boltrifle_reload': '1375',
  'gconst_boltrifle_weaponpickupammo': '5',
  'gconst_stake_damage': '100',
  'gconst_stake_gravity': '700',
  'gconst_stake_knockmult': '1',
  'gconst_stake_knockmult_airbourne': '1',
  'gconst_stake_radius': '2',
  'gconst_stake_speed': '3500',
  'gconst_stake_trace_radius': '1',
  'gconst_stakelauncher_ammopickupammo': '5',
  'gconst_stakelauncher_enabled': '0',
  'gconst_stakelauncher_lowammo': '5',
  'gconst_stakelauncher_maxammo': '20',
  'gconst_stakelauncher_reload': '1250',
  'gconst_stakelauncher_weaponpickupammo': '10'
};