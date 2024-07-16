import ExerciseComponent from "@components/exerciseComponent";

export enum Pathology {
    Stroke = 'Инсульт',
    BrainInjury = 'Черепно-мозговые травмы',
    SpinalCordInjury = 'Спино-мозговые травмы',
    MultipleSclerosis = 'Рассеянный склероз',
    CerebralPalsy = 'Церебральный паралич'//"traumaticBrainInjury"
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
//pathology
//bodyPart
//exerciseType
//exercises:[
//description
//prefrace?
//  steps[
//      instruction      
//      image?
//      type?
//  ]
//]
export const allExercises = [
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
                        image: require('@images/patology/Crossing through obstacles 1.png')
                    },
                    {
                        instruction: 'Размернителсь и начните снова',
                        image: require('@images/patology/Crossing through obstacles 2.png')
                    },
                ]
            },
            {
                description: 'Движения ног назад:',
                prefrace: 'Необходимо опора',
                steps: [
                    {
                        instruction: 'Вставьте напротив стены, опирайтесь руками о стену',
                        image: require('@images/patology/move_leg_1.png')
                    },
                    {
                        instruction: 'Отводите гемиплегичную ногу назад, не ставьте ногу на пол',
                        image: require('@images/patology/move_leg_2.png')
                    }
                ]
            },
            {
                description: 'Растяжка ног:',
                prefrace: 'Поставьте два стула',
                steps: [
                    {
                        instruction: 'Сядьте на стул, вытяните  гемиплегичную ногу, положив на второй стул',
                        image: require('@images/patology/calf stretch 2.png')
                    },
                    {
                        instruction: 'Нажмите на колено своей здоровой рукой',
                        image: require('@images/patology/Stretching legs 2.png')
                       
                    },                    {
                        instruction: 'Наклонитесь вперед, не сгибая  ваше колено, оставайтесь в этом позиции 3-5 секунд',
                        image: require('@images/patology/Stretching legs 3.png')
                        
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
                    image: require('@images/patology/Move the bottle 1.png')
                },
                {
                    instruction: 'Передавайте бутылку из руки в руку над коробкой',
                    image: require('@images/patology/Move the bottle 2.png')
                    
                },
                {
                    instruction: 'Удерживайте это положение 20–30 секундПоставьте бутылку и повторите то же движение в противоположном направлении',
                    image: require('@images/patology/Move the bottle 3.png')
                }
            ]
        },
        {
            description: 'Подъем предмета:',
            prefrace: 'Понадобится вес, например, бутылка',
            steps: [
                {
                    instruction: 'Держите бутылку обеими рками',
                    image: require('@images/patology/Lifting the subject 1.png')
                },
                {
                    instruction: 'Поднимите бутылку на максимально возможную высоту',
                    image: require('@images/patology/Lifting the subject 2.png')
                    
                },
                {
                    instruction: 'Поставьте бутылку на стол',
                    image: require('@images/patology/Lifting the subject 3.png')
                }
            ]
        },
        {
            description: 'Растяжка рук:',
            prefrace: 'Выполняйте сидя:',
            steps: [
                {
                    instruction: 'Захватите гемиплегичное запястье другой рукой',
                    image: require('@images/patology/Stretching hands 1.png')
                },
                {
                    instruction: 'Отводите свою гемиплегичную руку с помощью другой руки',
                    image: require('@images/patology/Stretching hands 2.png')
                    
                },
                {
                    instruction: 'Оставайтесь в этой позиции считая до 5',
                    image: require('@images/patology/Stretching hands 3.png')

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
                        image: require('@images/patology/Knees to the chest 1.png')
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
                perface: 'Сядьте на край сидения',
                steps: [
                    {
                        instruction: 'Поставив обе ступни на землю',
                        image: require('@images/patology/We marching sitting 1.png')
                    },
                    {
                        instruction: 'Поочередно поднимайте колени вверх',
                    },
                ]
            },
            {
                description: 'Подъёмы прямых ног:',
                perface: 'Лягте, выпрямив ноги',
                steps: [
                    {
                        instruction: 'Поднимите одну ногу, не сгибая в коленях',
                        image: require('@images/patology/Lifting straight legs 1.png')
                    },
                    {
                        instruction: 'Когда нога окажется максимально высоко, задержитесь на несколько секунд',
                        image: require('@images/patology/Lifting straight legs 2.png')
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
                perface: 'Используйте одну или обе руки',
                steps: [
                    {
                        instruction: 'Поочередно постукивайте кончиками каждого пальца по большому',
                        image: require('@images/patology/O and fists 1.png')

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
                        image: require('@images/patology/1.png')
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
                        image: require('@images/patology/Dispatch Bringing thighs sitting 1.png')
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
                perface: 'Выполняется в сидячем положении с сохранением осанки',
                steps: [
                    {
                        instruction: 'Сначала поднимите колено к груди и задержитесь на 1-2 секунды',
                        image: require('@images/patology/CMT marching sitting 1.png')
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
                perface: 'Лягте, согнув одно колено',
                steps: [
                    {
                        instruction: 'Поднимите вторю ногу, стараясь ее не сгибать ',
                        image: require('@images/patology/Lifting straight legs 1.png')
                    },
                    {
                        instruction: 'Следует сделать 3 подхода по 10 повторений на каждую ногу',
                        image: require('@images/patology/Lifting straight legs 2.png')

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
                perface: 'Поставьте бутылку с водой сбоку от себя в пределах диапазона движения',
                steps: [
                    {
                        instruction: 'Затем рукой медленно протолкните ее через стол',
                        image: require('@images/patology/Pushing movement 1.png')
                    },
                    {
                        instruction: 'Таким же движением верните бутылку на место',
                        image: require('@images/patology/Pushing movement 2.png')
                    }
                ],
            },
            {
                description: 'Скручивание бицепса:',
                perface: 'Держите в руке бутылку с водой',
                steps: [
                    {
                        instruction: 'Прижав локоть к боку, согните бицепс, поднеся бутылку с водой к плечу',
                        image: require('@images/patology/Biceps Crunch 1.png')
                    },
                    {
                        instruction: 'Наконец, как можно медленнее опустите руку',
                        image: require('@images/patology/Biceps Crunch 2.png')

                    }
                ],
            },
            {
                description: 'Сгибание плеча:',
                perface: 'Сгибание плеча:',
                steps: [
                    {
                        instruction: 'Поднимите руку под углом 90 градусов перед собой, до уровня глаз, не сгибая ее',
                        image: require('@images/patology/Bending shoulder 1.png')
                    },
                    {
                        instruction: 'Задержитесь примерно на 5 секунд, затем медленно опустите руку на колени',
                        image: require('@images/patology/Bending shoulder 2.png')
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
                perface: 'Сядьте прямо на стул, ноги на ширине плеч, колени согнуты под углом 90 градусов',
                steps: [
                    {
                        instruction: 'Согнитесь в талии, перенося вес вперед',
                        image: require('@images/patology/Rise from a chair 1.png')
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
                perface: 'Сядьте на прочный стул, касаясь спиной спинки стула',
                steps: [
                    {
                        instruction: 'Медленно поднимите левую ногу прямо вверх, оставив колено согнутым',
                        image: require('@images/patology/Sitting legs extension 1.png')
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
                perface: 'Встаньте и держитесь за спинку стула обеими руками',
                steps: [
                    {
                        instruction: 'Поднимите пятку назад и попытайтесь коснуться ягодиц',
                        image: require('@images/patology/Leg exercise 1.png')
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
                perface: 'Сядьте прямо на стул, ноги на ширине плеч и ровно на полу',
                steps: [
                    {
                        instruction: 'Держите гантели на плечах, запястья смотрят вперед',
                        image: require('@images/patology/Sitting bench press 1.png')
                    },
                    {
                        instruction: 'Выдохните, когда вы поднимаете вес  вверх, вытягивая руки вертикально',
                        image: require('@images/patology/Sitting bench press 2.png')
                    },
                    {
                        instruction: 'Вдохните, возвращая вес в исходное положение'
                    }
                ],
            },
            {
                description: 'Подъем предмета',
                perface: 'Сядьте на стул без подлокотников или на скамью, руки согнуты в локтях перед собой',
                steps: [
                    {
                        instruction: 'Прижав локоть к боку, согните бицепс, поднеся бутылку с водой к плечу',
                        image: require('@images/patology/Sitting turns with twisting 1.png')
                    },
                    {
                        instruction: 'Наконец, как можно медленнее опустите руку',
                        image: require('@images/patology/Sitting turns with twisting 2.png')

                    },
                ],
            },
            {
                description: 'Передвигаем вес:',
                perface: 'Сядьте прямо на стул, ноги на полу',
                steps: [
                    {
                        instruction: 'Возьмите теннисный мяч в правую руку, широко раскинув руки',
                        image: require('@images/patology/Sitting visual-motor coordination with tennis ball 1.png')
                    },
                    {
                        instruction: 'Соедините обе руки перед собой, перекладывая мяч в левую руку',
                        image: require('@images/patology/Sitting visual-motor coordination with tennis ball 2.png')

                    },
                    {
                        instruction: 'Снова широко разведите руки, сводя лопатки вместе.',
                        image: require('@images/patology/Sitting visual-motor coordination with tennis ball 3.png')

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
                perface: 'Встаньте рядом с опорой (стена, стул и т. п.)',
                steps: [
                    {
                        instruction: 'Поставьте одну ногу на шаг позади себя, а затем медленно опустите пятку',
                        image: require('@images/patology/calf stretch 1.png')
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
                perface: 'Сядьте на край сиденья, поставив обе ступни на землю',
                steps: [
                    {
                        instruction: 'Поочередно поднимайте колени по одному',
                        image: require('@images/patology/CP marching sitting 1.png')
                    },
                ],
            },
            {
                description: 'Растяжка подколенных сухожилий:',
                perface: 'Сесть на пол, выпрямить обе ноги перед собой',
                steps: [
                    {
                        instruction: 'Наклонить тело вперед, насколько возможно, не сгибая колени ',
                        image: require('@images/patology/Exercises for popliteal tendons 1.png')
                    },
                    {
                        instruction: 'Задержитесь на 30 секунд',
                        image: require('@images/patology/Exercises for popliteal tendons 2.png')
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
                perface: "Поза для отжиманий, руки чуть шире плеч, шея на одной линии со спиной, лицо вниз", 
                description: 'Планка:',
                steps: [
                    {
                        instruction: 'Удерживать положение 20-30 секунд',
                        image: require('@images/patology/Planck 1.png')
                    },
                    {
                        type: StepType.Mark,
                        instruction: 'Если обычная планка слишком сложна, попробуйте выполнить упражнение согнув локти',
                        image: require('@images/patology/Planck 2.png')

                    },
                    {
                        type: StepType.Mark,
                        instruction: 'Если выполнять упражнение по-прежнему тяжело, попробуйте встать на колени',
                        image: require('@images/patology/Planck 3.png')

                    },
                ],
            },
            {
                description: 'Растяжка плеч:',
                perface: 'Встаньте и держитесь за спинку стула обеими руками',
                steps: [
                    {
                        instruction: 'Поднемите одну руку и согните ее за головой',
                        image: require('@images/patology/Stretching shoulders 1.png')
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
                perface:'Выполняйте упражнение медленно и аккуратно',
                steps: [
                    {
                        instruction: 'Перенесите руку через грудь, используйте вторую руку, чтобы удерживать её на месте',
                        image: require('@images/patology/Hand over the chest 1.png')
                    },
                    {
                        instruction: 'Задержитесь на 20-30 секунд, затем поменяйте сторону',
                        image: require('@images/patology/Hand over the chest 2.png')

                    },
                ],
            }
        ]
        },
]