let rootElem = {
  //корневой элемент проекта
  "hms-pandora": {
    name: "HMS Pandora",
    art: "art-001-000",
    pictures: {
      svg: {
        main: {
          src: '/static/svg/hms-pandora-svg1.svg',
          bindings: {

          }
        },
        others: {

        }
      },
      preview: "/static/images/detail.png",
      images: []
    },
    bindings: {
      parents: [
        //пустой массив если это корень проекта
      ],
      childs: [
        "keel", "frames", "masts"//непосредственные потомки, именно они будут подсвечиваться в свг картинке
      ]
    },
    detailParams: {
      weight: 30000,//вес указывается в граммах для детали или для всей сборки
      dimensions: {//размеры указываются в миллиметрах
        length: 1200,
        width: 700,
        height: 1000,
      },
      buildComplexity: 10,//сложность число от 1 до 10
      description: "HMS Pandora (1779) — 24-пушечный корабль 6 ранга Королевского флота. Спущен на воду 17 мая 1779 года на частной верфи Adams & Barnard, в Дептфорде. Первый корабль, названный Pandora. Известен благодаря экспедиции в поисках Bounty."
    },
    assemblyConnections: {//необходимые детали и крепёж для постройки именно этой детали, в основном нужен для простых деталей, либо для блоков которым нужен другой блок
      details: {
        //пустой объект если таких нет
      },
      fasteners: {
        //пустой объект если таких нет
      }
    },
    statuses: {
      started: true
    },
    quantity:{
      needed: 1,
      bought: 0
    }
  },
  "hms-bellona": {
    name: "HMS Bellona",
    art: "art-002-000",
    pictures: {
      svg: {
        main: {
          src: '/static/svg/hms-bellona-svg1.svg',
          bindings: {

          }
        },
        others: {

        }
      },
      preview: "/static/images/detail.png",
      images: []
    },
    bindings: {
      parents: [
        //пустой массив если это корень проекта
      ],
      childs: [
        "keel", "frames", "masts" //непосредственные потомки, именно они будут подсвечиваться в свг картинке
      ]
    },
    detailParams: {
      weight: 40000,//вес указывается в граммах для детали или для всей сборки
      dimensions: {//размеры указываются в миллиметрах
        length: 1500,
        width: 900,
        height: 1200,
      },
      buildComplexity: 10,//сложность число от 1 до 10
      description: "HMS Bellona (1760) — 74-пушечный линейный корабль 3 ранга Королевского флота, второй корабль, названный в честь Беллоны. Заказан 28 декабря 1757 года. Спущен на воду 19 февраля 1760 года на королевской верфи в Чатеме. Достроен 6 апреля 1760."
    },
    assemblyConnections: {//необходимые детали и крепёж для постройки именно этой детали, в основном нужен для простых деталей, либо для блоков которым нужен другой блок
      details: {
        //пустой объект если таких нет
      },
      fasteners: {
        //пустой объект если таких нет
      }
    },
    statuses: {
      started: false
    },
    quantity:{
      needed: 1,
      bought: 0
    }
  },
};

export default rootElem;