const words: string[] = [
  'cheese',
  'bone',
  'socks',
  'leaf',
  'whale',
  'pie',
  'shirt',
  'orange',
  'lollipop',
  'bed',
  'mouth',
  'person',
  'horse',
  'snake',
  'jar',
  'spoon',
  'lamp',
  'kite',
  'monkey',
  'swing',
  'cloud',
  'snowman',
  'baby',
  'eyes',
  'pen',
  'giraffe',
  'grapes',
  'book',
  'ocean',
  'star',
  'cupcake',
  'cow',
  'lips',
  'worm',
  'sun',
  'basketball',
  'hat',
  'bus',
  'chair',
  'purse',
  'head',
  'spider',
  'shoe',
  'ghost',
  'coat',
  'chicken',
  'heart',
  'jellyfish',
  'tree',
  'seashell',
  'duck',
  'bracelet',
  'grass',
  'jacket',
  'slide',
  'doll',
  'spider',
  'clock',
  'cup',
  'bridge',
  'apple',
  'balloon',
  'drum',
  'ears',
  'egg',
  'bread',
  'nose',
  'house',
  'beach',
  'airplane',
  'inchworm',
  'hippo',
  'light',
  'turtle',
  'ball',
  'carrot',
  'cherry',
  'ice',
  'pencil',
  'circle',
  'bed',
  'ant',
  'girl',
  'glasses',
  'flower',
  'mouse',
  'banana',
  'alligator',
  'bell',
  'robot',
  'smile',
  'bike',
  'rocket',
  'dinosaur',
  'dog',
  'bunny',
  'cookie',
  'bowl',
  'apple',
  'door',
  'clog',
  'chestnut',
  'commercial',
  'Atlantis',
  'mine',
  'comfy',
  'ironic',
  'implode',
  'lie',
  'philosopher',
  'hang',
  'vision',
  'dorsal',
  'hail',
  'upgrade',
  'peasant',
  'stout',
  'yolk',
  'car',
  'important',
  'retail',
  'laser',
  'crisp',
  'overture',
  'blacksmith',
  'ditch',
  'exercise',
  'mime',
  'pastry',
  'kilogram',
  'ligament',
  'stowaway',
  'opaque',
  'drought',
  'shrew',
  'tinting',
  'mooch',
  'lyrics',
  'neutron',
  'stockholder',
  'flotsam',
  'cartography',
  'ice fishing',
  'eureka',
  'darkness',
  'dripping',
  'wobble',
  'brunette',
  'rubber',
  'tutor',
  'migrate',
  'myth',
  'psychologist',
  'quarantine',
  'slump',
  'landfill',
  'diagonal',
  'inquisition',
  'husband',
  'ten',
  'exponential',
  'neighborhood',
  'jazz',
  'catalog',
  'gallop',
  'snag',
  'acre',
  'protestant',
  'random',
  'twang',
  'flutter',
  'fireside',
  'clue',
  'figment',
  'ringleader',
  'parody',
  'jungle',
  'armada',
  'mirror',
  'newsletter',
  'sauce',
  'observatory',
  'password',
  'century',
  'bookend',
  'drawback',
  'fabric',
  'siesta',
  'aristocrat',
  'addendum',
  'rainwater',
  'barber',
  'scream',
  'glitter',
  'archaeologist',
  'loiterer',
  'positive',
  'dizzy',
  'czar',
  'hydrogen',
  'horse',
  'door',
  'song',
  'trip',
  'backbone',
  'bomb',
  'round',
  'treasure',
  'garbage',
  'park',
  'whistle',
  'palace',
  'baseball',
  'coal',
  'queen',
  'dominoes',
  'photograph',
  'computer',
  'hockey',
  'aircraft',
  'pepper',
  'key',
  'iPad',
  'whisk',
  'cake',
  'circus',
  'battery',
  'mailman',
  'cowboy',
  'password',
  'bicycle',
  'skate',
  'electricity',
  'lightsaber',
  'nature',
  'shallow',
  'toast',
  'outside',
  'America',
  'roller',
  'blading',
  'gingerbread',
  'man',
  'bowtie',
  'light',
  'bulb',
  'platypus',
  'music',
  'sailboat',
  'popsicle',
  'knee',
  'pineapple',
  'tusk',
  'sprinkler',
  'money',
  'spool',
  'lighthouse',
  'doormat',
  'face',
  'flute',
  'owl',
  'gate',
  'suitcase',
  'bathroom',
  'scale',
  'peach',
  'newspaper',
  'watering',
  'can',
  'hook',
  'school',
  'beaver',
  'camera',
  'hair',
  'dryer',
  'mushroom',
  'quilt',
  'chalk',
  'dollar',
  'soda',
  'chin',
  'swing',
  'garden',
  'ticket',
  'boot',
  'cello',
  'rain',
  'clam',
  'pelican',
  'stingray',
  'nail',
  'sheep',
  'stoplight',
  'coconut',
  'crib',
  'hippopotamus',
  'ring',
  'video',
  'camera',
  'snowflake',
  'picture frame',
  'gel',
  'leg warmers',
  'paint brush',
  'bath fizzers',
  'drill press',
  'chalk',
  'rubber duck',
  'wireless control',
  'word search',
  'spring',
  'stone',
  'rug',
  'thermometer',
  'stockings',
  'CD',
  'fake flowers',
  'model car',
  'check book',
  'vase',
  'hanger',
  'cookie jar',
  'speakers',
  'screw',
  'grid paper',
  'boom box',
  'glasses',
  'sailboat',
  'tooth pick',
  'helmet',
  'puddle',
  'toe ring',
  'clay pot',
  'thread',
  'bow',
  'flag',
  'plastic fork',
  'scotch tape',
  'lamp shade',
  'sketch pad',
  'tissue box',
  'balloon',
  'shoe lace',
  'needle',
  'chandelier',
  'deodorant',
  'button',
  'sticky note',
  'candy wrapper',
  'tooth paste',
  'sharpie',
  'shawl',
  'eye liner',
  'twister',
  'photo album',
  'pencil',
  'sand paper',
  'bookmark',
  'white out',
  'pool stick',
  'spoon',
  'outlet',
  'quilt',
  'seat belt',
  'mouse pad',
  'tire swing',
  'nail filer',
  'tampon',
  'condom',
  'cork',
  'stop sign',
  'rusty nail',
  'gage',
  'rubber band',
  'zipper',
  'canvas',
  'sponge',
  'pop can',
  'key chain',
  'earser',
  'bottle cap',
  'candle',
  'face wash',
  'lace',
  'lip gloss',
  'buckel',
  'shovel',
  'slipper',
  'glow stick',
  'cable',
  'ice cube',
  'credit card',
  'nail clippers',
  'thong',
  'sun glasses',
  'twezzers',
  'hair tie',
  'charger',
  'blouse',
  'card',
  'Pablo Picasso',
  'Simon Bolivar',
  'Mary Magdalene',
  'Queen Victoria',
  'J.K. Rowling',
  'Lord Baden Powell',
  'Rosa Parks',
  'Babe Ruth',
  'Katherine Hepburn',
  'Joseph Stalin',
  'Nelson Mandela',
  'Bill Cosby',
  'Amelia Earhart',
  'Adolf Hitler',
  'Audrey Hepburn',
  'Mother Teresa',
  'Peter Sellers',
  'Billie Jean King',
  'Margaret Thatcher',
  'J.R.R. Tolkien',
  'Prince Charles',
  'Lionel Messi',
  'Oprah Winfrey',
  'Vincent Van Gogh',
  'Muhammad Ali',
  'Steve Jobs',
  'Richard Branson',
  'Thomas Edison',
  'George Bush jnr',
  'Usain Bolt',
  'Ludwig Beethoven',
  'Leonardo da Vinci',
  'Plato',
  'Michael Jackson',
  'Pope Francis',
  'Lyndon Johnson',
  'Tom Cruise',
  'Mikhail Gorbachev',
  'Aung San Suu Kyi',
  'Charles de Gaulle',
  'Anne Frank',
  'Albert Einstein',
  'Henry Ford',
  'John M Keynes',
  'Pele',
  'Leo Tolstoy',
  'Michael Jordon',
  'Malcolm X',
  'Eva Peron',
  'Carl Lewis',
  'Martin Luther King',
  'Christopher Columbus',
  'Woodrow Wilson',
  'Jesse Owens',
  'Pope John Paul II',
  'Mahatma Gandhi',
  'Benazir Bhutto',
  'Tiger Woods',
  'Paul McCartney',
  'Neil Armstrong',
  'Charles Darwin',
  'Marilyn Monroe',
  'Roger Federer',
  'Mao Zedong',
  'George Orwell',
  'John Lennon',
  'Winston Churchill',
  'Desmond Tutu',
  'Coco Chanel',
  'Madonna',
  'Leon Trotsky',
  'Cleopatra',
  'Billie Holiday',
  'Louis Pasteur',
  'Elvis Presley',
  'Jacqueline Kennedy Onassis',
  'Sting',
  'Ronald Reagan',
  'Walt Disney',
  'Abraham Lincoln',
  'Mata Hari',
  'John F. Kennedy',
  'Barack Obama',
  'Ernest Hemingway',
  'Sigmund Freud',
  'Bill Gates',
  'Alfred Hitchcock',
  'Haile Selassie',
  'Queen Elizabeth II',
  'Jawaharlal Nehru',
  'Franklin D. Roosevelt',
  'Indira Gandhi',
  'David Beckham',
  'Vladimir Putin',
  'Fidel Castro',
  'Dalai Lama',
  'Bob Geldof',
  'V. Lenin',
  'C.S. Lewis',
  'Oscar Wilde',
];

export default words;
