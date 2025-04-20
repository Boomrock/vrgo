import { Exercise } from "@scripts/models/Exercise/Exercise";

export enum Pathology {
    PathologyNotListed = 'My pathology is not listed', 
    Stroke = 'Stroke',
    BrainInjury = 'BrainInjury',
    SpinalCordInjury = 'SpinalCordInjury',
    MultipleSclerosis = 'MultipleSclerosis',
    CerebralPalsy = 'CerebralPalsy'
}

export enum BodyPart {
    LEG = "Нога",
    ARM = "Рука"
}

export enum ExerciseType {
    TIMER = "С таймером",
    COUNT = "С количеством"
}

export enum StepType{
    Sample = "Обычный шаг упражнения",
    Mark = "С плюсиком (добавление к упражнению)"
}
export const allExercises = [
    {    
        language: 'ru',
        exercise:
        [
            
            {
                pathology: Pathology.Stroke,
                bodyPart: BodyPart.LEG,
                exercises: [
                    {
                        description: 'Переступая через препядствия:',
                        prefrace: 'Разместите две бутылки на расстоянии в 1,5 метра',
                        exerciseType: ExerciseType.TIMER,
                        steps: [
                            {
                                instruction: 'Пройдите над бутылками геймиплегичной ногий',
                                image: require('@images/pathology/Crossing through obstacles 1.png')
                            },
                            {
                                instruction: 'Размернителсь и начните снова',
                                image: require('@images/pathology/Crossing through obstacles 2.png')
                            },
                        ]
                    },
                    {
                        description: 'Движения ног назад:',
                        prefrace: 'Необходимо опора',
                        steps: [
                            {
                                instruction: 'Вставьте напротив стены, опирайтесь руками о стену',
                                image: require('@images/pathology/move_leg_1.png')
                            },
                            {
                                instruction: 'Отводите гемиплегичную ногу назад, не ставьте ногу на пол',
                                image: require('@images/pathology/move_leg_2.png')
                            }
                        ]
                    },
                    {
                        description: 'Растяжка ног:',
                        prefrace: 'Поставьте два стула',
                        steps: [
                            {
                                instruction: 'Сядьте на стул, вытяните  гемиплегичную ногу, положив на второй стул',
                                image: require('@images/pathology/calf stretch 2.png')
                            },
                            {
                                instruction: 'Нажмите на колено своей здоровой рукой',
                                image: require('@images/pathology/Stretching legs 2.png')
                                
                            },                    {
                                instruction: 'Наклонитесь вперед, не сгибая  ваше колено, оставайтесь в этом позиции 3-5 секунд',
                                image: require('@images/pathology/Stretching legs 3.png')
                                
                            },

                        ]
                    }
                ]},
            {
                pathology: Pathology.Stroke,
                bodyPart: BodyPart.ARM,
                exercises: [{
                    description: 'Передвигаем вес:',
                    prefrace: 'Разместите бутылку с водой рядом со стоящей коробкой',
                    steps: [
                        {
                            instruction: 'Поднимайте бутылку одной рукой',
                            image: require('@images/pathology/Move the bottle 1.png')
                        },
                        {
                            instruction: 'Передавайте бутылку из руки в руку над коробкой',
                            image: require('@images/pathology/Move the bottle 2.png')
                            
                        },
                        {
                            instruction: 'Удерживайте это положение 20–30 секундПоставьте бутылку и повторите то же движение в противоположном направлении',
                            image: require('@images/pathology/Move the bottle 3.png')
                        }
                    ]
                },
                {
                    description: 'Подъем предмета:',
                    prefrace: 'Понадобится вес, например, бутылка',
                    steps: [
                        {
                            instruction: 'Держите бутылку обеими рками',
                            image: require('@images/pathology/Lifting the subject 1.png')
                        },
                        {
                            instruction: 'Поднимите бутылку на максимально возможную высоту',
                            image: require('@images/pathology/Lifting the subject 2.png')
                            
                        },
                        {
                            instruction: 'Поставьте бутылку на стол',
                            image: require('@images/pathology/Lifting the subject 3.png')
                        }
                    ]
                },
                {
                    description: 'Растяжка рук:',
                    prefrace: 'Выполняйте сидя:',
                    steps: [
                        {
                            instruction: 'Захватите гемиплегичное запястье другой рукой',
                            image: require('@images/pathology/Stretching hands 1.png')
                        },
                        {
                            instruction: 'Отводите свою гемиплегичную руку с помощью другой руки',
                            image: require('@images/pathology/Stretching hands 2.png')
                            
                        },
                        {
                            instruction: 'Оставайтесь в этой позиции считая до 5',
                            image: require('@images/pathology/Stretching hands 3.png')

                        }
                    ]
                }
            ]},
            {
                pathology: Pathology.SpinalCordInjury,
                bodyPart: BodyPart.LEG,
                exercises: [
                    {
                        description: 'Колени к груди:',
                        prefrace: 'Примите лежачее положение',
                        steps: [
                            {
                                instruction: 'Одну руку положите на верхнюю часть ноги, немного выше колена',
                                image: require('@images/pathology/Knees to the chest 1.png')
                            },
                            {
                                instruction: 'Поднимайте колено второй ноги к груди',
                            },
                            {
                                instruction: 'Удерживайте колено, досчитайте до 5',
                            },
                            {
                                instruction: 'Затем опустите ногу и выпрямите колено',
                            },
                        ]
                    },
                    {
                        description: 'Маршируем сидя:',
                        preface: 'Сядьте на край сидения',
                        steps: [
                            {
                                instruction: 'Поставив обе ступни на землю',
                                image: require('@images/pathology/We marching sitting 1.png')
                            },
                            {
                                instruction: 'Поочередно поднимайте колени вверх',
                            },
                        ]
                    },
                    {
                        description: 'Подъёмы прямых ног:',
                        preface: 'Лягте, выпрямив ноги',
                        steps: [
                            {
                                instruction: 'Поднимите одну ногу, не сгибая в коленях',
                                image: require('@images/pathology/Lifting straight legs 1 (2).png')
                            },
                            {
                                instruction: 'Когда нога окажется максимально высоко, задержитесь на несколько секунд',
                                image: require('@images/pathology/Lifting straight legs 2 (2).png')
                            },
                            {
                                instruction: 'Опустите ногу и чередуйте с другой ногой',
                            },
                            {
                                instruction: 'Задействовуёте корпус во время выполнения этого упражнения, чтобы избежать чрезмерной нагрузки ',
                                type: StepType.Mark
                            }
                        ]
                    }
            ]},


            {
                pathology: Pathology.SpinalCordInjury,
                bodyPart: BodyPart.ARM,
                exercises: [
                    {
                        description: '“О” и кулаки:',
                        preface: 'Используйте одну или обе руки',
                        steps: [
                            {
                                instruction: 'Поочередно постукивайте кончиками каждого пальца по большому',
                                image: require('@images/pathology/O and fists 1.png')

                            },
                            {
                                instruction: 'Задержитесь на несколько секунд или столько, сколько сможете, и снова выпрямите пальцы'
                            },
                            {
                                instruction: 'После прикосновения к каждому пальцу можно добавить сжатие в кулак',
                                type: StepType.Mark
                            },

                        ],
                    },
                    {
                        description: 'Поворот руки:',
                        prefrace: 'Старайтесь не скручивать и не поворачивать плечо и тело',
                        steps: [
                            {
                                instruction: 'Руку положите на стол ладонью вверх',
                                image: require('@images/pathology/1.png')
                            },
                            {
                                instruction: 'Затем другой рукой поверните ладонь вниз'
                            },
                        ],
                    },
            ]},
            {
                pathology: Pathology.BrainInjury,
                bodyPart: BodyPart.LEG,
                exercises: [
                    {
                        description: 'Отведение бедра сидя:',
                        prefrace: 'Выполняйте сидя',

                        steps: [
                            {
                                instruction: 'Приподнимите ногу и медленно отведите в сторону, насколько сможете ',
                                image: require('@images/pathology/Dispatch Bringing thighs sitting 1.png')
                            },
                            {
                                instruction: 'Верните ногу назад'
                            },
                            {
                                instruction: 'Опустите ногу и выпрямите колено'
                            }
                        ],
                    },
                    {
                        description: 'Маршируем сидя:',
                        preface: 'Выполняется в сидячем положении с сохранением осанки',
                        steps: [
                            {
                                instruction: 'Сначала поднимите колено к груди и задержитесь на 1-2 секунды',
                                image: require('@images/pathology/CMT marching sitting 1.png')
                            },
                            {
                                instruction: 'Затем медленно опустите колено обратно'
                            },
                            {
                                instruction: 'Это можно делать пассивно, используя руки, или активно, используя только силу ног.',
                                type: StepType.Mark
                            }
                        ],
                    },
                    {
                        description: 'Подъемы прямых ног',
                        preface: 'Лягте, согнув одно колено',
                        steps: [
                            {
                                instruction: 'Поднимите вторю ногу, стараясь ее не сгибать ',
                                image: require('@images/pathology/Lifting straight legs 1.png')
                            },
                            {
                                instruction: 'Следует сделать 3 подхода по 10 повторений на каждую ногу',
                                image: require('@images/pathology/Lifting straight legs 2.png')

                            },
                            {
                                instruction: 'Обязательно держите колено полностью прямым, напрягая мышцы бедра',
                                type: StepType.Mark
                            },

                        ],
                    }
                ]},
            {
                pathology: Pathology.BrainInjury,
                bodyPart: BodyPart.ARM,
                exercises: [
                    {
                        description: 'Толкающее движение:',
                        preface: 'Поставьте бутылку с водой сбоку от себя в пределах диапазона движения',
                        steps: [
                            {
                                instruction: 'Затем рукой медленно протолкните ее через стол',
                                image: require('@images/pathology/Pushing movement 1.png')
                            },
                            {
                                instruction: 'Таким же движением верните бутылку на место',
                                image: require('@images/pathology/Pushing movement 2.png')
                            }
                        ],
                    },
                    {
                        description: 'Скручивание бицепса:',
                        preface: 'Держите в руке бутылку с водой',
                        steps: [
                            {
                                instruction: 'Прижав локоть к боку, согните бицепс, поднеся бутылку с водой к плечу',
                                image: require('@images/pathology/Biceps Crunch 1.png')
                            },
                            {
                                instruction: 'Наконец, как можно медленнее опустите руку',
                                image: require('@images/pathology/Biceps Crunch 2.png')

                            }
                        ],
                    },
                    {
                        description: 'Сгибание плеча:',
                        preface: 'Сгибание плеча:',
                        steps: [
                            {
                                instruction: 'Поднимите руку под углом 90 градусов перед собой, до уровня глаз, не сгибая ее',
                                image: require('@images/pathology/Bending shoulder 1.png')
                            },
                            {
                                instruction: 'Задержитесь примерно на 5 секунд, затем медленно опустите руку на колени',
                                image: require('@images/pathology/Bending shoulder 2.png')
                            },
                        ],
                    }
                ]},


            {
                pathology: Pathology.MultipleSclerosis,
                bodyPart: BodyPart.LEG,
                exercises: [
                    {
                        description: 'Подъем со стула:',
                        preface: 'Сядьте прямо на стул, ноги на ширине плеч, колени согнуты под углом 90 градусов',
                        steps: [
                            {
                                instruction: 'Согнитесь в талии, перенося вес вперед',
                                image: require('@images/pathology/Rise from a chair 1.png')
                            },
                            {
                                instruction: 'Отталкивайтесь пятками, пока не встанете, напрягая квадрицепсы и ягодицы'
                            },
                            {
                                instruction: 'Медленно сядьте и повторите'
                            },
                            {
                                instruction: 'Используйте стул или столешницу для дополнительного равновесия и помощи при стоянии',
                                type: StepType.Mark
                            },
                        ],
                    },
                    {
                        description: 'Разгибание ног сидя:',
                        preface: 'Сядьте на прочный стул, касаясь спиной спинки стула',
                        steps: [
                            {
                                instruction: 'Медленно поднимите левую ногу прямо вверх, оставив колено согнутым',
                                image: require('@images/pathology/Sitting legs extension 1.png')
                            },
                            {
                                instruction: 'Задержитесь в таком положении на 10 секунд (или сколько вам удобно)'
                            },
                            {
                                instruction: 'Затем верните ногу на пол.'
                            },
                        ],
                    },
                    {
                        description: 'Упражнение для ног:',
                        preface: 'Встаньте и держитесь за спинку стула обеими руками',
                        steps: [
                            {
                                instruction: 'Поднимите пятку назад и попытайтесь коснуться ягодиц',
                                image: require('@images/pathology/Leg exercise 1.png')
                            },
                            {
                                instruction: 'Опустите ногу обратно на землю как можно медленнее'
                            },
                            {
                                instruction: 'Если не полчаетс, попросите кого-нибудь осторожно помочь вам руками поднять пятку как можно выше, без дискомфорта',
                                type: StepType.Mark
                            }
                        ],
                    }
                ]},
            {
                pathology: Pathology.MultipleSclerosis,
                bodyPart: BodyPart.ARM,
                exercises: [
                    {
                        description: 'Жим от плеч сидя:',
                        preface: 'Сядьте прямо на стул, ноги на ширине плеч и ровно на полу',
                        steps: [
                            {
                                instruction: 'Держите гантели на плечах, запястья смотрят вперед',
                                image: require('@images/pathology/Sitting bench press 1.png')
                            },
                            {
                                instruction: 'Выдохните, когда вы поднимаете вес  вверх, вытягивая руки вертикально',
                                image: require('@images/pathology/Sitting bench press 2.png')
                            },
                            {
                                instruction: 'Вдохните, возвращая вес в исходное положение'
                            }
                        ],
                    },
                    {
                        description: 'Подъем предмета',
                        preface: 'Сядьте на стул без подлокотников или на скамью, руки согнуты в локтях перед собой',
                        steps: [
                            {
                                instruction: 'Прижав локоть к боку, согните бицепс, поднеся бутылку с водой к плечу',
                                image: require('@images/pathology/Sitting turns with twisting 1.png')
                            },
                            {
                                instruction: 'Наконец, как можно медленнее опустите руку',
                                image: require('@images/pathology/Sitting turns with twisting 2.png')

                            },
                        ],
                    },
                    {
                        description: 'Передвигаем вес:',
                        preface: 'Сядьте прямо на стул, ноги на полу',
                        steps: [
                            {
                                instruction: 'Возьмите теннисный мяч в правую руку, широко раскинув руки',
                                image: require('@images/pathology/Sitting visual-motor coordination with tennis ball 1.png')
                            },
                            {
                                instruction: 'Соедините обе руки перед собой, перекладывая мяч в левую руку',
                                image: require('@images/pathology/Sitting visual-motor coordination with tennis ball 2.png')

                            },
                            {
                                instruction: 'Снова широко разведите руки, сводя лопатки вместе.',
                                image: require('@images/pathology/Sitting visual-motor coordination with tennis ball 3.png')

                            }
                        ],
                    }
                ]},
            {
                pathology: Pathology.CerebralPalsy,
                bodyPart: BodyPart.LEG,
                exercises: [
                    {
                        description: 'Растяжка икр:',
                        preface: 'Встаньте рядом с опорой (стена, стул и т. п.)',
                        steps: [
                            {
                                instruction: 'Поставьте одну ногу на шаг позади себя, а затем медленно опустите пятку',
                                image: require('@images/pathology/calf stretch 1.png')
                            },
                            {
                                instruction: 'Через пару секунд верните ногу назад'
                            },
                            {
                                instruction: 'Вы обеспечите глубокое растяжение, отводя ногу  дальше. Чтобы было легче, ставьте ногу ближе к телу',
                                type: StepType.Mark
                            }
                        ],
                    },
                    {
                        description: 'Маршируем сидя',
                        preface: 'Сядьте на край сиденья, поставив обе ступни на землю',
                        steps: [
                            {
                                instruction: 'Поочередно поднимайте колени по одному',
                                image: require('@images/pathology/CP marching sitting 1.png')
                            },
                        ],
                    },
                    {
                        description: 'Растяжка подколенных сухожилий:',
                        preface: 'Сесть на пол, выпрямить обе ноги перед собой',
                        steps: [
                            {
                                instruction: 'Наклонить тело вперед, насколько возможно, не сгибая колени ',
                                image: require('@images/pathology/Exercises for popliteal tendons 1.png')
                            },
                            {
                                instruction: 'Задержитесь на 30 секунд',
                                image: require('@images/pathology/Exercises for popliteal tendons 2.png')
                            },
                        ],
                    }
                ]
                },

            {
                pathology: Pathology.CerebralPalsy,
                bodyPart: BodyPart.ARM,
                exercises: [
                    {
                        exerciseType: ExerciseType.TIMER,
                        executeTime: 30,
                        preface: "Поза для отжиманий, руки чуть шире плеч, шея на одной линии со спиной, лицо вниз", 
                        description: 'Планка:',
                        steps: [
                            {
                                instruction: 'Удерживать положение 20-30 секунд',
                                image: require('@images/pathology/Planck 1.png')
                            },
                            {
                                type: StepType.Mark,
                                instruction: 'Если обычная планка слишком сложна, попробуйте выполнить упражнение согнув локти',
                                image: require('@images/pathology/Planck 2.png')

                            },
                            {
                                type: StepType.Mark,
                                instruction: 'Если выполнять упражнение по-прежнему тяжело, попробуйте встать на колени',
                                image: require('@images/pathology/Planck 3.png')

                            },
                        ],
                    },
                    {
                        description: 'Растяжка плеч:',
                        preface: 'Встаньте и держитесь за спинку стула обеими руками',
                        steps: [
                            {
                                instruction: 'Поднемите одну руку и согните ее за головой',
                                image: require('@images/pathology/Stretching shoulders 1.png')
                            },
                            {
                                instruction: 'Другой рукой осторожно отведите локоть назад, пока не появится напряжение'
                            },
                            {
                                instruction: 'Задержитесь 20-30 секунд, затем поменяйте руки'
                            },

                        ],
                    },
                    {
                        description: 'Растяжка плеча:',
                        preface:'Выполняйте упражнение медленно и аккуратно',
                        steps: [
                            {
                                instruction: 'Перенесите руку через грудь, используйте вторую руку, чтобы удерживать её на месте',
                                image: require('@images/pathology/Hand over the chest 1.png')
                            },
                            {
                                instruction: 'Задержитесь на 20-30 секунд, затем поменяйте сторону',
                                image: require('@images/pathology/Hand over the chest 2.png')

                            },
                        ],
                    }
                ]
                }
        ]
    },
    {
        language: 'en',
        exercise: [
            {
                pathology: Pathology.Stroke,
                bodyPart: BodyPart.LEG,
                exercises: [
                    {
                        description: 'Stepping over obstacles:',
                        preface: 'Place two bottles 1.5 meters apart',
                        exerciseType: ExerciseType.TIMER,
                        steps: [
                            {
                                instruction: 'Step over the bottles with the hemiplegic leg',
                                image: require('@images/pathology/Crossing through obstacles 1.png')
                            },
                            {
                                instruction: 'Rest and start again',
                                image: require('@images/pathology/Crossing through obstacles 2.png')
                            }
                        ]
                    },
                    {
                        description: 'Leg movements backward:',
                        preface: 'Support is necessary',
                        steps: [
                            {
                                instruction: 'Stand facing a wall, lean your hands on the wall',
                                image: require('@images/pathology/move_leg_1.png')
                            },
                            {
                                instruction: 'Move the hemiplegic leg backward, without placing it on the floor',
                                image: require('@images/pathology/move_leg_2.png')
                            }
                        ]
                    },
                    {
                        description: 'Leg stretch:',
                        preface: 'Place two chairs',
                        steps: [
                            {
                                instruction: 'Sit on a chair, stretch out the hemiplegic leg, resting it on the second chair',
                                image: require('@images/pathology/calf stretch 2.png')
                            },
                            {
                                instruction: 'Press on the knee with your healthy hand',
                                image: require('@images/pathology/Stretching legs 2.png')
                            },
                            {
                                instruction: 'Lean forward without bending your knee, stay in this position for 3-5 seconds',
                                image: require('@images/pathology/Stretching legs 3.png')
                            }
                        ]
                    }
                ]
            },
            {
                pathology: Pathology.Stroke,
                bodyPart: BodyPart.ARM,
                exercises: [
                    {
                        description: 'Shifting weight:',
                        preface: 'Place a water bottle next to a standing box',
                        steps: [
                            {
                                instruction: 'Lift the bottle with one hand',
                                image: require('@images/pathology/Move the bottle 1.png')
                            },
                            {
                                instruction: 'Pass the bottle from hand to hand over the box',
                                image: require('@images/pathology/Move the bottle 2.png')
                            },
                            {
                                instruction: 'Hold this position for 20-30 seconds, place the bottle, and repeat the movement in the opposite direction',
                                image: require('@images/pathology/Move the bottle 3.png')
                            }
                        ]
                    },
                    {
                        description: 'Lifting an object:',
                        preface: 'A weight is needed, such as a bottle',
                        steps: [
                            {
                                instruction: 'Hold the bottle with both hands',
                                image: require('@images/pathology/Lifting the subject 1.png')
                            },
                            {
                                instruction: 'Lift the bottle to the maximum possible height',
                                image: require('@images/pathology/Lifting the subject 2.png')
                            },
                            {
                                instruction: 'Place the bottle on the table',
                                image: require('@images/pathology/Lifting the subject 3.png')
                            }
                        ]
                    },
                    {
                        description: 'Arm stretch:',
                        preface: 'Perform while sitting:',
                        steps: [
                            {
                                instruction: 'Grasp the hemiplegic wrist with the other hand',
                                image: require('@images/pathology/Stretching hands 1.png')
                            },
                            {
                                instruction: 'Move your hemiplegic arm using the other hand',
                                image: require('@images/pathology/Stretching hands 2.png')
                            },
                            {
                                instruction: 'Stay in this position, counting to 5',
                                image: require('@images/pathology/Stretching hands 3.png')
                            }
                        ]
                    }
                ]
            },
            {
                pathology: Pathology.SpinalCordInjury,
                bodyPart: BodyPart.LEG,
                exercises: [
                    {
                        description: 'Knees to chest:',
                        preface: 'Lie down',
                        steps: [
                            {
                                instruction: 'Place one hand on the upper part of the leg, slightly above the knee',
                                image: require('@images/pathology/Knees to the chest 1.png')
                            },
                            {
                                instruction: 'Lift the knee of the second leg towards the chest'
                            },
                            {
                                instruction: 'Hold the knee, count to 5'
                            },
                            {
                                instruction: 'Then lower the leg and straighten the knee'
                            }
                        ]
                    },
                    {
                        description: 'Marching while sitting:',
                        preface: 'Sit on the edge of the seat',
                        steps: [
                            {
                                instruction: 'Place both feet on the ground',
                                image: require('@images/pathology/We marching sitting 1.png')
                            },
                            {
                                instruction: 'Lift your knees alternately'
                            }
                        ]
                    },
                    {
                        description: 'Straight leg lifts:',
                        preface: 'Lie down with legs straight',
                        steps: [
                            {
                                instruction: 'Lift one leg without bending the knee',
                                image: require('@images/pathology/Lifting straight legs 1.png')
                            },
                            {
                                instruction: 'When the leg is as high as possible, hold for a few seconds',
                                image: require('@images/pathology/Lifting straight legs 2.png')
                            },
                            {
                                instruction: 'Lower the leg and alternate with the other leg'
                            },
                            {
                                instruction: 'Engage the core while performing this exercise to avoid excessive strain',
                                type: StepType.Mark
                            }
                        ]
                    }
                ]
            },

            {
                pathology: Pathology.SpinalCordInjury,
                bodyPart: BodyPart.ARM,
                exercises: [
                    {
                        description: '"O" and fists:',
                        preface: 'Use one or both hands',
                        steps: [
                            {
                                instruction: 'Alternately tap the tips of each finger on the thumb',
                                image: require('@images/pathology/O and fists 1.png')
                            },
                            {
                                instruction: 'Hold for a few seconds or as long as you can, then straighten your fingers again'
                            },
                            {
                                instruction: 'After touching each finger, you can add a fist clench',
                                type: StepType.Mark
                            }
                        ]
                    },
                    {
                        description: 'Hand rotation:',
                        preface: 'Try not to twist or turn your shoulder and body',
                        steps: [
                            {
                                instruction: 'Place your hand on the table with the palm facing up',
                                image: require('@images/pathology/1.png')
                            },
                            {
                                instruction: 'Then use your other hand to turn the palm down'
                            }
                        ]
                    }
                ]
            },
            {
                pathology: Pathology.BrainInjury,
                bodyPart: BodyPart.LEG,
                exercises: [
                    {
                        description: 'Hip abduction while sitting:',
                        preface: 'Perform while sitting',
                        steps: [
                            {
                                instruction: 'Lift your leg and slowly move it to the side as far as you can',
                                image: require('@images/pathology/Dispatch Bringing thighs sitting 1.png')
                            },
                            {
                                instruction: 'Return the leg back'
                            },
                            {
                                instruction: 'Lower the leg and straighten the knee'
                            }
                        ]
                    },
                    {
                        description: 'Marching while sitting:',
                        preface: 'Perform while sitting with good posture',
                        steps: [
                            {
                                instruction: 'First, lift your knee towards your chest and hold for 1-2 seconds',
                                image: require('@images/pathology/CMT marching sitting 1.png')
                            },
                            {
                                instruction: 'Then slowly lower the knee back down'
                            },
                            {
                                instruction: 'This can be done passively using your hands, or actively using just your leg strength',
                                type: StepType.Mark
                            }
                        ]
                    },
                    {
                        description: 'Straight leg lifts:',
                        preface: 'Lie down with one knee bent',
                        steps: [
                            {
                                instruction: 'Lift the other leg, trying not to bend it',
                                image: require('@images/pathology/Lifting straight legs 1 (2).png')
                            },
                            {
                                instruction: 'Do 3 sets of 10 repetitions for each leg',
                                image: require('@images/pathology/Lifting straight legs 2 (2).png')
                            },
                            {
                                instruction: 'Be sure to keep your knee completely straight by tightening your thigh muscles',
                                type: StepType.Mark
                            }
                        ]
                    }
                ]
            },
            {
                pathology: Pathology.BrainInjury,
                bodyPart: BodyPart.ARM,
                exercises: [
                    {
                        description: 'Pushing movement:',
                        preface: 'Place a water bottle beside you within reach',
                        steps: [
                            {
                                instruction: 'Then, slowly push it across the table with your hand',
                                image: require('@images/pathology/Pushing movement 1.png')
                            },
                            {
                                instruction: 'Return the bottle to its place with the same movement',
                                image: require('@images/pathology/Pushing movement 2.png')
                            }
                        ]
                    },
                    {
                        description: 'Bicep curl:',
                        preface: 'Hold a water bottle in your hand',
                        steps: [
                            {
                                instruction: 'With your elbow tucked to your side, curl the bicep to bring the water bottle towards your shoulder',
                                image: require('@images/pathology/Biceps Crunch 1.png')
                            },
                            {
                                instruction: 'Finally, lower the arm as slowly as possible',
                                image: require('@images/pathology/Biceps Crunch 2.png')
                            }
                        ]
                    },
                    {
                        description: 'Shoulder flexion:',
                        preface: 'Shoulder flexion:',
                        steps: [
                            {
                                instruction: 'Raise your arm at a 90-degree angle in front of you, to eye level, without bending it',
                                image: require('@images/pathology/Bending shoulder 1.png')
                            },
                            {
                                instruction: 'Hold for about 5 seconds, then slowly lower the arm onto your knees',
                                image: require('@images/pathology/Bending shoulder 2.png')
                            }
                        ]
                    }
                ]
            },

            {
                pathology: Pathology.MultipleSclerosis,
                bodyPart: BodyPart.LEG,
                exercises: [
                    {
                        description: 'Chair rise:',
                        preface: 'Sit upright on a chair, feet shoulder-width apart, knees bent at 90 degrees',
                        steps: [
                            {
                                instruction: 'Bend at the waist, shifting your weight forward',
                                image: require('@images/pathology/Rise from a chair 1.png')
                            },
                            {
                                instruction: 'Push through your heels until standing, engaging your quadriceps and glutes'
                            },
                            {
                                instruction: 'Slowly sit back down and repeat'
                            },
                            {
                                instruction: 'Use a chair or countertop for extra balance and assistance when standing',
                                type: StepType.Mark
                            }
                        ]
                    },
                    {
                        description: 'Seated leg extension:',
                        preface: 'Sit on a sturdy chair, with your back touching the backrest',
                        steps: [
                            {
                                instruction: 'Slowly lift your left leg straight up, keeping your knee bent',
                                image: require('@images/pathology/Sitting legs extension 1.png')
                            },
                            {
                                instruction: 'Hold this position for 10 seconds (or as long as comfortable)'
                            },
                            {
                                instruction: 'Then return your leg to the floor.'
                            }
                        ]
                    },
                    {
                        description: 'Leg exercise:',
                        preface: 'Stand and hold onto the back of a chair with both hands',
                        steps: [
                            {
                                instruction: 'Lift your heel backward and try to touch your glutes',
                                image: require('@images/pathology/Leg exercise 1.png')
                            },
                            {
                                instruction: 'Slowly lower your leg back to the ground'
                            },
                            {
                                instruction: 'If unable, ask someone to gently help you lift your heel as high as possible without discomfort',
                                type: StepType.Mark
                            }
                        ]
                    }
                ]
            },
            {
                pathology: Pathology.MultipleSclerosis,
                bodyPart: BodyPart.ARM,
                exercises: [
                    {
                        description: 'Seated shoulder press:',
                        preface: 'Sit upright on a chair, feet shoulder-width apart and flat on the floor',
                        steps: [
                            {
                                instruction: 'Hold dumbbells at shoulder height, wrists facing forward',
                                image: require('@images/pathology/Sitting bench press 1.png')
                            },
                            {
                                instruction: 'Exhale as you lift the weights up, extending your arms vertically',
                                image: require('@images/pathology/Sitting bench press 2.png')
                            },
                            {
                                instruction: 'Inhale as you return the weights to the starting position'
                            }
                        ]
                    },
                    {
                        description: 'Lifting an object:',
                        preface: 'Sit on a chair without armrests or on a bench, with your arms bent in front of you',
                        steps: [
                            {
                                instruction: 'With your elbow tucked to your side, curl the bicep to bring the water bottle towards your shoulder',
                                image: require('@images/pathology/Sitting turns with twisting 1.png')
                            },
                            {
                                instruction: 'Finally, slowly lower your arm as much as possible',
                                image: require('@images/pathology/Sitting turns with twisting 2.png')
                            }
                        ]
                    },
                    {
                        description: 'Moving weight:',
                        preface: 'Sit upright on a chair, feet flat on the floor',
                        steps: [
                            {
                                instruction: 'Hold a tennis ball in your right hand, spreading your arms wide',
                                image: require('@images/pathology/Sitting visual-motor coordination with tennis ball 1.png')
                            },
                            {
                                instruction: 'Bring both hands together in front of you, passing the ball to your left hand',
                                image: require('@images/pathology/Sitting visual-motor coordination with tennis ball 2.png')
                            },
                            {
                                instruction: 'Spread your arms wide again, squeezing your shoulder blades together',
                                image: require('@images/pathology/Sitting visual-motor coordination with tennis ball 3.png')
                            }
                        ]
                    }
                ]
            },
            {
                pathology: Pathology.CerebralPalsy,
                bodyPart: BodyPart.LEG,
                exercises: [
                    {
                        description: 'Calf stretch:',
                        preface: 'Stand next to a support (wall, chair, etc.)',
                        steps: [
                            {
                                instruction: 'Place one foot a step behind you, then slowly lower the heel',
                                image: require('@images/pathology/calf stretch 1.png')
                            },
                            {
                                instruction: 'After a few seconds, return your foot back'
                            },
                            {
                                instruction: 'To get a deeper stretch, move your foot further back. For easier stretching, keep your foot closer to your body',
                                type: StepType.Mark
                            }
                        ]
                    },
                    {
                        description: 'Marching while sitting:',
                        preface: 'Sit on the edge of the seat with both feet on the ground',
                        steps: [
                            {
                                instruction: 'Alternately lift each knee, one at a time',
                                image: require('@images/pathology/CP marching sitting 1.png')
                            }
                        ]
                    },
                    {
                        description: 'Hamstring stretch:',
                        preface: 'Sit on the floor, with both legs straightened in front of you',
                        steps: [
                            {
                                instruction: 'Lean your body forward as much as possible without bending your knees',
                                image: require('@images/pathology/Exercises for popliteal tendons 1.png')
                            },
                            {
                                instruction: 'Hold for 30 seconds',
                                image: require('@images/pathology/Exercises for popliteal tendons 2.png')
                            }
                        ]
                    }
                ]
            },

            {
                pathology: Pathology.CerebralPalsy,
                bodyPart: BodyPart.ARM,
                exercises: [
                    {
                        exerciseType: ExerciseType.TIMER,
                        executeTime: 30,
                        preface: "Push-up position, hands slightly wider than shoulders, neck aligned with the back, face down",
                        description: 'Plank:',
                        steps: [
                            {
                                instruction: 'Hold the position for 20-30 seconds',
                                image: require('@images/pathology/Planck 1.png')
                            },
                            {
                                type: StepType.Mark,
                                instruction: 'If a regular plank is too difficult, try doing it with bent elbows',
                                image: require('@images/pathology/Planck 2.png')
                            },
                            {
                                type: StepType.Mark,
                                instruction: 'If it’s still challenging, try performing the exercise on your knees',
                                image: require('@images/pathology/Planck 3.png')
                            }
                        ]
                    },
                    {
                        description: 'Shoulder stretch:',
                        preface: 'Stand and hold onto the back of a chair with both hands',
                        steps: [
                            {
                                instruction: 'Raise one arm and bend it behind your head',
                                image: require('@images/pathology/Stretching shoulders 1.png')
                            },
                            {
                                instruction: 'Gently pull the elbow back with the other hand until you feel tension'
                            },
                            {
                                instruction: 'Hold for 20-30 seconds, then switch arms'
                            }
                        ]
                    },
                    {
                        description: 'Shoulder stretch:',
                        preface: 'Perform the exercise slowly and carefully',
                        steps: [
                            {
                                instruction: 'Bring your arm across your chest, use the other hand to hold it in place',
                                image: require('@images/pathology/Hand over the chest 1.png')
                            },
                            {
                                instruction: 'Hold for 20-30 seconds, then switch sides',
                                image: require('@images/pathology/Hand over the chest 2.png')
                            }
                        ]
                    }
                ]
            }
            
            
            
            
        ]
    }

]