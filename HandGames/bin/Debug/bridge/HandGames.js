/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.0.0-beta4
 */
Bridge.assembly("HandGames", function ($asm, globals) {
    "use strict";

    Bridge.define("HandGames.Player", {
        fields: {
            Hand: null,
            Game: null,
            lost: false,
            IsHandmaided: false
        },
        ctors: {
            ctor: function (Game) {
                this.$initialize();
                this.Hand = new HandGames.Hand((this.Game = Game), this);
            }
        },
        methods: {
            Lose: function () {
                var notLostPlayers = System.Linq.Enumerable.from(this.Game.players).where($asm.$.HandGames.Player.f1);
                if (notLostPlayers.count() === 1) {
                    this.Game.won = notLostPlayers.first();
                }
                this.lost = true;
            },
            EndTurn: function () {
                var $step = 0,
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    player, 
                    $t, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0], $step);
                                switch ($step) {
                                    case 0: {
                                        if (System.Linq.Enumerable.from(this.Game.players).count($asm.$.HandGames.Player.f2) === 1) {
                                            this.Game.won = System.Linq.Enumerable.from(this.Game.players).first($asm.$.HandGames.Player.f3);
                                            $tcs.setResult(null);
                                            return;
                                        }
                                        do {
                                            player = this.Game.players.getItem(($t = (((this.Game.turnIdx + 1) | 0)) % this.Game.players.Count, this.Game.turnIdx = $t, $t));
                                        } while (player.lost);
                                        player.OnTurnStart();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            OnTurnStart: function () {
                var $step = 0,
                    $task1, 
                    $task2, 
                    $jumpFromFinally, 
                    countess, 
                    kingOrPrince, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        for (;;) {
                            $step = System.Array.min([0,1,2,3,4,5,6,8], $step);
                            switch ($step) {
                                case 0: {
                                    this.IsHandmaided = false;
                                    if (Bridge.is(this.Game, HandGames.LoveLetterGame)) {
                                        $step = 1;
                                        continue;
                                    } 
                                    $step = 3;
                                    continue;
                                }
                                case 1: {
                                    $task1 = this.Game.TopCard().MoveCardTo(this.Hand);
                                    $step = 2;
                                    $task1.continueWith($asyncBody, true);
                                    return;
                                }
                                case 2: {
                                    $task1.getAwaitedResult();
                                    $step = 3;
                                    continue;
                                }
                                case 3: {
                                    countess = System.Linq.Enumerable.from(this.Hand.cards).firstOrDefault($asm.$.HandGames.Player.f4, null);
                                    if (countess != null) {
                                        $step = 4;
                                        continue;
                                    } 
                                    $step = 8;
                                    continue;
                                }
                                case 4: {
                                    kingOrPrince = System.Linq.Enumerable.from(this.Hand.cards).firstOrDefault($asm.$.HandGames.Player.f5, null);
                                    if (kingOrPrince != null) {
                                        $step = 5;
                                        continue;
                                    } 
                                    $step = 7;
                                    continue;
                                }
                                case 5: {
                                    $task2 = countess.Play();
                                    $step = 6;
                                    $task2.continueWith($asyncBody, true);
                                    return;
                                }
                                case 6: {
                                    $task2.getAwaitedResult();
                                    $step = 7;
                                    continue;
                                }

                                case 8: {
                                    return;
                                }
                                default: {
                                    return;
                                }
                            }
                        }
                    }, arguments);

                $asyncBody();
            }
        }
    });

    Bridge.ns("HandGames.Player", $asm.$);

    Bridge.apply($asm.$.HandGames.Player, {
        f1: function (v) {
            return !v.lost;
        },
        f2: function (v) {
        return v.lost;
    },
        f3: function (v) {
        return !v.lost;
    },
        f4: function (v) {
        return Bridge.is(v, HandGames.Cards.CountessCard);
    },
        f5: function (v) {
        return Bridge.is(v, HandGames.Cards.KingCard) || Bridge.is(v, HandGames.Cards.PrinceCard);
    }
    });

    Bridge.define("HandGames.Card", {
        statics: {
            fields: {
                glideTime: null
            },
            ctors: {
                init: function () {
                    this.glideTime = new System.TimeSpan();
                    this.glideTime = System.TimeSpan.fromSeconds(0.65);
                }
            }
        },
        fields: {
            in: null,
            image: null,
            Highlighted: false,
            oldLoc: null,
            animationDone: null,
            orgDate: null,
            from: null
        },
        methods: {
            OnDiscard: function () {
                var $step = 0,
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0], $step);
                                switch ($step) {
                                    case 0: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            Draw: function () {
                if (System.TimeSpan.gt((System.DateTime.subdd(new Date(), this.orgDate)), HandGames.Card.glideTime)) {
                    if (!this.animationDone.task.isCompleted()) {
                        this.animationDone.setResult(null);
                    }
                }
                var drawInfo = this.in.GetDrawingPosition(this);
                var newLoc = drawInfo.DrawPosition.$clone();
                if (System.Nullable.lifteq(Microsoft.Xna.Framework.Rectangle.op_Equality, System.Nullable.lift1("$clone", newLoc), null)) {
                    return;
                }
                var rect = System.Nullable.getValue(newLoc);
                if (System.Nullable.liftne(Microsoft.Xna.Framework.Rectangle.op_Inequality, System.Nullable.lift1("$clone", this.oldLoc), null)) {
                    var oldLocReal = System.Nullable.getValue(this.oldLoc);
                    var glideN = ((System.DateTime.subdd(new Date(), System.Nullable.getValue(this.orgDate))).getTicks() / System.Int64.toNumber(HandGames.Card.glideTime.getTicks()));
                    rect = new Microsoft.Xna.Framework.Rectangle.$ctor1(Microsoft.Xna.Framework.Vector2.Lerp(oldLocReal.Location.ToVector2(), rect.Location.ToVector2(), glideN).ToPoint(), Microsoft.Xna.Framework.Vector2.Lerp(oldLocReal.Size.ToVector2(), rect.Size.ToVector2(), glideN).ToPoint());
                }
                if (this.Highlighted) {
                    var highlightRectangle = new Microsoft.Xna.Framework.Rectangle.$ctor2(((rect.X - 1) | 0), ((rect.Y - 1) | 0), ((rect.Width + 1) | 0), ((rect.Height + 1) | 0));
                    this.in.Game.spriteBatch.Draw(this.in.Game.rectangle, new Microsoft.Xna.Framework.Rectangle.$ctor1(highlightRectangle.Location.$clone(), new Microsoft.Xna.Framework.Point.$ctor2(1, rect.Height)), Microsoft.Xna.Framework.Color.Yellow.$clone());
                    this.in.Game.spriteBatch.Draw(this.in.Game.rectangle, new Microsoft.Xna.Framework.Rectangle.$ctor1(new Microsoft.Xna.Framework.Point.$ctor2(highlightRectangle.Right, highlightRectangle.Y), new Microsoft.Xna.Framework.Point.$ctor2(1, rect.Height)), Microsoft.Xna.Framework.Color.Yellow.$clone());
                    this.in.Game.spriteBatch.Draw(this.in.Game.rectangle, new Microsoft.Xna.Framework.Rectangle.$ctor2(rect.X, highlightRectangle.Y, rect.Width, 1), Microsoft.Xna.Framework.Color.Yellow.$clone());
                    this.in.Game.spriteBatch.Draw(this.in.Game.rectangle, new Microsoft.Xna.Framework.Rectangle.$ctor2(rect.X, highlightRectangle.Bottom, rect.Width, 1), Microsoft.Xna.Framework.Color.Yellow.$clone());
                }
                this.in.Game.spriteBatch.Draw(drawInfo.ShowCardBack ? this.in.Game.cardback : this.image, rect.$clone(), Microsoft.Xna.Framework.Color.White.$clone());

            },
            Play: function () {
                var $step = 0,
                    $task1, 
                    $task2, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this.OnPlay();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        $task2 = this.MoveCardTo(this.in.Game.discardPile);
                                        $step = 2;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $task2.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            MoveCardTo: function (to) {
                var $step = 0,
                    $task1, 
                    $task2, 
                    $taskResult2, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    oldPos, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5,6], $step);
                                switch ($step) {
                                    case 0: {
                                        if (Bridge.is(this.in, HandGames.Hand) && Bridge.is(to, HandGames.DiscardPile)) {
                                            $step = 1;
                                            continue;
                                        } 
                                        $step = 3;
                                        continue;
                                    }
                                    case 1: {
                                        $task1 = this.OnDiscard();
                                        $step = 2;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $task1.getAwaitedResult();
                                        $step = 3;
                                        continue;
                                    }
                                    case 3: {
                                        this.Highlighted = false;
                                        oldPos = this.in.GetDrawingPosition(this);
                                        this.in.Remove(this);
                                        to.Add(this);
                                        if (!(oldPos.Permissions === HandGames.DrawInfo.DrawPermission.Undrawable || to.GetDrawingPosition(this).Permissions === HandGames.DrawInfo.DrawPermission.Undrawable)) {
                                            $step = 4;
                                            continue;
                                        } 
                                        $step = 6;
                                        continue;
                                    }
                                    case 4: {
                                        this.oldLoc = oldPos.DrawPosition.$clone();
                                        this.orgDate = new Date();
                                        this.from = this.in;
                                        this.animationDone = new System.Threading.Tasks.TaskCompletionSource();
                                        $task2 = this.animationDone.task;
                                        $step = 5;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 5: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        this.animationDone = null;
                                        this.orgDate = null;
                                        this.from = null;
                                        this.oldLoc = null;
                                        $step = 6;
                                        continue;
                                    }
                                    case 6: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("HandGames.CardPool", {
        fields: {
            Game: null
        },
        ctors: {
            ctor: function (game) {
                this.$initialize();
                this.Game = game;
            }
        },
        methods: {
            Add: function (card) {
                card.in = this;
            },
            Remove: function (card) {
                if (Bridge.referenceEquals(card.in, this)) {
                    card.in = null;
                }
            }
        }
    });

    Bridge.define("HandGames.DrawInfo", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new HandGames.DrawInfo(); }
            }
        },
        fields: {
            DrawPosition: null,
            Permissions: 0,
            ShowCardBack: false
        },
        ctors: {
            init: function () {
                this.DrawPosition = new Microsoft.Xna.Framework.Rectangle();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3871858829, this.DrawPosition, this.Permissions, this.ShowCardBack]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, HandGames.DrawInfo)) {
                    return false;
                }
                return Bridge.equals(this.DrawPosition, o.DrawPosition) && Bridge.equals(this.Permissions, o.Permissions) && Bridge.equals(this.ShowCardBack, o.ShowCardBack);
            },
            $clone: function (to) {
                var s = to || new HandGames.DrawInfo();
                s.DrawPosition = this.DrawPosition.$clone();
                s.Permissions = this.Permissions;
                s.ShowCardBack = this.ShowCardBack;
                return s;
            }
        }
    });

    Bridge.define("HandGames.DrawInfo.DrawPermission", {
        $kind: "enum",
        statics: {
            fields: {
                Undrawable: 0,
                Animatable: 1,
                Drawable: 2
            }
        }
    });

    /** @namespace HandGames */

    /**
     * This is the main type for your game.
     *
     * @abstract
     * @public
     * @class HandGames.HandGame
     * @augments Microsoft.Xna.Framework.Game
     */
    Bridge.define("HandGames.HandGame", {
        inherits: [Microsoft.Xna.Framework.Game],
        fields: {
            graphics: null,
            spriteBatch: null,
            players: null,
            won: null,
            cardImages: null,
            cardback: null,
            discardPile: null,
            turnIdx: 0,
            rnd: null,
            rectangle: null,
            deck: null,
            ui: null,
            font: null,
            choiceFont: null,
            LastMouseDown: false,
            holdingDown: false
        },
        ctors: {
            init: function () {
                this.players = new (System.Collections.Generic.List$1(HandGames.Player))();
                this.rnd = new System.Random.ctor();
            },
            ctor: function () {
                this.$initialize();
                Microsoft.Xna.Framework.Game.ctor.call(this);
                var $t;
                this.graphics = ($t = new Microsoft.Xna.Framework.GraphicsDeviceManager(this), $t.IsFullScreen = true, $t.PreferredBackBufferWidth = 1366, $t.PreferredBackBufferHeight = 768, $t);
                this.Content.RootDirectory = "Content";
                this.IsMouseVisible = true;
        }
    },
    methods: {
        /**
         * Allows the game to perform any initialization it needs to before starting to run.
         This is where it can query for any required services and load any non-graphic
         related content.  Calling base.Initialize will enumerate through any components
         and initialize them as well.
         *
         * @instance
         * @protected
         * @override
         * @this HandGames.HandGame
         * @memberof HandGames.HandGame
         * @return  {void}
         */
        Initialize: function () {
            // TODO: Add your initialization logic here

            Microsoft.Xna.Framework.Game.prototype.Initialize.call(this);
        },
        /**
         * LoadContent will be called once per game and is the place to load
         all of your content.
         *
         * @instance
         * @protected
         * @override
         * @this HandGames.HandGame
         * @memberof HandGames.HandGame
         * @return  {void}
         */
        LoadContent: function () {
            var $t;
            // Create a new SpriteBatch, which can be used to draw textures.
            this.spriteBatch = new Microsoft.Xna.Framework.Graphics.SpriteBatch(this.GraphicsDevice);
            this.cardImages = new (System.Collections.Generic.List$1(Microsoft.Xna.Framework.Graphics.Texture2D))();
            this.deck = new HandGames.Deck(this);
            this.discardPile = new HandGames.DiscardPile(this);
            // TODO: use this.Content to load your game content here
            this.font = this.Content.Load(Microsoft.Xna.Framework.Graphics.SpriteFont, "Arial");
            this.choiceFont = this.Content.Load(Microsoft.Xna.Framework.Graphics.SpriteFont, "Choice Text");
            this.rectangle = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "white");
            this.cardback = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, System.String.format("{0}/cardback", this.ContentFolderName));
            this.players.add((this.ui = new HandGames.LocalPlayer(this)));
            this.players.add(new HandGames.AIPlayer(this));
            do {
                var n = 0;
                $t = Bridge.getEnumerator(this.cards, "GetEnumerator");
                try {
                    while ($t.moveNext()) {
                        var cardKeyPair = $t.Current;
                        var image = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, System.String.format("{0}/{1}{2}", this.ContentFolderName, Bridge.box(((n + 1) | 0), System.Int32), cardKeyPair.key));
                        this.cardImages.add(image);
                        for (var idx = 0; idx < cardKeyPair.value; idx = (idx + 1) | 0) {
                            var card = Bridge.cast(Bridge.Reflection.invokeCI(Bridge.Reflection.getMembers(Bridge.Reflection.getType(System.String.format("HandGames.Cards.{0}Card", cardKeyPair.key), $asm), 1, 284, null, System.Array.init([], Function)), System.Array.init(0, null, System.Object)), HandGames.Card);
                            card.image = image;
                            this.deck.Add(card);
                        }
                        n = (n + 1) | 0;
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }} while (false);
            this.ShuffleDeck();
            this.players.forEach(Bridge.fn.bind(this, $asm.$.HandGames.HandGame.f1));
            this.players.getItem(this.turnIdx).OnTurnStart();
        },
        TopCard: function () {
            return this.deck.cards.getItem(0);
        },
        ShuffleDeck: function () {

            var n = this.deck.cards.Count;
            while (n > 1) {
                n = (n - 1) | 0;
                var k = this.rnd.next$1(((n + 1) | 0));
                var value = this.deck.cards.getItem(k);
                this.deck.cards.setItem(k, this.deck.cards.getItem(n));
                this.deck.cards.setItem(n, value);
            }
        },
        /**
         * UnloadContent will be called once per game and is the place to unload
         game-specific content.
         *
         * @instance
         * @protected
         * @override
         * @this HandGames.HandGame
         * @memberof HandGames.HandGame
         * @return  {void}
         */
        UnloadContent: function () {
            // TODO: Unload any non ContentManager content here
        },
        /**
         * Allows the game to run logic such as updating the world,
         checking for collisions, gathering input, and playing audio.
         *
         * @instance
         * @protected
         * @override
         * @this HandGames.HandGame
         * @memberof HandGames.HandGame
         * @param   {Microsoft.Xna.Framework.GameTime}    gameTime    Provides a snapshot of timing values.
         * @return  {void}
         */
        Update: function (gameTime) {
            // TODO: Add your update logic here
            var _holdingDown = Microsoft.Xna.Framework.Input.Mouse.GetState().LeftButton === Microsoft.Xna.Framework.Input.ButtonState.Pressed;
            this.LastMouseDown = _holdingDown && !this.holdingDown;
            this.holdingDown = _holdingDown;
            if (this.won == null) {
                this.ui.Update();
            }
            Microsoft.Xna.Framework.Game.prototype.Update.call(this, gameTime);
        },
        /**
         * This is called when the game should draw itself.
         *
         * @instance
         * @protected
         * @override
         * @this HandGames.HandGame
         * @memberof HandGames.HandGame
         * @param   {Microsoft.Xna.Framework.GameTime}    gameTime    Provides a snapshot of timing values.
         * @return  {void}
         */
        Draw: function (gameTime) {
            this.GraphicsDevice.Clear(Microsoft.Xna.Framework.Color.CornflowerBlue.$clone());

            // TODO: Add your drawing code here

            this.spriteBatch.Begin();
            if (this.won == null) {
                this.ui.Draw();
            } else {
                var text = System.String.format("{0} has won.", Bridge.Reflection.getTypeName(Bridge.getType(this.won)));
                var measure = this.font.MeasureString(text);
                this.spriteBatch.DrawString(this.font, text, new Microsoft.Xna.Framework.Vector2.$ctor2((this.GraphicsDevice.Viewport.Width - measure.X) / 2, (this.GraphicsDevice.Viewport.Height - measure.Y) / 2), Microsoft.Xna.Framework.Color.Red.$clone());
            }
            this.spriteBatch.End();

            Microsoft.Xna.Framework.Game.prototype.Draw.call(this, gameTime);
        }
    }
    });

    Bridge.ns("HandGames.HandGame", $asm.$);

    Bridge.apply($asm.$.HandGames.HandGame, {
        f1: function (player) {
            for (var i = 0; i < 1; i = (i + 1) | 0) {
                var topCard = this.TopCard();
                this.deck.Remove(topCard);
                player.Hand.Add(topCard);
            }
        }
    });

    Bridge.define("HandGames.LocalPlayer.AlertScreen", {
        $kind: "enum",
        statics: {
            fields: {
                ChooseAPlayer: 1,
                NameACard: 2,
                ViewCards: 6
            }
        },
        $flags: true
    });

    Bridge.define("HandGames.Pointer$1", function (T) { return {
        statics: {
            methods: {
                op_Implicit: function (value) {
                    return value.value;
                },
                op_OnesComplement: function (value) {
                    return value.value;
                }
            }
        },
        fields: {
            value: Bridge.getDefaultValue(T)
        },
        ctors: {
            ctor: function (value) {
                this.$initialize();
                this.value = value;
            }
        },
        methods: {
            SetValue: function (value) {
                this.value = value;
            }
        }
    }; });

    Bridge.define("HandGames.Program", {
        main: function Main () {
            var game = new HandGames.LoveLetterGame();
            try {
                game.Run();
            }
            finally {
                if (Bridge.hasValue(game)) {
                    game.System$IDisposable$dispose();
                }
            }
        }
    });

    Bridge.define("System.Collections._HashHelpers", {
        statics: {
            fields: {
                HashPrime: 0,
                primes: null,
                MaxPrimeArrayLength: 0
            },
            ctors: {
                init: function () {
                    this.HashPrime = 101;
                    this.primes = System.Array.init([
                        3, 
                        7, 
                        11, 
                        17, 
                        23, 
                        29, 
                        37, 
                        47, 
                        59, 
                        71, 
                        89, 
                        107, 
                        131, 
                        163, 
                        197, 
                        239, 
                        293, 
                        353, 
                        431, 
                        521, 
                        631, 
                        761, 
                        919, 
                        1103, 
                        1327, 
                        1597, 
                        1931, 
                        2333, 
                        2801, 
                        3371, 
                        4049, 
                        4861, 
                        5839, 
                        7013, 
                        8419, 
                        10103, 
                        12143, 
                        14591, 
                        17519, 
                        21023, 
                        25229, 
                        30293, 
                        36353, 
                        43627, 
                        52361, 
                        62851, 
                        75431, 
                        90523, 
                        108631, 
                        130363, 
                        156437, 
                        187751, 
                        225307, 
                        270371, 
                        324449, 
                        389357, 
                        467237, 
                        560689, 
                        672827, 
                        807403, 
                        968897, 
                        1162687, 
                        1395263, 
                        1674319, 
                        2009191, 
                        2411033, 
                        2893249, 
                        3471899, 
                        4166287, 
                        4999559, 
                        5999471, 
                        7199369
                    ], System.Int32);
                    this.MaxPrimeArrayLength = 2146435069;
                }
            },
            methods: {
                IsPrime: function (candidate) {
                    if ((candidate & 1) !== 0) {
                        var limit = Bridge.Int.clip32(Math.sqrt(candidate));
                        for (var divisor = 3; divisor <= limit; divisor = (divisor + 2) | 0) {
                            if ((candidate % divisor) === 0) {
                                return false;
                            }
                        }
                        return true;
                    }
                    return (candidate === 2);
                },
                GetPrime: function (min) {
                    if (min < 0) {
                        throw new System.ArgumentException("Hashtable's capacity overflowed and went negative. Check load factor, capacity and the current size of the table.");
                    }
                    for (var i = 0; i < System.Collections._HashHelpers.primes.length; i = (i + 1) | 0) {
                        var prime = System.Collections._HashHelpers.primes[System.Array.index(i, System.Collections._HashHelpers.primes)];
                        if (prime >= min) {
                            return prime;
                        }
                    }
                    for (var i1 = (min | 1); i1 < 2147483647; i1 = (i1 + 2) | 0) {
                        if (System.Collections._HashHelpers.IsPrime(i1) && ((((i1 - 1) | 0)) % System.Collections._HashHelpers.HashPrime !== 0)) {
                            return i1;
                        }
                    }
                    return min;
                },
                GetMinPrime: function () {
                    return System.Collections._HashHelpers.primes[System.Array.index(0, System.Collections._HashHelpers.primes)];
                },
                ExpandPrime: function (oldSize) {
                    var newSize = (2 * oldSize) | 0;
                    if ((newSize >>> 0) > System.Collections._HashHelpers.MaxPrimeArrayLength && System.Collections._HashHelpers.MaxPrimeArrayLength > oldSize) {
                        return System.Collections._HashHelpers.MaxPrimeArrayLength;
                    }
                    return System.Collections._HashHelpers.GetPrime(newSize);
                }
            }
        }
    });

    Bridge.define("HandGames.AIPlayer", {
        inherits: [HandGames.Player],
        ctors: {
            ctor: function (Game) {
                this.$initialize();
                HandGames.Player.ctor.call(this, Game);
            }
        },
        methods: {
            TargetCard: function () {
                var $step = 0,
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0], $step);
                                switch ($step) {
                                    case 0: {
                                        $tcs.setResult(this.Game.cardImages.getItem(3));
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            LookAtCards: function (cardPool) {
                var $step = 0,
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0], $step);
                                switch ($step) {
                                    case 0: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            OnTurnStart: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    c, 
                    o, 
                    l, 
                    i, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        for (;;) {
                            $step = System.Array.min([0,1], $step);
                            switch ($step) {
                                case 0: {
                                    HandGames.Player.prototype.OnTurnStart.call(this);
                                    c = this.Hand.cards;o = System.Linq.Enumerable.from(c).orderBy($asm.$.HandGames.AIPlayer.f1);l = System.Linq.Enumerable.from(o).toList(HandGames.Card);
                                    i = System.Linq.Enumerable.from(l).first();
                                    $task1 = i.Play();
                                    $step = 1;
                                    $task1.continueWith($asyncBody, true);
                                    return;
                                }
                                case 1: {
                                    $task1.getAwaitedResult();
                                    return;
                                }
                                default: {
                                    return;
                                }
                            }
                        }
                    }, arguments);

                $asyncBody();
            },
            TargetPlayer: function () {
                var $step = 0,
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0], $step);
                                switch ($step) {
                                    case 0: {
                                        $tcs.setResult(System.Linq.Enumerable.from(this.Game.players).orderBy($asm.$.HandGames.AIPlayer.f2).thenBy($asm.$.HandGames.AIPlayer.f3).toList(HandGames.Player).getItem(0));
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.ns("HandGames.AIPlayer", $asm.$);

    Bridge.apply($asm.$.HandGames.AIPlayer, {
        f1: function (v) {
        return Bridge.cast(v, HandGames.Cards.LoveLetterCard).Value;
    },
        f2: function (v) {
        return v.IsHandmaided;
    },
        f3: function (v) {
        return Bridge.is(v, HandGames.AIPlayer);
    }
    });

    Bridge.define("HandGames.Cards.LoveLetterCard", {
        inherits: [HandGames.Card],
        methods: {
            Play: function () {
                var $step = 0,
                    $task1, 
                    $task2, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    player, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2], $step);
                                switch ($step) {
                                    case 0: {
                                        player = Bridge.cast(this.in, HandGames.Hand).player;
                                        $task1 = HandGames.Card.prototype.Play.call(this);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        $task2 = player.EndTurn();
                                        $step = 2;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $task2.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("HandGames.RealCardPool", {
        inherits: [HandGames.CardPool],
        fields: {
            cards: null
        },
        ctors: {
            init: function () {
                this.cards = new (System.Collections.Generic.List$1(HandGames.Card))();
            },
            ctor: function (game) {
                this.$initialize();
                HandGames.CardPool.ctor.call(this, game);
            }
        },
        methods: {
            Add: function (card) {
                card.in = this;
                this.cards.add(card);
                HandGames.CardPool.prototype.Add.call(this, card);
            },
            Remove: function (card) {
                card.in = null;
                if (!this.cards.remove(card)) {
                    throw new System.Exception(System.String.format("{0} is not in collection.", card));
                }
                HandGames.CardPool.prototype.Remove.call(this, card);
            },
            Contains: function (card) {
                return this.cards.contains(card);
            }
        }
    });

    Bridge.define("HandGames.LocalPlayer", {
        inherits: [HandGames.Player],
        statics: {
            fields: {
                messages: null,
                highlights: null
            },
            ctors: {
                init: function () {
                    this.messages = $asm.$.HandGames.LocalPlayer.f1(new (System.Collections.Generic.Dictionary$2(HandGames.LocalPlayer.AlertScreen,System.String))());
                    this.highlights = $asm.$.HandGames.LocalPlayer.f4(new (System.Collections.Generic.Dictionary$2(HandGames.LocalPlayer.AlertScreen,Function))());
                }
            }
        },
        fields: {
            CurrentAlertScreen: null,
            targetPlayer: null,
            targetCard: null,
            inLock: false,
            cardsToDraw: null
        },
        ctors: {
            ctor: function (Game) {
                this.$initialize();
                HandGames.Player.ctor.call(this, Game);
            }
        },
        methods: {
            OnTurnStart: function () {
                HandGames.Player.prototype.OnTurnStart.call(this);
            },
            TargetPlayer: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    r, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        this.CurrentAlertScreen = HandGames.LocalPlayer.AlertScreen.ChooseAPlayer;
                                        $task1 = ((this.targetPlayer = new System.Threading.Tasks.TaskCompletionSource())).task;
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        r = $taskResult1;
                                        this.targetPlayer = null;
                                        this.CurrentAlertScreen = null;
                                        $tcs.setResult(r);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            TargetCard: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    r, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        this.CurrentAlertScreen = HandGames.LocalPlayer.AlertScreen.NameACard;
                                        this.cardsToDraw = this.Game.cardImages.getRange(1, ((this.Game.cardImages.Count - 1) | 0));
                                        $task1 = ((this.targetCard = new System.Threading.Tasks.TaskCompletionSource())).task;
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        r = $taskResult1;
                                        this.targetCard = null;
                                        this.CurrentAlertScreen = null;
                                        this.cardsToDraw = null;
                                        $tcs.setResult(r);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            Update: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    played, 
                    $t, 
                    card, 
                    mouseState, 
                    state, 
                    $t1, 
                    player, 
                    n, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        for (;;) {
                            $step = System.Array.min([0,1,2,3,4,6,7,8], $step);
                            switch ($step) {
                                case 0: {
                                    if (!Bridge.referenceEquals(this.Game.players.getItem(this.Game.turnIdx), this)) {
                                        return;
                                    }
                                    if (this.CurrentAlertScreen == null) {
                                        $step = 1;
                                        continue;
                                    } else  {
                                        $step = 7;
                                        continue;
                                    }
                                }
                                case 1: {
                                    if (!this.inLock) {
                                        $step = 2;
                                        continue;
                                    } 
                                    $step = 6;
                                    continue;
                                }
                                case 2: {
                                    played = null;
                                    $t = Bridge.getEnumerator(this.Hand.cards);
                                    try {
                                        while ($t.moveNext()) {
                                            card = $t.Current;
                                            mouseState = Microsoft.Xna.Framework.Input.Mouse.GetState();
                                            if (this.Hand.GetDrawingPosition(card).DrawPosition.Contains(mouseState.Position.$clone())) {
                                                if (!this.Game.LastMouseDown) {
                                                    card.Highlighted = true;
                                                } else {
                                                    played = card;
                                                    break;
                                                }
                                            } else {
                                                card.Highlighted = false;
                                            }
                                        }
                                    } finally {
                                        if (Bridge.is($t, System.IDisposable)) {
                                            $t.System$IDisposable$dispose();
                                        }
                                    }if (played != null) {
                                        $step = 3;
                                        continue;
                                    } 
                                    $step = 5;
                                    continue;
                                }
                                case 3: {
                                    this.inLock = true;
                                    $task1 = played.Play();
                                    $step = 4;
                                    $task1.continueWith($asyncBody, true);
                                    return;
                                }
                                case 4: {
                                    $task1.getAwaitedResult();
                                    this.inLock = false;
                                    $step = 5;
                                    continue;
                                }

                                case 6: {
                                    $step = 8;
                                    continue;
                                }
                                case 7: {
                                    state = Microsoft.Xna.Framework.Input.Mouse.GetState();
                                    switch (this.CurrentAlertScreen) {
                                        case HandGames.LocalPlayer.AlertScreen.ChooseAPlayer: 
                                            if (this.Game.LastMouseDown) {
                                                $t1 = Bridge.getEnumerator(this.Game.players);
                                                try {
                                                    while ($t1.moveNext()) {
                                                        player = $t1.Current;
                                                        if (player.IsHandmaided) {
                                                            continue;
                                                        }
                                                        if (this.GetLocationOf(player).Contains$3(state.X, state.Y)) {
                                                            if (player != null && !this.targetPlayer.task.isCompleted()) {
                                                                this.targetPlayer.setResult(player);
                                                            }
                                                            break;
                                                        }
                                                    }
                                                } finally {
                                                    if (Bridge.is($t1, System.IDisposable)) {
                                                        $t1.System$IDisposable$dispose();
                                                    }
                                                }}
                                            break;
                                        case HandGames.LocalPlayer.AlertScreen.NameACard: 
                                            for (n = 0; n < this.Game.cardImages.Count; n = (n + 1) | 0) {
                                                if (this._getCardPosition(n).Contains$3(state.X, state.Y)) {
                                                    if (state.LeftButton === Microsoft.Xna.Framework.Input.ButtonState.Pressed) {
                                                        if (this.Game.cardImages.getItem(n) != null && !this.targetCard.task.isCompleted()) {
                                                            this.targetCard.setResult(this.Game.cardImages.getItem(n));
                                                        }
                                                        break;
                                                    }
                                                }
                                            }
                                            break;
                                        default: 
                                            break;
                                    }
                                    $step = 8;
                                    continue;
                                }
                                case 8: {
                                    return;
                                }
                                default: {
                                    return;
                                }
                            }
                        }
                    }, arguments);

                $asyncBody();
            },
            Draw: function () {
                var $t, $t1, $t2;
                this.Game.spriteBatch.Draw(this.Game.cardback, new Microsoft.Xna.Framework.Rectangle.$ctor2(((((((this.Game.GraphicsDevice.Viewport.Width - 150) | 0) - HandGames.Deck.cardWidth) | 0) - 20) | 0), ((this.Game.GraphicsDevice.Viewport.Height - HandGames.Deck.cardHeight) | 0), HandGames.Deck.cardWidth, HandGames.Deck.cardHeight), Microsoft.Xna.Framework.Color.Wheat.$clone());
                $t = Bridge.getEnumerator(new (System.Collections.Generic.List$1(HandGames.Card))(this.Game.discardPile.cards));
                try {
                    while ($t.moveNext()) {
                        var card = $t.Current;
                        card.Draw();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }this.DrawHands();
                $t1 = Bridge.getEnumerator(HandGames.LocalPlayer.highlights);
                try {
                    while ($t1.moveNext()) {
                        var run = $t1.Current;
                        if (System.Nullable.eq((System.Nullable.bor(run.key, this.CurrentAlertScreen)), 0)) {
                            run.value(this);
                        }
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$dispose();
                    }
                }
                if (this.CurrentAlertScreen != null) {
                    var displayedText = HandGames.LocalPlayer.messages.get(System.Nullable.getValue(this.CurrentAlertScreen));
                    this.Game.spriteBatch.Draw(this.Game.rectangle, this.Game.GraphicsDevice.Viewport.Bounds.$clone(), new Microsoft.Xna.Framework.Color.$ctor2(Microsoft.Xna.Framework.Color.Black.$clone(), 0.9));
                    var textMetrics = this.Game.choiceFont.MeasureString(displayedText);
                    var textLoc = Microsoft.Xna.Framework.Vector2.op_Division$1(Microsoft.Xna.Framework.Vector2.op_UnaryNegation(textMetrics.$clone()), 2);
                    this.Game.spriteBatch.Draw(this.Game.rectangle, new Microsoft.Xna.Framework.Rectangle.$ctor1(Microsoft.Xna.Framework.Point.op_Addition(textLoc.ToPoint(), (Microsoft.Xna.Framework.Vector2.op_Division$1(this.Game.GraphicsDevice.Viewport.Bounds.Size.ToVector2(), 2)).ToPoint()), textMetrics.ToPoint()), Microsoft.Xna.Framework.Color.BlueViolet.$clone());
                    this.Game.spriteBatch.DrawString(this.Game.choiceFont, displayedText, Microsoft.Xna.Framework.Vector2.op_Addition(textLoc.$clone(), Microsoft.Xna.Framework.Vector2.op_Division$1(this.Game.GraphicsDevice.Viewport.Bounds.Size.ToVector2(), 2)), Microsoft.Xna.Framework.Color.Black.$clone());
                }
                $t2 = Bridge.getEnumerator(HandGames.LocalPlayer.highlights);
                try {
                    while ($t2.moveNext()) {
                        var run1 = $t2.Current;
                        if (System.Nullable.neq((System.Nullable.bor(run1.key, this.CurrentAlertScreen)), 0)) {
                            run1.value(this);
                        }
                    }
                } finally {
                    if (Bridge.is($t2, System.IDisposable)) {
                        $t2.System$IDisposable$dispose();
                    }
                }},
            DrawHands: function () {
                var $t;
                for (var n = 0; n < this.Game.players.Count; n = (n + 1) | 0) {
                    var player = this.Game.players.getItem(n);
                    $t = Bridge.getEnumerator(new (System.Collections.Generic.List$1(HandGames.Card))(player.Hand.cards));
                    try {
                        while ($t.moveNext()) {
                            var card = $t.Current;
                            card.Draw();
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }}
            },
            DrawPlayers: function () {
                for (var n = 0; n < this.Game.players.Count; n = (n + 1) | 0) {
                    var player = this.Game.players.getItem(n);
                    var color = ((((255 << (n << 3))) >>> 0) + 4278190080) >>> 0;
                    var r = this.GetLocationOf(player);
                    this.Game.spriteBatch.Draw(this.Game.rectangle, r.$clone(), new Microsoft.Xna.Framework.Color.$ctor10(color));
                    if (player.lost) {
                        this.Game.spriteBatch.Draw(this.Game.rectangle, r.$clone(), new Microsoft.Xna.Framework.Color.$ctor2(Microsoft.Xna.Framework.Color.Black.$clone(), 0.5));
                        this.Game.spriteBatch.Draw(this.Game.rectangle, new Microsoft.Xna.Framework.Rectangle.$ctor1(Microsoft.Xna.Framework.Point.op_Addition(r.Location.$clone(), new Microsoft.Xna.Framework.Point.$ctor1(35)), new Microsoft.Xna.Framework.Point.$ctor1(30)), Microsoft.Xna.Framework.Color.Red.$clone());
                    } else if (player.IsHandmaided) {
                        this.Game.spriteBatch.Draw(this.Game.rectangle, new Microsoft.Xna.Framework.Rectangle.$ctor1(Microsoft.Xna.Framework.Point.op_Addition(r.Location.$clone(), new Microsoft.Xna.Framework.Point.$ctor1(35)), new Microsoft.Xna.Framework.Point.$ctor1(30)), Microsoft.Xna.Framework.Color.Blue.$clone());
                    } else if (!Bridge.referenceEquals(this.Game.players.getItem(this.Game.turnIdx), player)) {
                        this.Game.spriteBatch.Draw(this.Game.rectangle, r.$clone(), new Microsoft.Xna.Framework.Color.$ctor2(Microsoft.Xna.Framework.Color.White.$clone(), 0.25));
                    }
                }
            },
            _getCardPosition: function (index) {
                var cardWidth = HandGames.Hand.cardWidth, cardHeight = HandGames.Hand.cardHeight;
                return new Microsoft.Xna.Framework.Rectangle.$ctor2(((((((Bridge.Int.div(this.Game.GraphicsDevice.Viewport.Width, 2)) | 0) - ((Bridge.Int.div(((this.cardsToDraw.Count * cardWidth) | 0), 2)) | 0)) | 0) + ((index * cardWidth) | 0)) | 0), ((this.Game.GraphicsDevice.Viewport.Height - cardHeight) | 0), cardWidth, cardHeight);
            },
            DrawCards: function () {
                if (System.Nullable.eq(this.CurrentAlertScreen, HandGames.LocalPlayer.AlertScreen.NameACard) || System.Nullable.eq(this.CurrentAlertScreen, HandGames.LocalPlayer.AlertScreen.ViewCards)) {
                    for (var n = 0; n < this.cardsToDraw.Count; n = (n + 1) | 0) {
                        this.Game.spriteBatch.Draw(this.cardsToDraw.getItem(n), this._getCardPosition(n), Microsoft.Xna.Framework.Color.White.$clone());
                    }
                }
            },
            GetLocationOf: function (player) {
                var index = ((((((((Bridge.Int.div(((this.Game.players.indexOf(player) * 4) | 0), this.Game.players.Count)) | 0) + (((Bridge.Int.div(2, this.Game.players.Count)) | 0))) | 0)) + 2) | 0)) % 4;
                var size = new Microsoft.Xna.Framework.Point.$ctor2(100, 100);
                var position = new Microsoft.Xna.Framework.Point.$ctor2((((((this.Game.GraphicsDevice.Viewport.Width - size.X) | 0)) * (index % 2)) | 0), (((((this.Game.GraphicsDevice.Viewport.Height - size.Y) | 0)) * (((Bridge.Int.div(index, 2)) | 0))) | 0));
                return new Microsoft.Xna.Framework.Rectangle.$ctor1(position.$clone(), size.$clone());
            },
            LookAtCards: function (cardPool) {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        this.cardsToDraw = cardPool.cards.convertAll(Microsoft.Xna.Framework.Graphics.Texture2D, $asm.$.HandGames.LocalPlayer.f5);
                                        this.CurrentAlertScreen = HandGames.LocalPlayer.AlertScreen.ViewCards;
                                        $task1 = System.Threading.Tasks.Task.delay(2000);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        this.CurrentAlertScreen = null;
                                        this.cardsToDraw = null;
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.ns("HandGames.LocalPlayer", $asm.$);

    Bridge.apply($asm.$.HandGames.LocalPlayer, {
        f1: function (_o1) {
            _o1.add(HandGames.LocalPlayer.AlertScreen.NameACard, "Choose a card");
            _o1.add(HandGames.LocalPlayer.AlertScreen.ChooseAPlayer, "Choose a player");
            _o1.add(HandGames.LocalPlayer.AlertScreen.ViewCards, "You have 2 seconds to look at these cards.");
            return _o1;
        },
        f2: function ($this) {
            $this.DrawPlayers();
        },
        f3: function ($this) {
            $this.DrawCards();
        },
        f4: function (_o2) {
            _o2.add(HandGames.LocalPlayer.AlertScreen.ChooseAPlayer, $asm.$.HandGames.LocalPlayer.f2);
            _o2.add(HandGames.LocalPlayer.AlertScreen.NameACard, $asm.$.HandGames.LocalPlayer.f3);
            return _o2;
        },
        f5: function (v) {
        return v.image;
    }
    });

    /**
     * A game of love letter.
     *
     * @public
     * @class HandGames.LoveLetterGame
     * @augments HandGames.HandGame
     */
    Bridge.define("HandGames.LoveLetterGame", {
        inherits: [HandGames.HandGame],
        props: {
            ContentFolderName: {
                get: function () {
                    return "Love Letter";
                }
            },
            cards: {
                get: function () {
                    return $asm.$.HandGames.LoveLetterGame.f1(new (System.Collections.Generic._Dictionary$2(System.String,System.Int32)).ctor());
                }
            }
        }
    });

    Bridge.ns("HandGames.LoveLetterGame", $asm.$);

    Bridge.apply($asm.$.HandGames.LoveLetterGame, {
        f1: function (_o3) {
            _o3.add("Guard", 5);
            _o3.add("Priest", 2);
            _o3.add("Baron", 2);
            _o3.add("Handmaid", 2);
            _o3.add("Prince", 2);
            _o3.add("King", 1);
            _o3.add("Countess", 1);
            _o3.add("Princess", 1);
            return _o3;
        }
    });

    Bridge.define("HandGames.Cards.BaronCard", {
        inherits: [HandGames.Cards.LoveLetterCard],
        props: {
            Value: {
                get: function () {
                    return 3;
                }
            }
        },
        methods: {
            OnPlay: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $task2, 
                    $task3, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    me, 
                    other, 
                    aCompare, 
                    bCompare, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3], $step);
                                switch ($step) {
                                    case 0: {
                                        me = Bridge.cast(this.in, HandGames.Hand).player;
                                        $task1 = Bridge.cast(this.in, HandGames.Hand).player.TargetPlayer();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        other = $taskResult1; //Workaround for #2931
                                        $task2 = me.LookAtCards(other.Hand);
                                        $step = 2;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $task2.getAwaitedResult();
                                        $task3 = other.LookAtCards(me.Hand);
                                        $step = 3;
                                        $task3.continueWith($asyncBody);
                                        return;
                                    }
                                    case 3: {
                                        $task3.getAwaitedResult();
                                        aCompare = Bridge.cast((System.Linq.Enumerable.from(other.Hand.cards).first(Bridge.fn.bind(this, $asm.$.HandGames.Cards.BaronCard.f1))), HandGames.Cards.LoveLetterCard).Value;
                                        bCompare = Bridge.cast((System.Linq.Enumerable.from(me.Hand.cards).first(Bridge.fn.bind(this, $asm.$.HandGames.Cards.BaronCard.f1))), HandGames.Cards.LoveLetterCard).Value; //Workaround for #2918.
                                        switch (Bridge.compare(aCompare, bCompare)) {
                                            case -1:  // Good for me
                                                other.Lose();
                                                break;
                                            case 1:  // Bad for me
                                                me.Lose();
                                                break;
                                        }
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.ns("HandGames.Cards.BaronCard", $asm.$);

    Bridge.apply($asm.$.HandGames.Cards.BaronCard, {
        f1: function (v) {
        return !Bridge.referenceEquals(v, this);
    }
    });

    Bridge.define("HandGames.Cards.CountessCard", {
        inherits: [HandGames.Cards.LoveLetterCard],
        props: {
            Value: {
                get: function () {
                    return 7;
                }
            }
        },
        methods: {
            OnPlay: function () {
                var $step = 0,
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0], $step);
                                switch ($step) {
                                    case 0: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("HandGames.Cards.GuardCard", {
        inherits: [HandGames.Cards.LoveLetterCard],
        props: {
            Value: {
                get: function () {
                    return 1;
                }
            }
        },
        methods: {
            OnPlay: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $task2, 
                    $taskResult2, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    player, 
                    targettedCard, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = Bridge.cast(this.in, HandGames.Hand).player.TargetPlayer();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        player = $taskResult1;
                                        $task2 = Bridge.cast(this.in, HandGames.Hand).player.TargetCard();
                                        $step = 2;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        targettedCard = $taskResult2; //Workaround for #2918.
                                        if (Bridge.referenceEquals(player.Hand.cards.getItem(0).image, targettedCard)) {
                                            player.Lose();
                                        }
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("HandGames.Cards.HandmaidCard", {
        inherits: [HandGames.Cards.LoveLetterCard],
        props: {
            Value: {
                get: function () {
                    return 4;
                }
            }
        },
        methods: {
            OnPlay: function () {
                var $step = 0,
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0], $step);
                                switch ($step) {
                                    case 0: {
                                        Bridge.cast(this.in, HandGames.Hand).player.IsHandmaided = true;
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("HandGames.Cards.KingCard", {
        inherits: [HandGames.Cards.LoveLetterCard],
        props: {
            Value: {
                get: function () {
                    return 6;
                }
            }
        },
        methods: {
            OnPlay: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $task2, 
                    $task3, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    me, 
                    other, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3], $step);
                                switch ($step) {
                                    case 0: {
                                        me = Bridge.cast(this.in, HandGames.Hand).player;
                                        $task1 = me.TargetPlayer();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        other = $taskResult1;
                                        $task2 = me.Hand.cards.getItem(0).MoveCardTo(other.Hand);
                                        $step = 2;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $task2.getAwaitedResult();
                                        $task3 = other.Hand.cards.getItem(0).MoveCardTo(me.Hand);
                                        $step = 3;
                                        $task3.continueWith($asyncBody);
                                        return;
                                    }
                                    case 3: {
                                        $task3.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("HandGames.Cards.PriestCard", {
        inherits: [HandGames.Cards.LoveLetterCard],
        props: {
            Value: {
                get: function () {
                    return 2;
                }
            }
        },
        methods: {
            OnPlay: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $task2, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = Bridge.cast(this.in, HandGames.Hand).player.TargetPlayer();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        $task2 = Bridge.cast(this.in, HandGames.Hand).player.LookAtCards(($taskResult1).Hand);
                                        $step = 2;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $task2.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("HandGames.Cards.PrinceCard", {
        inherits: [HandGames.Cards.LoveLetterCard],
        props: {
            Value: {
                get: function () {
                    return 5;
                }
            }
        },
        methods: {
            OnPlay: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $task2, 
                    $task3, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $in, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = Bridge.cast(this.in, HandGames.Hand).player.TargetPlayer();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        $in = ($taskResult1).Hand;
                                        $task2 = System.Linq.Enumerable.from($in.cards).first(Bridge.fn.bind(this, $asm.$.HandGames.Cards.PrinceCard.f1)).MoveCardTo($in.Game.discardPile);
                                        $step = 2;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $task2.getAwaitedResult();
                                        $task3 = $in.Game.TopCard().MoveCardTo($in);
                                        $step = 3;
                                        $task3.continueWith($asyncBody);
                                        return;
                                    }
                                    case 3: {
                                        $task3.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.ns("HandGames.Cards.PrinceCard", $asm.$);

    Bridge.apply($asm.$.HandGames.Cards.PrinceCard, {
        f1: function (v) {
        return !Bridge.referenceEquals(v, this);
    }
    });

    Bridge.define("HandGames.Cards.PrincessCard", {
        inherits: [HandGames.Cards.LoveLetterCard],
        props: {
            Value: {
                get: function () {
                    return 8;
                }
            }
        },
        methods: {
            OnDiscard: function () {
                var $step = 0,
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0], $step);
                                switch ($step) {
                                    case 0: {
                                        Bridge.cast(this.in, HandGames.Hand).player.Lose();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            OnPlay: function () {
                var $step = 0,
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0], $step);
                                switch ($step) {
                                    case 0: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("HandGames.Deck", {
        inherits: [HandGames.RealCardPool],
        statics: {
            fields: {
                cardWidth: 0,
                cardHeight: 0
            },
            ctors: {
                init: function () {
                    this.cardWidth = 150;
                    this.cardHeight = 209;
                }
            }
        },
        ctors: {
            ctor: function (game) {
                this.$initialize();
                HandGames.RealCardPool.ctor.call(this, game);
            }
        },
        methods: {
            GetDrawingPosition: function (card) {
                var $t;
                return ($t = new HandGames.DrawInfo(), $t.DrawPosition = new Microsoft.Xna.Framework.Rectangle.$ctor2(((((((this.Game.GraphicsDevice.Viewport.Width - 150) | 0) - HandGames.Deck.cardWidth) | 0) - 20) | 0), ((this.Game.GraphicsDevice.Viewport.Height - HandGames.Deck.cardHeight) | 0), HandGames.Deck.cardWidth, HandGames.Deck.cardHeight), $t.Permissions = HandGames.DrawInfo.DrawPermission.Animatable, $t);
            }
        }
    });

    Bridge.define("HandGames.DiscardPile", {
        inherits: [HandGames.RealCardPool],
        statics: {
            fields: {
                cardWidth: 0,
                cardHeight: 0
            },
            ctors: {
                init: function () {
                    this.cardWidth = 75;
                    this.cardHeight = 104;
                }
            }
        },
        ctors: {
            ctor: function (game) {
                this.$initialize();
                HandGames.RealCardPool.ctor.call(this, game);
            }
        },
        methods: {
            GetDrawingPosition: function (card) {
                var $t;
                return ($t = new HandGames.DrawInfo(), $t.DrawPosition = new Microsoft.Xna.Framework.Rectangle.$ctor2(((((((this.Game.GraphicsDevice.Viewport.Width - 100) | 0) - HandGames.DiscardPile.cardWidth) | 0) - 10) | 0), ((Bridge.Int.div((((this.Game.GraphicsDevice.Viewport.Height - HandGames.DiscardPile.cardHeight) | 0)), 2)) | 0), HandGames.DiscardPile.cardWidth, HandGames.DiscardPile.cardHeight), $t.Permissions = Bridge.referenceEquals(this.cards.getItem(((this.cards.Count - 1) | 0)), card) ? HandGames.DrawInfo.DrawPermission.Drawable : HandGames.DrawInfo.DrawPermission.Animatable, $t);
            }
        }
    });

    Bridge.define("HandGames.Hand", {
        inherits: [HandGames.RealCardPool],
        statics: {
            fields: {
                cardWidth: 0,
                cardHeight: 0
            },
            ctors: {
                init: function () {
                    this.cardWidth = 150;
                    this.cardHeight = 209;
                }
            }
        },
        fields: {
            player: null
        },
        ctors: {
            ctor: function (game, player) {
                this.$initialize();
                HandGames.RealCardPool.ctor.call(this, game);
                this.player = player;
            }
        },
        methods: {
            GetDrawingPosition: function (card) {
                var $t;
                return ($t = new HandGames.DrawInfo(), $t.DrawPosition = new Microsoft.Xna.Framework.Rectangle.$ctor2(((((((Bridge.Int.div(this.Game.GraphicsDevice.Viewport.Width, 2)) | 0) - ((Bridge.Int.div(((this.cards.Count * HandGames.Hand.cardWidth) | 0), 2)) | 0)) | 0) + ((this.cards.indexOf(card) * HandGames.Hand.cardWidth) | 0)) | 0), (((((this.Game.GraphicsDevice.Viewport.Height - HandGames.Hand.cardHeight) | 0)) * (((Bridge.Int.div((((((((((Bridge.Int.div(((this.Game.players.indexOf(this.player) * 4) | 0), this.Game.players.Count)) | 0) + (((Bridge.Int.div(2, this.Game.players.Count)) | 0))) | 0)) + 2) | 0)) % 4), 2)) | 0))) | 0), HandGames.Hand.cardWidth, HandGames.Hand.cardHeight), $t.Permissions = HandGames.DrawInfo.DrawPermission.Drawable, $t.ShowCardBack = !Bridge.referenceEquals(this.Game.ui, this.player), $t);
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJIYW5kR2FtZXMuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIlBsYXllci5jcyIsIkNhcmQuY3MiLCJDYXJkUG9vbC5jcyIsIkhhbmRHYW1lLmNzIiwiUG9pbnRlci5jcyIsIlByb2dyYW0uY3MiLCJOZXcgQnJpZGdlIFN0dWZmL0hhc2hIZWxwZXJzLmNzIiwiQUlQbGF5ZXIuY3MiLCJDYXJkcy9Mb3ZlTGV0dGVyQ2FyZC5jcyIsIlJlYWxDYXJkUG9vbC5jcyIsIkxvY2FsUGxheWVyLmNzIiwiTG92ZUxldHRlckdhbWUuY3MiLCJDYXJkcy9CYXJvbkNhcmQuY3MiLCJDYXJkcy9Db3VudGVzc0NhcmQuY3MiLCJDYXJkcy9HdWFyZENhcmQuY3MiLCJDYXJkcy9IYW5kbWFpZENhcmQuY3MiLCJDYXJkcy9LaW5nQ2FyZC5jcyIsIkNhcmRzL1ByaWVzdENhcmQuY3MiLCJDYXJkcy9QcmluY2VDYXJkLmNzIiwiQ2FyZHMvUHJpbmNlc3NDYXJkLmNzIiwiRGVjay5jcyIsIkRpc2NhcmRQaWxlLmNzIiwiSGFuZC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs0QkE2Q3VCQTs7Z0JBRVhBLFlBQU9BLElBQUlBLGVBQUtBLGFBQVlBLE9BQU1BOzs7OztnQkE3QmxDQSxxQkFBcUJBLDRCQUF1REEseUJBQWFBLEFBQXNEQTtnQkFDL0lBLElBQUlBO29CQUNBQSxnQkFBV0E7O2dCQUNmQTs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FRQUEsSUFBSUEsNEJBQXVEQSx5QkFBYUEsQUFBc0RBOzRDQUUxSEEsZ0JBQVdBLDRCQUF1REEseUJBQWFBLEFBQXNEQTs0Q0FDcklBOzs7d0NBRUpBOzRDQUVJQSxTQUFTQSwwQkFBYUEsTUFBZUEsQ0FBQ0EsaUNBQW9CQSx5QkFBcENBO2lEQUNqQkE7d0NBQ1RBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQWNBQTtvQ0FDQUEsSUFBSUE7Ozs7Ozs7O29D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QSw2Q0FBbUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNOOUVBLE1BQWVBOzt1REFBc0JBO2dCQUU3Q0EsY0FBY0E7Ozs7MENBRzBCQTs7Z0JBQVlBLE9BQU9BLFVBQUlBLHdDQUU1Q0EsSUFBSUEseUNBQ2ZBLHlFQUF5Q0Esc0NBQWNBLGlEQUFnQkEscUJBQWNBLFFBQVFBLHNDQUM3RkEsR0FBQ0EsNkNBQXNDQSxtQ0FBY0EsQ0FBQ0Esa0JBQUNBLENBQUNBLEdBQUNBLCtDQUFxQkEsd0JBQWNBLGlDQUFxQkEsQ0FBQ0Esb0JBQUlBLHlFQUN0SEEsMEJBQ0FBLDZDQUNVQSw4REFDQ0Esc0NBQVdBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBQbGF5ZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgSGFuZCBIYW5kO1xyXG4gICAgICAgIHB1YmxpYyBIYW5kR2FtZSBHYW1lO1xyXG4gICAgICAgIHB1YmxpYyBib29sIGxvc3Q7XHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNIYW5kbWFpZGVkO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBMb3NlICgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm90TG9zdFBsYXllcnMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllcj4oR2FtZS5wbGF5ZXJzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllciwgYm9vbD4pKHYgPT4gIXYubG9zdCkpO1xyXG4gICAgICAgICAgICBpZiAobm90TG9zdFBsYXllcnMuQ291bnQoKSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgR2FtZS53b24gPSBub3RMb3N0UGxheWVycy5GaXJzdCgpO1xyXG4gICAgICAgICAgICBsb3N0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSBDUzE5OTggLy8gQXN5bmMgbWV0aG9kIGxhY2tzICdhd2FpdCcgb3BlcmF0b3JzIGFuZCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgRW5kVHVybigpXHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIENTMTk5OCAvLyBBc3luYyBtZXRob2QgbGFja3MgJ2F3YWl0JyBvcGVyYXRvcnMgYW5kIHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllciBwbGF5ZXI7XHJcbiAgICAgICAgICAgIGlmIChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkNvdW50PGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllcj4oR2FtZS5wbGF5ZXJzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllciwgYm9vbD4pKHYgPT4gdi5sb3N0KSkgPT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZS53b24gPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllcj4oR2FtZS5wbGF5ZXJzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllciwgYm9vbD4pKHYgPT4gIXYubG9zdCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllciA9IEdhbWUucGxheWVyc1tHYW1lLnR1cm5JZHggPSAoR2FtZS50dXJuSWR4ICsgMSkgJSBHYW1lLnBsYXllcnMuQ291bnRdO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChwbGF5ZXIubG9zdCk7XHJcbiAgICAgICAgICAgIHBsYXllci5PblR1cm5TdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFRhc2s8VGV4dHVyZTJEPiBUYXJnZXRDYXJkKCk7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFRhc2s8UGxheWVyPiBUYXJnZXRQbGF5ZXIoKTtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgVGFzayBMb29rQXRDYXJkcyhSZWFsQ2FyZFBvb2wgY2FyZFBvb2wpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBQbGF5ZXIgKEhhbmRHYW1lIEdhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIYW5kID0gbmV3IEhhbmQodGhpcy5HYW1lID0gR2FtZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBhc3luYyB2b2lkIE9uVHVyblN0YXJ0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIElzSGFuZG1haWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoR2FtZSBpcyBMb3ZlTGV0dGVyR2FtZSlcclxuICAgICAgICAgICAgICAgIGF3YWl0IEdhbWUuVG9wQ2FyZCgpLk1vdmVDYXJkVG8oSGFuZCk7XHJcbiAgICAgICAgICAgIHZhciBjb3VudGVzcyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8Z2xvYmFsOjpIYW5kR2FtZXMuQ2FyZD4oSGFuZC5jYXJkcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkhhbmRHYW1lcy5DYXJkLCBib29sPikodiA9PiB2IGlzIENhcmRzLkNvdW50ZXNzQ2FyZCkpO1xyXG4gICAgICAgICAgICBpZiAoY291bnRlc3MgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtpbmdPclByaW5jZSA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8Z2xvYmFsOjpIYW5kR2FtZXMuQ2FyZD4oSGFuZC5jYXJkcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkhhbmRHYW1lcy5DYXJkLCBib29sPikodiA9PiB2IGlzIENhcmRzLktpbmdDYXJkIHx8IHYgaXMgQ2FyZHMuUHJpbmNlQ2FyZCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGtpbmdPclByaW5jZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGNvdW50ZXNzLlBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIENhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQ2FyZFBvb2wgQGluO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlMkQgaW1hZ2U7XHJcbiAgICAgICAgcHVibGljIGJvb2wgSGlnaGxpZ2h0ZWQ7XHJcbiAgICAgICAgcHVibGljIFJlY3RhbmdsZT8gb2xkTG9jO1xyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgVGFzayBPblBsYXkoKTtcclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBhc3luYyBUYXNrIE9uRGlzY2FyZCAoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3ICgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoKERhdGVUaW1lLk5vdyAtIG9yZ0RhdGUpID4gZ2xpZGVUaW1lKVxyXG4gICAgICAgICAgICAgICAgaWYgKCFhbmltYXRpb25Eb25lLlRhc2suSXNDb21wbGV0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRG9uZS5TZXRSZXN1bHQobnVsbCk7XHJcbiAgICAgICAgICAgIERyYXdJbmZvIGRyYXdJbmZvID0gQGluLkdldERyYXdpbmdQb3NpdGlvbih0aGlzKTtcclxuICAgICAgICAgICAgUmVjdGFuZ2xlPyBuZXdMb2MgPSBkcmF3SW5mby5EcmF3UG9zaXRpb247XHJcbiAgICAgICAgICAgIGlmIChuZXdMb2MgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgUmVjdGFuZ2xlIHJlY3QgPSAoUmVjdGFuZ2xlKW5ld0xvYztcclxuICAgICAgICAgICAgaWYgKG9sZExvYyAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSZWN0YW5nbGUgb2xkTG9jUmVhbCA9IChSZWN0YW5nbGUpb2xkTG9jO1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgZ2xpZGVOID0gKChmbG9hdCkoRGF0ZVRpbWUuTm93IC0gKERhdGVUaW1lKW9yZ0RhdGUpLlRpY2tzIC8gZ2xpZGVUaW1lLlRpY2tzKTtcclxuICAgICAgICAgICAgICAgIHJlY3QgPSBuZXcgUmVjdGFuZ2xlKFxyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjIuTGVycChvbGRMb2NSZWFsLkxvY2F0aW9uLlRvVmVjdG9yMigpLCByZWN0LkxvY2F0aW9uLlRvVmVjdG9yMigpLCBnbGlkZU4pLlRvUG9pbnQoKSxcclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3IyLkxlcnAob2xkTG9jUmVhbC5TaXplLlRvVmVjdG9yMigpLCByZWN0LlNpemUuVG9WZWN0b3IyKCksIGdsaWRlTikuVG9Qb2ludCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoSGlnaGxpZ2h0ZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJlY3RhbmdsZSBoaWdobGlnaHRSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKHJlY3QuWCAtIDEsIHJlY3QuWSAtIDEsIHJlY3QuV2lkdGggKyAxLCByZWN0LkhlaWdodCArIDEpO1xyXG4gICAgICAgICAgICAgICAgQGluLkdhbWUuc3ByaXRlQmF0Y2guRHJhdyhAaW4uR2FtZS5yZWN0YW5nbGUsIG5ldyBSZWN0YW5nbGUoaGlnaGxpZ2h0UmVjdGFuZ2xlLkxvY2F0aW9uLCBuZXcgUG9pbnQoMSwgcmVjdC5IZWlnaHQpKSwgQ29sb3IuWWVsbG93KTtcclxuICAgICAgICAgICAgICAgIEBpbi5HYW1lLnNwcml0ZUJhdGNoLkRyYXcoQGluLkdhbWUucmVjdGFuZ2xlLCBuZXcgUmVjdGFuZ2xlKG5ldyBQb2ludChoaWdobGlnaHRSZWN0YW5nbGUuUmlnaHQsIGhpZ2hsaWdodFJlY3RhbmdsZS5ZKSwgbmV3IFBvaW50KDEsIHJlY3QuSGVpZ2h0KSksIENvbG9yLlllbGxvdyk7XHJcbiAgICAgICAgICAgICAgICBAaW4uR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEBpbi5HYW1lLnJlY3RhbmdsZSwgbmV3IFJlY3RhbmdsZShyZWN0LlgsIGhpZ2hsaWdodFJlY3RhbmdsZS5ZLCByZWN0LldpZHRoLCAxKSwgQ29sb3IuWWVsbG93KTtcclxuICAgICAgICAgICAgICAgIEBpbi5HYW1lLnNwcml0ZUJhdGNoLkRyYXcoQGluLkdhbWUucmVjdGFuZ2xlLCBuZXcgUmVjdGFuZ2xlKHJlY3QuWCwgaGlnaGxpZ2h0UmVjdGFuZ2xlLkJvdHRvbSwgcmVjdC5XaWR0aCwgMSksIENvbG9yLlllbGxvdyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQGluLkdhbWUuc3ByaXRlQmF0Y2guRHJhdyhkcmF3SW5mby5TaG93Q2FyZEJhY2sgPyBAaW4uR2FtZS5jYXJkYmFjayA6IGltYWdlLCByZWN0LCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBUaW1lU3BhbiBnbGlkZVRpbWUgPSBUaW1lU3Bhbi5Gcm9tU2Vjb25kcyguNjUpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBhc3luYyBUYXNrIFBsYXkgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF3YWl0IE9uUGxheSgpO1xyXG4gICAgICAgICAgICBhd2FpdCBNb3ZlQ2FyZFRvKEBpbi5HYW1lLmRpc2NhcmRQaWxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIE1vdmVDYXJkVG8gKENhcmRQb29sIHRvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKEBpbiBpcyBIYW5kICYmIHRvIGlzIERpc2NhcmRQaWxlKVxyXG4gICAgICAgICAgICAgICAgYXdhaXQgT25EaXNjYXJkKCk7XHJcbiAgICAgICAgICAgIEhpZ2hsaWdodGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBvbGRQb3MgPSBAaW4uR2V0RHJhd2luZ1Bvc2l0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICBAaW4uUmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgICAgICB0by5BZGQodGhpcyk7XHJcbiAgICAgICAgICAgIGlmICghKG9sZFBvcy5QZXJtaXNzaW9ucyA9PSBEcmF3SW5mby5EcmF3UGVybWlzc2lvbi5VbmRyYXdhYmxlIHx8IHRvLkdldERyYXdpbmdQb3NpdGlvbih0aGlzKS5QZXJtaXNzaW9ucyA9PSBEcmF3SW5mby5EcmF3UGVybWlzc2lvbi5VbmRyYXdhYmxlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2xkTG9jID0gb2xkUG9zLkRyYXdQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIG9yZ0RhdGUgPSBEYXRlVGltZS5Ob3c7XHJcbiAgICAgICAgICAgICAgICBmcm9tID0gQGluO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRG9uZSA9IG5ldyBUYXNrQ29tcGxldGlvblNvdXJjZTxvYmplY3Q+KCk7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBhbmltYXRpb25Eb25lLlRhc2s7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25Eb25lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIG9yZ0RhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZnJvbSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBvbGRMb2MgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYXNrQ29tcGxldGlvblNvdXJjZTxvYmplY3Q+IGFuaW1hdGlvbkRvbmU7XHJcbiAgICAgICAgRGF0ZVRpbWU/IG9yZ0RhdGU7XHJcbiAgICAgICAgQ2FyZFBvb2wgZnJvbTtcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lc1xyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgQ2FyZFBvb2xcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQ2FyZFBvb2wgKEhhbmRHYW1lIGdhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lID0gZ2FtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBBZGQoQ2FyZCBjYXJkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FyZC5AaW4gPSB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIFJlbW92ZShDYXJkIGNhcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY2FyZC5AaW4gPT0gdGhpcylcclxuICAgICAgICAgICAgICAgIGNhcmQuQGluID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IGJvb2wgQ29udGFpbnMoQ2FyZCBjYXJkKTtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgRHJhd0luZm8gR2V0RHJhd2luZ1Bvc2l0aW9uKENhcmQgY2FyZCk7XHJcbiAgICAgICAgcHVibGljIEhhbmRHYW1lIEdhbWU7XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlJlZmxlY3Rpb247XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBUaGlzIGlzIHRoZSBtYWluIHR5cGUgZm9yIHlvdXIgZ2FtZS5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgSGFuZEdhbWUgOiBHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyIGdyYXBoaWNzO1xyXG4gICAgICAgIHB1YmxpYyBTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaDtcclxuICAgICAgICBwdWJsaWMgTGlzdDxQbGF5ZXI+IHBsYXllcnMgPSBuZXcgTGlzdDxQbGF5ZXI+KCk7XHJcbiAgICAgICAgcHVibGljIFBsYXllciB3b247XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IHN0cmluZyBDb250ZW50Rm9sZGVyTmFtZSB7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdFxyXG4jaWYgIVdJTkRPV1NcclxuICAgICAgICAgICAgX0RpY3Rpb25hcnlcclxuI2Vsc2VcclxuICAgICAgICAgICAgRGljdGlvbmFyeVxyXG4jZW5kaWZcclxuICAgICAgICAgICAgPHN0cmluZywgaW50PiBjYXJkcyB7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBMaXN0PFRleHR1cmUyRD4gY2FyZEltYWdlcztcclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgSGFuZEdhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MgPSBuZXcgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyKHRoaXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElzRnVsbFNjcmVlbiA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICBQcmVmZXJyZWRCYWNrQnVmZmVyV2lkdGggPSAxMzY2LFxyXG4gICAgICAgICAgICAgICAgUHJlZmVycmVkQmFja0J1ZmZlckhlaWdodCA9IDc2OFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBDb250ZW50LlJvb3REaXJlY3RvcnkgPSBcIkNvbnRlbnRcIjtcclxuICAgICAgICAgICAgSXNNb3VzZVZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBbGxvd3MgdGhlIGdhbWUgdG8gcGVyZm9ybSBhbnkgaW5pdGlhbGl6YXRpb24gaXQgbmVlZHMgdG8gYmVmb3JlIHN0YXJ0aW5nIHRvIHJ1bi5cclxuICAgICAgICAvLy8gVGhpcyBpcyB3aGVyZSBpdCBjYW4gcXVlcnkgZm9yIGFueSByZXF1aXJlZCBzZXJ2aWNlcyBhbmQgbG9hZCBhbnkgbm9uLWdyYXBoaWNcclxuICAgICAgICAvLy8gcmVsYXRlZCBjb250ZW50LiAgQ2FsbGluZyBiYXNlLkluaXRpYWxpemUgd2lsbCBlbnVtZXJhdGUgdGhyb3VnaCBhbnkgY29tcG9uZW50c1xyXG4gICAgICAgIC8vLyBhbmQgaW5pdGlhbGl6ZSB0aGVtIGFzIHdlbGwuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0aWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IEFkZCB5b3VyIGluaXRpYWxpemF0aW9uIGxvZ2ljIGhlcmVcclxuXHJcbiAgICAgICAgICAgIGJhc2UuSW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRCBjYXJkYmFjaztcclxuICAgICAgICBwdWJsaWMgRGlzY2FyZFBpbGUgZGlzY2FyZFBpbGU7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTG9hZENvbnRlbnQgd2lsbCBiZSBjYWxsZWQgb25jZSBwZXIgZ2FtZSBhbmQgaXMgdGhlIHBsYWNlIHRvIGxvYWRcclxuICAgICAgICAvLy8gYWxsIG9mIHlvdXIgY29udGVudC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIExvYWRDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBTcHJpdGVCYXRjaCwgd2hpY2ggY2FuIGJlIHVzZWQgdG8gZHJhdyB0ZXh0dXJlcy5cclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2ggPSBuZXcgU3ByaXRlQmF0Y2goR3JhcGhpY3NEZXZpY2UpO1xyXG4gICAgICAgICAgICBjYXJkSW1hZ2VzID0gbmV3IExpc3Q8VGV4dHVyZTJEPigpO1xyXG4gICAgICAgICAgICBkZWNrID0gbmV3IERlY2sodGhpcyk7XHJcbiAgICAgICAgICAgIGRpc2NhcmRQaWxlID0gbmV3IERpc2NhcmRQaWxlKHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiB1c2UgdGhpcy5Db250ZW50IHRvIGxvYWQgeW91ciBnYW1lIGNvbnRlbnQgaGVyZVxyXG4gICAgICAgICAgICBmb250ID0gQ29udGVudC5Mb2FkPFNwcml0ZUZvbnQ+KFwiQXJpYWxcIik7XHJcbiAgICAgICAgICAgIGNob2ljZUZvbnQgPSBDb250ZW50LkxvYWQ8U3ByaXRlRm9udD4oXCJDaG9pY2UgVGV4dFwiKTtcclxuICAgICAgICAgICAgcmVjdGFuZ2xlID0gQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgY2FyZGJhY2sgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihzdHJpbmcuRm9ybWF0KFwiezB9L2NhcmRiYWNrXCIsQ29udGVudEZvbGRlck5hbWUpKTtcclxuICAgICAgICAgICAgcGxheWVycy5BZGQodWkgPSBuZXcgTG9jYWxQbGF5ZXIodGhpcykpO1xyXG4gICAgICAgICAgICBwbGF5ZXJzLkFkZChuZXcgQUlQbGF5ZXIodGhpcykpO1xyXG4gICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgbiA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgY2FyZEtleVBhaXIgaW4gY2FyZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGltYWdlID0gQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oc3RyaW5nLkZvcm1hdChcInswfS97MX17Mn1cIixDb250ZW50Rm9sZGVyTmFtZSxuICsgMSxjYXJkS2V5UGFpci5LZXkpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXJkSW1hZ2VzLkFkZChpbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaWR4ID0gMDsgaWR4IDwgY2FyZEtleVBhaXIuVmFsdWU7IGlkeCsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2FyZCBjYXJkID0gKENhcmQpQXNzZW1ibHkuR2V0RXhlY3V0aW5nQXNzZW1ibHkoKS5HZXRUeXBlKHN0cmluZy5Gb3JtYXQoXCJIYW5kR2FtZXMuQ2FyZHMuezB9Q2FyZFwiLGNhcmRLZXlQYWlyLktleSkpLkdldENvbnN0cnVjdG9yKG5ldyBUeXBlW10geyB9KS5JbnZva2UobmV3IG9iamVjdFswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQuaW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVjay5BZGQoY2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG4rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSAoZmFsc2UpO1xyXG4gICAgICAgICAgICBTaHVmZmxlRGVjaygpO1xyXG4gICAgICAgICAgICBwbGF5ZXJzLkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkhhbmRHYW1lcy5QbGF5ZXI+KShwbGF5ZXIgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCAxOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvcENhcmQgPSBUb3BDYXJkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVjay5SZW1vdmUodG9wQ2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLkhhbmQuQWRkKHRvcENhcmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHBsYXllcnNbdHVybklkeF0uT25UdXJuU3RhcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBDYXJkIFRvcENhcmQoKSB7cmV0dXJuIGRlY2suY2FyZHNbMF07fVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IHR1cm5JZHg7XHJcbiAgICAgICAgUmFuZG9tIHJuZCA9IG5ldyBSYW5kb20oKTtcclxuICAgICAgICBcclxuICAgICAgICB2b2lkIFNodWZmbGVEZWNrICgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgaW50IG4gPSBkZWNrLmNhcmRzLkNvdW50O1xyXG4gICAgICAgICAgICB3aGlsZSAobiA+IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG4tLTtcclxuICAgICAgICAgICAgICAgIGludCBrID0gcm5kLk5leHQobiArIDEpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZGVjay5jYXJkc1trXTtcclxuICAgICAgICAgICAgICAgIGRlY2suY2FyZHNba10gPSBkZWNrLmNhcmRzW25dO1xyXG4gICAgICAgICAgICAgICAgZGVjay5jYXJkc1tuXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEIHJlY3RhbmdsZTtcclxuICAgICAgICBwdWJsaWMgRGVjayBkZWNrO1xyXG4gICAgICAgIHB1YmxpYyBMb2NhbFBsYXllciB1aTtcclxuICAgICAgICBwdWJsaWMgU3ByaXRlRm9udCBmb250LCBjaG9pY2VGb250O1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFVubG9hZENvbnRlbnQgd2lsbCBiZSBjYWxsZWQgb25jZSBwZXIgZ2FtZSBhbmQgaXMgdGhlIHBsYWNlIHRvIHVubG9hZFxyXG4gICAgICAgIC8vLyBnYW1lLXNwZWNpZmljIGNvbnRlbnQuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBVbmxvYWRDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IFVubG9hZCBhbnkgbm9uIENvbnRlbnRNYW5hZ2VyIGNvbnRlbnQgaGVyZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBbGxvd3MgdGhlIGdhbWUgdG8gcnVuIGxvZ2ljIHN1Y2ggYXMgdXBkYXRpbmcgdGhlIHdvcmxkLFxyXG4gICAgICAgIC8vLyBjaGVja2luZyBmb3IgY29sbGlzaW9ucywgZ2F0aGVyaW5nIGlucHV0LCBhbmQgcGxheWluZyBhdWRpby5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImdhbWVUaW1lXCI+UHJvdmlkZXMgYSBzbmFwc2hvdCBvZiB0aW1pbmcgdmFsdWVzLjwvcGFyYW0+XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgVXBkYXRlKEdhbWVUaW1lIGdhbWVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogQWRkIHlvdXIgdXBkYXRlIGxvZ2ljIGhlcmVcclxuICAgICAgICAgICAgYm9vbCBfaG9sZGluZ0Rvd24gPSBNb3VzZS5HZXRTdGF0ZSgpLkxlZnRCdXR0b24gPT0gQnV0dG9uU3RhdGUuUHJlc3NlZDtcclxuICAgICAgICAgICAgTGFzdE1vdXNlRG93biA9IF9ob2xkaW5nRG93biAmJiAhaG9sZGluZ0Rvd247XHJcbiAgICAgICAgICAgIGhvbGRpbmdEb3duID0gX2hvbGRpbmdEb3duO1xyXG4gICAgICAgICAgICBpZiAod29uID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB1aS5VcGRhdGUoKTtcclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgTGFzdE1vdXNlRG93bjtcclxuICAgICAgICBib29sIGhvbGRpbmdEb3duO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIGdhbWUgc2hvdWxkIGRyYXcgaXRzZWxmLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZ2FtZVRpbWVcIj5Qcm92aWRlcyBhIHNuYXBzaG90IG9mIHRpbWluZyB2YWx1ZXMuPC9wYXJhbT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBEcmF3KEdhbWVUaW1lIGdhbWVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR3JhcGhpY3NEZXZpY2UuQ2xlYXIoQ29sb3IuQ29ybmZsb3dlckJsdWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogQWRkIHlvdXIgZHJhd2luZyBjb2RlIGhlcmVcclxuXHJcbiNpZiBXSU5ET1dTXHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkJlZ2luKGJsZW5kU3RhdGU6IEJsZW5kU3RhdGUuQWxwaGFCbGVuZCk7XHJcbiNlbHNlXHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkJlZ2luKCk7XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICBpZiAod29uID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB1aS5EcmF3KCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nIHRleHQgPSBzdHJpbmcuRm9ybWF0KFwiezB9IGhhcyB3b24uXCIsd29uLkdldFR5cGUoKS5OYW1lKTtcclxuICAgICAgICAgICAgICAgIHZhciBtZWFzdXJlID0gZm9udC5NZWFzdXJlU3RyaW5nKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhd1N0cmluZyhmb250LCB0ZXh0LCBuZXcgVmVjdG9yMih5OiAoR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC0gbWVhc3VyZS5ZKSAvIDIsIHg6IChHcmFwaGljc0RldmljZS5WaWV3cG9ydC5XaWR0aCAtIG1lYXN1cmUuWCkgLyAyKSwgQ29sb3IuUmVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5FbmQoKTtcclxuXHJcbiAgICAgICAgICAgIGJhc2UuRHJhdyhnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFBvaW50ZXI8VD5cclxuICAgIHtcclxuICAgICAgICBUIHZhbHVlO1xyXG4gICAgICAgIHB1YmxpYyBQb2ludGVyIChUIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0VmFsdWUoVCB2YWx1ZSkgeyB0aGlzLnZhbHVlID0gdmFsdWU7fVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGltcGxpY2l0IG9wZXJhdG9yIFQgKFBvaW50ZXI8VD4gdmFsdWUpIHtyZXR1cm4gdmFsdWUudmFsdWU7fVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBvcGVyYXRvciB+IChQb2ludGVyPFQ+IHZhbHVlKSB7cmV0dXJuIHZhbHVlLnZhbHVlO31cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcm9ncmFtXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdXNpbmcgKHZhciBnYW1lID0gbmV3IExvdmVMZXR0ZXJHYW1lKCkpXHJcbiAgICAgICAgICAgICAgICBnYW1lLlJ1bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBTeXN0ZW0uQ29sbGVjdGlvbnNcclxue1xyXG4gICAgaW50ZXJuYWwgc3RhdGljIGNsYXNzIF9IYXNoSGVscGVyc1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgY29uc3QgSW50MzIgSGFzaFByaW1lID0gMTAxO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGludFtdIHByaW1lcyA9IHtcclxuICAgICAgICAgICAgMywgNywgMTEsIDE3LCAyMywgMjksIDM3LCA0NywgNTksIDcxLCA4OSwgMTA3LCAxMzEsIDE2MywgMTk3LCAyMzksIDI5MywgMzUzLCA0MzEsIDUyMSwgNjMxLCA3NjEsIDkxOSxcclxuICAgICAgICAgICAgMTEwMywgMTMyNywgMTU5NywgMTkzMSwgMjMzMywgMjgwMSwgMzM3MSwgNDA0OSwgNDg2MSwgNTgzOSwgNzAxMywgODQxOSwgMTAxMDMsIDEyMTQzLCAxNDU5MSxcclxuICAgICAgICAgICAgMTc1MTksIDIxMDIzLCAyNTIyOSwgMzAyOTMsIDM2MzUzLCA0MzYyNywgNTIzNjEsIDYyODUxLCA3NTQzMSwgOTA1MjMsIDEwODYzMSwgMTMwMzYzLCAxNTY0MzcsXHJcbiAgICAgICAgICAgIDE4Nzc1MSwgMjI1MzA3LCAyNzAzNzEsIDMyNDQ0OSwgMzg5MzU3LCA0NjcyMzcsIDU2MDY4OSwgNjcyODI3LCA4MDc0MDMsIDk2ODg5NywgMTE2MjY4NywgMTM5NTI2MyxcclxuICAgICAgICAgICAgMTY3NDMxOSwgMjAwOTE5MSwgMjQxMTAzMywgMjg5MzI0OSwgMzQ3MTg5OSwgNDE2NjI4NywgNDk5OTU1OSwgNTk5OTQ3MSwgNzE5OTM2OSB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgSXNQcmltZShpbnQgY2FuZGlkYXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKChjYW5kaWRhdGUgJiAxKSAhPSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgbGltaXQgPSAoaW50KU1hdGguU3FydChjYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgZGl2aXNvciA9IDM7IGRpdmlzb3IgPD0gbGltaXQ7IGRpdmlzb3IgKz0gMilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGNhbmRpZGF0ZSAlIGRpdmlzb3IpID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoY2FuZGlkYXRlID09IDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgR2V0UHJpbWUoaW50IG1pbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChtaW4gPCAwKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKFwiSGFzaHRhYmxlJ3MgY2FwYWNpdHkgb3ZlcmZsb3dlZCBhbmQgd2VudCBuZWdhdGl2ZS4gQ2hlY2sgbG9hZCBmYWN0b3IsIGNhcGFjaXR5IGFuZCB0aGUgY3VycmVudCBzaXplIG9mIHRoZSB0YWJsZS5cIik7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcHJpbWVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgcHJpbWUgPSBwcmltZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAocHJpbWUgPj0gbWluKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gKG1pbiB8IDEpOyBpIDwgSW50MzIuTWF4VmFsdWU7IGkgKz0gMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKElzUHJpbWUoaSkgJiYgKChpIC0gMSkgJSBIYXNoUHJpbWUgIT0gMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1pbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEdldE1pblByaW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcmltZXNbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBFeHBhbmRQcmltZShpbnQgb2xkU2l6ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBuZXdTaXplID0gMiAqIG9sZFNpemU7XHJcbiAgICAgICAgICAgIGlmICgodWludCluZXdTaXplID4gTWF4UHJpbWVBcnJheUxlbmd0aCAmJiBNYXhQcmltZUFycmF5TGVuZ3RoID4gb2xkU2l6ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1heFByaW1lQXJyYXlMZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEdldFByaW1lKG5ld1NpemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBNYXhQcmltZUFycmF5TGVuZ3RoID0gMHg3RkVGRkZGRDtcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQUlQbGF5ZXIgOiBQbGF5ZXJcclxuICAgIHtcclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgQ1MxOTk4IC8vIEFzeW5jIG1ldGhvZCBsYWNrcyAnYXdhaXQnIG9wZXJhdG9ycyBhbmQgd2lsbCBydW4gc3luY2hyb25vdXNseVxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBvdmVycmlkZSBUYXNrPFRleHR1cmUyRD4gVGFyZ2V0Q2FyZCgpXHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIENTMTk5OCAvLyBBc3luYyBtZXRob2QgbGFja3MgJ2F3YWl0JyBvcGVyYXRvcnMgYW5kIHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBHYW1lLmNhcmRJbWFnZXNbM107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBBSVBsYXllcihIYW5kR2FtZSBHYW1lKSA6IGJhc2UoR2FtZSkgeyB9XHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSBDUzE5OTggLy8gQXN5bmMgbWV0aG9kIGxhY2tzICdhd2FpdCcgb3BlcmF0b3JzIGFuZCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgTG9va0F0Q2FyZHMoUmVhbENhcmRQb29sIGNhcmRQb29sKSB7IH1cclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgQ1MxOTk4IC8vIEFzeW5jIG1ldGhvZCBsYWNrcyAnYXdhaXQnIG9wZXJhdG9ycyBhbmQgd2lsbCBydW4gc3luY2hyb25vdXNseVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgdm9pZCBPblR1cm5TdGFydCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk9uVHVyblN0YXJ0KCk7XHJcbiAgICAgICAgICAgIElFbnVtZXJhYmxlPENhcmQ+IGMgPSBIYW5kLmNhcmRzLFxyXG4gICAgICAgICAgICAgICAgbyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuT3JkZXJCeTxnbG9iYWw6OkhhbmRHYW1lcy5DYXJkLGludD4oYywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkhhbmRHYW1lcy5DYXJkLCBpbnQ+KSh2ID0+ICgoQ2FyZHMuTG92ZUxldHRlckNhcmQpdikuVmFsdWUpKSxcclxuICAgICAgICAgICAgICAgIGwgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvTGlzdDxnbG9iYWw6OkhhbmRHYW1lcy5DYXJkPihvKTtcclxuICAgICAgICAgICAgdmFyIGkgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQ+KGwpO1xyXG4gICAgICAgICAgICBhd2FpdCBpLlBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2s8UGxheWVyPiBUYXJnZXRQbGF5ZXIoKSB7cmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuT3JkZXJCeTxnbG9iYWw6OkhhbmRHYW1lcy5QbGF5ZXIsYm9vbD4oICAgICAgICAgICAgR2FtZS5wbGF5ZXJzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllciwgYm9vbD4pKHYgPT4gdi5Jc0hhbmRtYWlkZWQpKS5UaGVuQnk8Ym9vbD4oKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuUGxheWVyLCBib29sPikodiA9PiB2IGlzIEFJUGxheWVyKSkuVG9MaXN0KClbMF07fVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXMuQ2FyZHNcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIExvdmVMZXR0ZXJDYXJkIDogQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBpbnQgVmFsdWUgeyBnZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgUGxheSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gKChIYW5kKUBpbikucGxheWVyO1xyXG4gICAgICAgICAgICBhd2FpdCBiYXNlLlBsYXkoKTtcclxuICAgICAgICAgICAgYXdhaXQgcGxheWVyLkVuZFR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lc1xyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgUmVhbENhcmRQb29sIDogQ2FyZFBvb2xcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxDYXJkPiBjYXJkcyA9IG5ldyBMaXN0PENhcmQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWFsQ2FyZFBvb2woSGFuZEdhbWUgZ2FtZSkgOiBiYXNlKGdhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgQWRkKENhcmQgY2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhcmQuQGluID0gdGhpcztcclxuICAgICAgICAgICAgY2FyZHMuQWRkKGNhcmQpO1xyXG4gICAgICAgICAgICBiYXNlLkFkZChjYXJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgUmVtb3ZlKENhcmQgY2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhcmQuQGluID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKCFjYXJkcy5SZW1vdmUoY2FyZCkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJ7MH0gaXMgbm90IGluIGNvbGxlY3Rpb24uXCIsY2FyZCkpO1xyXG4gICAgICAgICAgICBiYXNlLlJlbW92ZShjYXJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgQ29udGFpbnMoQ2FyZCBjYXJkKSB7cmV0dXJuIGNhcmRzLkNvbnRhaW5zKGNhcmQpO31cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQ7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBMb2NhbFBsYXllciA6IFBsYXllclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE9uVHVyblN0YXJ0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuT25UdXJuU3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgW0ZsYWdzXVxyXG4gICAgICAgIHByaXZhdGUgZW51bSBBbGVydFNjcmVlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hvb3NlQVBsYXllciA9IDEsXHJcbiAgICAgICAgICAgIE5hbWVBQ2FyZCA9IDIsXHJcbiAgICAgICAgICAgIFZpZXdDYXJkcyA9IDZcclxuICAgICAgICB9XHJcbiAgICAgICAgQWxlcnRTY3JlZW4/IEN1cnJlbnRBbGVydFNjcmVlbjtcclxuXHJcbiAgICAgICAgcHVibGljIExvY2FsUGxheWVyKEhhbmRHYW1lIEdhbWUpIDogYmFzZShHYW1lKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2s8UGxheWVyPiBUYXJnZXRQbGF5ZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudEFsZXJ0U2NyZWVuID0gQWxlcnRTY3JlZW4uQ2hvb3NlQVBsYXllcjtcclxuICAgICAgICAgICAgUGxheWVyIHIgPSBhd2FpdCAodGFyZ2V0UGxheWVyID0gbmV3IFRhc2tDb21wbGV0aW9uU291cmNlPFBsYXllcj4oKSkuVGFzaztcclxuICAgICAgICAgICAgdGFyZ2V0UGxheWVyID0gbnVsbDtcclxuICAgICAgICAgICAgQ3VycmVudEFsZXJ0U2NyZWVuID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYXNrQ29tcGxldGlvblNvdXJjZTxQbGF5ZXI+IHRhcmdldFBsYXllcjtcclxuICAgICAgICBUYXNrQ29tcGxldGlvblNvdXJjZTxUZXh0dXJlMkQ+IHRhcmdldENhcmQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IERpY3Rpb25hcnk8QWxlcnRTY3JlZW4sIHN0cmluZz4gbWVzc2FnZXMgPSBCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8QWxlcnRTY3JlZW4sIHN0cmluZz4oKSwoX28xKT0+e19vMS5BZGQoQWxlcnRTY3JlZW4uTmFtZUFDYXJkLFwiQ2hvb3NlIGEgY2FyZFwiKTtfbzEuQWRkKEFsZXJ0U2NyZWVuLkNob29zZUFQbGF5ZXIsXCJDaG9vc2UgYSBwbGF5ZXJcIik7X28xLkFkZChBbGVydFNjcmVlbi5WaWV3Q2FyZHMsXCJZb3UgaGF2ZSAyIHNlY29uZHMgdG8gbG9vayBhdCB0aGVzZSBjYXJkcy5cIik7cmV0dXJuIF9vMTt9KTtcclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgaW5Mb2NrO1xyXG5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgb3ZlcnJpZGUgVGFzazxUZXh0dXJlMkQ+IFRhcmdldENhcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudEFsZXJ0U2NyZWVuID0gQWxlcnRTY3JlZW4uTmFtZUFDYXJkO1xyXG4gICAgICAgICAgICBjYXJkc1RvRHJhdyA9IEdhbWUuY2FyZEltYWdlcy5HZXRSYW5nZSgxLCBHYW1lLmNhcmRJbWFnZXMuQ291bnQgLSAxKTtcclxuICAgICAgICAgICAgdmFyIHIgPSBhd2FpdCAodGFyZ2V0Q2FyZCA9IG5ldyBUYXNrQ29tcGxldGlvblNvdXJjZTxUZXh0dXJlMkQ+KCkpLlRhc2s7XHJcbiAgICAgICAgICAgIHRhcmdldENhcmQgPSBudWxsO1xyXG4gICAgICAgICAgICBDdXJyZW50QWxlcnRTY3JlZW4gPSBudWxsO1xyXG4gICAgICAgICAgICBjYXJkc1RvRHJhdyA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFzeW5jIHZvaWQgVXBkYXRlICgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoR2FtZS5wbGF5ZXJzW0dhbWUudHVybklkeF0gIT0gdGhpcylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKEN1cnJlbnRBbGVydFNjcmVlbiA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWluTG9jaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYXJkIHBsYXllZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNhcmQgaW4gSGFuZC5jYXJkcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vdXNlU3RhdGUgbW91c2VTdGF0ZSA9IE1vdXNlLkdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChIYW5kLkdldERyYXdpbmdQb3NpdGlvbihjYXJkKS5EcmF3UG9zaXRpb24uQ29udGFpbnMobW91c2VTdGF0ZS5Qb3NpdGlvbikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghR2FtZS5MYXN0TW91c2VEb3duKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQuSGlnaGxpZ2h0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllZCA9IGNhcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZC5IaWdobGlnaHRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbkxvY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBwbGF5ZWQuUGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbkxvY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBNb3VzZS5HZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChDdXJyZW50QWxlcnRTY3JlZW4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBbGVydFNjcmVlbi5DaG9vc2VBUGxheWVyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZS5MYXN0TW91c2VEb3duKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHBsYXllciBpbiBHYW1lLnBsYXllcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllci5Jc0hhbmRtYWlkZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHZXRMb2NhdGlvbk9mKHBsYXllcikuQ29udGFpbnMoc3RhdGUuWCwgc3RhdGUuWSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyICE9IG51bGwgJiYgIXRhcmdldFBsYXllci5UYXNrLklzQ29tcGxldGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGxheWVyLlNldFJlc3VsdChwbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQWxlcnRTY3JlZW4uTmFtZUFDYXJkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBuID0gMDsgbiA8IEdhbWUuY2FyZEltYWdlcy5Db3VudDsgbisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9nZXRDYXJkUG9zaXRpb24obikuQ29udGFpbnMoc3RhdGUuWCwgc3RhdGUuWSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLkxlZnRCdXR0b24gPT0gQnV0dG9uU3RhdGUuUHJlc3NlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHYW1lLmNhcmRJbWFnZXNbbl0gIT0gbnVsbCAmJiAhdGFyZ2V0Q2FyZC5UYXNrLklzQ29tcGxldGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2FyZC5TZXRSZXN1bHQoR2FtZS5jYXJkSW1hZ2VzW25dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IERpY3Rpb25hcnk8QWxlcnRTY3JlZW4sIEFjdGlvbjxMb2NhbFBsYXllcj4+IGhpZ2hsaWdodHMgPSBCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8QWxlcnRTY3JlZW4sIEFjdGlvbjxMb2NhbFBsYXllcj4+KCksKF9vMik9PntfbzIuQWRkKEFsZXJ0U2NyZWVuLkNob29zZUFQbGF5ZXIsQHRoaXMgPT4gQHRoaXMuRHJhd1BsYXllcnMoKSk7X28yLkFkZChBbGVydFNjcmVlbi5OYW1lQUNhcmQsQHRoaXMgPT4gQHRoaXMuRHJhd0NhcmRzKCkpO3JldHVybiBfbzI7fSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLmNhcmRiYWNrLCBuZXcgUmVjdGFuZ2xlKEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuV2lkdGggLSAxNTAgLSBEZWNrLmNhcmRXaWR0aCAtIDIwLCBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAtIERlY2suY2FyZEhlaWdodCwgRGVjay5jYXJkV2lkdGgsIERlY2suY2FyZEhlaWdodCksIENvbG9yLldoZWF0KTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNhcmQgaW4gbmV3IExpc3Q8Q2FyZD4oR2FtZS5kaXNjYXJkUGlsZS5jYXJkcykpXHJcbiAgICAgICAgICAgICAgICBjYXJkLkRyYXcoKTtcclxuICAgICAgICAgICAgRHJhd0hhbmRzKCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBydW4gaW4gaGlnaGxpZ2h0cylcclxuICAgICAgICAgICAgICAgIGlmICgocnVuLktleSB8IEN1cnJlbnRBbGVydFNjcmVlbikgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICBydW4uVmFsdWUodGhpcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoQ3VycmVudEFsZXJ0U2NyZWVuICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZyBkaXNwbGF5ZWRUZXh0ID0gbWVzc2FnZXNbKEFsZXJ0U2NyZWVuKUN1cnJlbnRBbGVydFNjcmVlbl07XHJcbiAgICAgICAgICAgICAgICBHYW1lLnNwcml0ZUJhdGNoLkRyYXcoR2FtZS5yZWN0YW5nbGUsIEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuQm91bmRzLCBuZXcgQ29sb3IoQ29sb3IuQmxhY2ssIC45ZikpO1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMiB0ZXh0TWV0cmljcyA9IEdhbWUuY2hvaWNlRm9udC5NZWFzdXJlU3RyaW5nKGRpc3BsYXllZFRleHQpO1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMiB0ZXh0TG9jID0gLSB0ZXh0TWV0cmljcyAvIDI7XHJcbiAgICAgICAgICAgICAgICBHYW1lLnNwcml0ZUJhdGNoLkRyYXcoR2FtZS5yZWN0YW5nbGUsIG5ldyBSZWN0YW5nbGUodGV4dExvYy5Ub1BvaW50KCkgKyAoR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5Cb3VuZHMuU2l6ZS5Ub1ZlY3RvcjIoKSAvIDIpLlRvUG9pbnQoKSwgdGV4dE1ldHJpY3MuVG9Qb2ludCgpKSwgQ29sb3IuQmx1ZVZpb2xldCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lLnNwcml0ZUJhdGNoLkRyYXdTdHJpbmcoR2FtZS5jaG9pY2VGb250LCBkaXNwbGF5ZWRUZXh0LCB0ZXh0TG9jICsgR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5Cb3VuZHMuU2l6ZS5Ub1ZlY3RvcjIoKSAvIDIsIENvbG9yLkJsYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgcnVuIGluIGhpZ2hsaWdodHMpXHJcbiAgICAgICAgICAgICAgICBpZiAoKHJ1bi5LZXkgfCBDdXJyZW50QWxlcnRTY3JlZW4pICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuLlZhbHVlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBEcmF3SGFuZHMgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IG4gPSAwOyBuIDwgR2FtZS5wbGF5ZXJzLkNvdW50OyBuKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBHYW1lLnBsYXllcnNbbl07XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgY2FyZCBpbiBuZXcgTGlzdDxDYXJkPihwbGF5ZXIuSGFuZC5jYXJkcykpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZC5EcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgRHJhd1BsYXllcnMgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IG4gPSAwOyBuIDwgR2FtZS5wbGF5ZXJzLkNvdW50OyBuKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBHYW1lLnBsYXllcnNbbl07XHJcbiAgICAgICAgICAgICAgICB1aW50IGNvbG9yID0gKHVpbnQpKDB4ZmYgPDwgKG4gPDwgMykpICsgMHhmZjAwMDAwMDtcclxuICAgICAgICAgICAgICAgIFJlY3RhbmdsZSByID0gR2V0TG9jYXRpb25PZihwbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEdhbWUucmVjdGFuZ2xlLCByLCBuZXcgQ29sb3IoY29sb3IpKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIubG9zdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLnNwcml0ZUJhdGNoLkRyYXcoR2FtZS5yZWN0YW5nbGUsIHIsIG5ldyBDb2xvcihDb2xvci5CbGFjaywgLjVmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEdhbWUucmVjdGFuZ2xlLCBuZXcgUmVjdGFuZ2xlKHIuTG9jYXRpb24gKyBuZXcgUG9pbnQoMzUpLCBuZXcgUG9pbnQoMzApKSwgQ29sb3IuUmVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBsYXllci5Jc0hhbmRtYWlkZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEdhbWUucmVjdGFuZ2xlLCBuZXcgUmVjdGFuZ2xlKHIuTG9jYXRpb24gKyBuZXcgUG9pbnQoMzUpLCBuZXcgUG9pbnQoMzApKSwgQ29sb3IuQmx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChHYW1lLnBsYXllcnNbR2FtZS50dXJuSWR4XSAhPSBwbGF5ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEdhbWUucmVjdGFuZ2xlLCByLCBuZXcgQ29sb3IoQ29sb3IuV2hpdGUsIC4yNWYpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUmVjdGFuZ2xlIF9nZXRDYXJkUG9zaXRpb24oaW50IGluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgaW50IGNhcmRXaWR0aCA9IEhhbmQuY2FyZFdpZHRoLCBjYXJkSGVpZ2h0ID0gSGFuZC5jYXJkSGVpZ2h0O1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC8gMiAtIGNhcmRzVG9EcmF3LkNvdW50ICogY2FyZFdpZHRoIC8gMiArIGluZGV4ICogY2FyZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC0gY2FyZEhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBjYXJkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZEhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBMaXN0PFRleHR1cmUyRD4gY2FyZHNUb0RyYXc7XHJcblxyXG4gICAgICAgIHZvaWQgRHJhd0NhcmRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChDdXJyZW50QWxlcnRTY3JlZW4gPT0gQWxlcnRTY3JlZW4uTmFtZUFDYXJkIHx8IEN1cnJlbnRBbGVydFNjcmVlbiA9PSBBbGVydFNjcmVlbi5WaWV3Q2FyZHMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBuID0gMDsgbiA8IGNhcmRzVG9EcmF3LkNvdW50OyBuKyspXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5zcHJpdGVCYXRjaC5EcmF3KGNhcmRzVG9EcmF3W25dLCBfZ2V0Q2FyZFBvc2l0aW9uKG4pLCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBSZWN0YW5nbGUgR2V0TG9jYXRpb25PZiAoUGxheWVyIHBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBpbmRleCA9ICgoR2FtZS5wbGF5ZXJzLkluZGV4T2YocGxheWVyKSAqIDQgLyBHYW1lLnBsYXllcnMuQ291bnQgKyAoMiAvIEdhbWUucGxheWVycy5Db3VudCkpICsgMikgJSA0O1xyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IG5ldyBQb2ludCgxMDAsIDEwMCk7XHJcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IG5ldyBQb2ludChcclxuICAgICAgICAgICAgICAgIChHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoICAtIHNpemUuWCkgKiAoaW5kZXggJSAyKSxcclxuICAgICAgICAgICAgICAgIChHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAtIHNpemUuWSkgKiAoaW5kZXggLyAyKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHBvc2l0aW9uLCBzaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrIExvb2tBdENhcmRzKFJlYWxDYXJkUG9vbCBjYXJkUG9vbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhcmRzVG9EcmF3ID0gY2FyZFBvb2wuY2FyZHMuQ29udmVydEFsbDxnbG9iYWw6Ok1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzLlRleHR1cmUyRD4oKGdsb2JhbDo6U3lzdGVtLkNvbnZlcnRlcjxnbG9iYWw6OkhhbmRHYW1lcy5DYXJkLCBnbG9iYWw6Ok1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzLlRleHR1cmUyRD4pKHYgPT4gdi5pbWFnZSkpO1xyXG4gICAgICAgICAgICBDdXJyZW50QWxlcnRTY3JlZW4gPSBBbGVydFNjcmVlbi5WaWV3Q2FyZHM7XHJcbiAgICAgICAgICAgIGF3YWl0IFRhc2suRGVsYXkoMjAwMCk7XHJcbiAgICAgICAgICAgIEN1cnJlbnRBbGVydFNjcmVlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIGNhcmRzVG9EcmF3ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gQSBnYW1lIG9mIGxvdmUgbGV0dGVyLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBMb3ZlTGV0dGVyR2FtZSA6IEhhbmRHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBDb250ZW50Rm9sZGVyTmFtZSB7Z2V0e3JldHVybiBcIkxvdmUgTGV0dGVyXCI7fX1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGVcclxuI2lmIFdJTkRPV1NcclxuICAgICAgICAgICAgRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZW5kaWZcclxuICAgICAgICAgICAgPHN0cmluZywgaW50PiBjYXJkcyB7Z2V0e3JldHVybiBCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3XHJcbiNpZiBXSU5ET1dTXHJcbiAgICAgICAgICAgIERpY3Rpb25hcnlcclxuI2Vsc2VcclxuICAgICAgICAgICAgX0RpY3Rpb25hcnlcclxuI2VuZGlmXHJcbiAgICAgICAgICAgIDxzdHJpbmcsIGludD4oKSwoX28zKT0+e19vMy5BZGQoXCJHdWFyZFwiLDUpO19vMy5BZGQoXCJQcmllc3RcIiwyKTtfbzMuQWRkKFwiQmFyb25cIiwyKTtfbzMuQWRkKFwiSGFuZG1haWRcIiwyKTtfbzMuQWRkKFwiUHJpbmNlXCIsMik7X28zLkFkZChcIktpbmdcIiwxKTtfbzMuQWRkKFwiQ291bnRlc3NcIiwxKTtfbzMuQWRkKFwiUHJpbmNlc3NcIiwxKTtyZXR1cm4gX28zO30pO319XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lcy5DYXJkc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmFyb25DYXJkIDogTG92ZUxldHRlckNhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IFZhbHVlIHtnZXR7cmV0dXJuIDM7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgT25QbGF5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllclxyXG4gICAgICAgICAgICAgICAgbWUgPSAoKEhhbmQpQGluKS5wbGF5ZXI7XHJcbiAgICAgICAgICAgIHZhciBvdGhlciA9IGF3YWl0ICgoSGFuZClAaW4pLnBsYXllci5UYXJnZXRQbGF5ZXIoKTsgLy9Xb3JrYXJvdW5kIGZvciAjMjkzMVxyXG4gICAgICAgICAgICBhd2FpdCBtZS5Mb29rQXRDYXJkcyhvdGhlci5IYW5kKTtcclxuICAgICAgICAgICAgYXdhaXQgb3RoZXIuTG9va0F0Q2FyZHMobWUuSGFuZCk7XHJcbiAgICAgICAgICAgIHZhciBhQ29tcGFyZSA9ICgoTG92ZUxldHRlckNhcmQpKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Z2xvYmFsOjpIYW5kR2FtZXMuQ2FyZD4ob3RoZXIuSGFuZC5jYXJkcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkhhbmRHYW1lcy5DYXJkLCBib29sPikodiA9PiB2ICE9IHRoaXMpKSkpLlZhbHVlO1xyXG4gICAgICAgICAgICB2YXIgYkNvbXBhcmUgPSAoKExvdmVMZXR0ZXJDYXJkKShTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQ+KG1lLkhhbmQuY2FyZHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuQ2FyZCwgYm9vbD4pKHYgPT4gdiAhPSB0aGlzKSkpKS5WYWx1ZTsgLy9Xb3JrYXJvdW5kIGZvciAjMjkxOC5cclxuICAgICAgICAgICAgc3dpdGNoIChhQ29tcGFyZS5Db21wYXJlVG8oYkNvbXBhcmUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIC0xOiAvLyBHb29kIGZvciBtZVxyXG4gICAgICAgICAgICAgICAgICAgIG90aGVyLkxvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTogLy8gQmFkIGZvciBtZVxyXG4gICAgICAgICAgICAgICAgICAgIG1lLkxvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzLkNhcmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDb3VudGVzc0NhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gNzt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lcy5DYXJkc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR3VhcmRDYXJkIDogTG92ZUxldHRlckNhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IFZhbHVlIHtnZXR7cmV0dXJuIDE7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgT25QbGF5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBhd2FpdCAoKEhhbmQpQGluKS5wbGF5ZXIuVGFyZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXR0ZWRDYXJkID0gYXdhaXQgKChIYW5kKUBpbikucGxheWVyLlRhcmdldENhcmQoKTsgLy9Xb3JrYXJvdW5kIGZvciAjMjkxOC5cclxuICAgICAgICAgICAgaWYgKHBsYXllci5IYW5kLmNhcmRzWzBdLmltYWdlID09IHRhcmdldHRlZENhcmQpXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuTG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzLkNhcmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIYW5kbWFpZENhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gNDt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgKChIYW5kKUBpbikucGxheWVyLklzSGFuZG1haWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXMuQ2FyZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEtpbmdDYXJkIDogTG92ZUxldHRlckNhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IFZhbHVlIHtnZXR7cmV0dXJuIDY7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgT25QbGF5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9ICgoSGFuZClAaW4pLnBsYXllcjtcclxuICAgICAgICAgICAgdmFyIG90aGVyID0gYXdhaXQgbWUuVGFyZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IG1lLkhhbmQuY2FyZHNbMF0uTW92ZUNhcmRUbyhvdGhlci5IYW5kKTtcclxuICAgICAgICAgICAgYXdhaXQgb3RoZXIuSGFuZC5jYXJkc1swXS5Nb3ZlQ2FyZFRvKG1lLkhhbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lcy5DYXJkc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJpZXN0Q2FyZCA6IExvdmVMZXR0ZXJDYXJkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBWYWx1ZSB7Z2V0e3JldHVybiAyO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrIE9uUGxheSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhd2FpdCAoKEhhbmQpQGluKS5wbGF5ZXIuTG9va0F0Q2FyZHMoKGF3YWl0ICgoSGFuZClAaW4pLnBsYXllci5UYXJnZXRQbGF5ZXIoKSkuSGFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXMuQ2FyZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFByaW5jZUNhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gNTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIEBpbiA9IChhd2FpdCAoKEhhbmQpdGhpcy5AaW4pLnBsYXllci5UYXJnZXRQbGF5ZXIoKSkuSGFuZDtcclxuICAgICAgICAgICAgYXdhaXQgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxnbG9iYWw6OkhhbmRHYW1lcy5DYXJkPigoKEhhbmQpQGluKS5jYXJkcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkhhbmRHYW1lcy5DYXJkLCBib29sPikodiA9PiB2ICE9IHRoaXMpKS5Nb3ZlQ2FyZFRvKEBpbi5HYW1lLmRpc2NhcmRQaWxlKTtcclxuICAgICAgICAgICAgYXdhaXQgQGluLkdhbWUuVG9wQ2FyZCgpLk1vdmVDYXJkVG8oQGluKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lcy5DYXJkc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJpbmNlc3NDYXJkIDogTG92ZUxldHRlckNhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IFZhbHVlIHtnZXR7cmV0dXJuIDg7fX1cclxuXHJcbiNwcmFnbWEgd2FybmluZyBkaXNhYmxlIENTMTk5OCAvLyBBc3luYyBtZXRob2QgbGFja3MgJ2F3YWl0JyBvcGVyYXRvcnMgYW5kIHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPbkRpc2NhcmQoKVxyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSBDUzE5OTggLy8gQXN5bmMgbWV0aG9kIGxhY2tzICdhd2FpdCcgb3BlcmF0b3JzIGFuZCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAoKEhhbmQpQGluKS5wbGF5ZXIuTG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgT25QbGF5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBEZWNrIDogUmVhbENhcmRQb29sXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBjYXJkV2lkdGggPSAxNTA7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBjYXJkSGVpZ2h0ID0gMjA5O1xyXG5cclxuICAgICAgICBwdWJsaWMgRGVjayhIYW5kR2FtZSBnYW1lKSA6IGJhc2UoZ2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgRHJhd0luZm8gR2V0RHJhd2luZ1Bvc2l0aW9uKENhcmQgY2FyZCkge3JldHVybiBuZXcgRHJhd0luZm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdQb3NpdGlvbiA9IG5ldyBSZWN0YW5nbGUoR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5XaWR0aCAtIDE1MCAtIGNhcmRXaWR0aCAtIDIwLCBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAtIGNhcmRIZWlnaHQsIGNhcmRXaWR0aCwgY2FyZEhlaWdodCksXHJcbiAgICAgICAgICAgIFBlcm1pc3Npb25zID0gRHJhd0luZm8uRHJhd1Blcm1pc3Npb24uQW5pbWF0YWJsZVxyXG4gICAgICAgIH07fVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBEaXNjYXJkUGlsZSA6IFJlYWxDYXJkUG9vbFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBEaXNjYXJkUGlsZShIYW5kR2FtZSBnYW1lKSA6IGJhc2UoZ2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRXaWR0aCA9IEhhbmQuY2FyZFdpZHRoIC8gMjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRIZWlnaHQgPSBIYW5kLmNhcmRIZWlnaHQgLyAyO1xyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgRHJhd0luZm8gR2V0RHJhd2luZ1Bvc2l0aW9uKENhcmQgY2FyZCkge3JldHVybiBuZXcgRHJhd0luZm9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd1Bvc2l0aW9uID0gbmV3IFJlY3RhbmdsZShHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC0gMTAwIC0gY2FyZFdpZHRoIC0gMTAsIChHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAtIGNhcmRIZWlnaHQpIC8gMiwgY2FyZFdpZHRoLCBjYXJkSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIFBlcm1pc3Npb25zID0gY2FyZHNbY2FyZHMuQ291bnQgLSAxXSA9PSBjYXJkID8gRHJhd0luZm8uRHJhd1Blcm1pc3Npb24uRHJhd2FibGUgOiBEcmF3SW5mby5EcmF3UGVybWlzc2lvbi5BbmltYXRhYmxlXHJcbiAgICAgICAgICAgIH07fVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIYW5kIDogUmVhbENhcmRQb29sXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBjYXJkV2lkdGggPSAxNTA7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBjYXJkSGVpZ2h0ID0gMjA5O1xyXG4gICAgICAgIHB1YmxpYyBQbGF5ZXIgcGxheWVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFuZChIYW5kR2FtZSBnYW1lLCBQbGF5ZXIgcGxheWVyKSA6IGJhc2UoZ2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIERyYXdJbmZvIEdldERyYXdpbmdQb3NpdGlvbihDYXJkIGNhcmQpIHtyZXR1cm4gbmV3IERyYXdJbmZvXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERyYXdQb3NpdGlvbiA9IG5ldyBSZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5XaWR0aCAvIDIgLSBjYXJkcy5Db3VudCAqIGNhcmRXaWR0aCAvIDIgKyBjYXJkcy5JbmRleE9mKGNhcmQpICogY2FyZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIChHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAtIGNhcmRIZWlnaHQpICogKCgoKEdhbWUucGxheWVycy5JbmRleE9mKHBsYXllcikgKiA0IC8gR2FtZS5wbGF5ZXJzLkNvdW50ICsgKDIgLyBHYW1lLnBsYXllcnMuQ291bnQpKSArIDIpICUgNCkgLyAyKSxcclxuICAgICAgICAgICAgICAgICAgICBjYXJkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZEhlaWdodCksXHJcbiAgICAgICAgICAgICAgICBQZXJtaXNzaW9ucyA9IERyYXdJbmZvLkRyYXdQZXJtaXNzaW9uLkRyYXdhYmxlLFxyXG4gICAgICAgICAgICAgICAgU2hvd0NhcmRCYWNrID0gR2FtZS51aSAhPSBwbGF5ZXJcclxuICAgICAgICAgICAgfTt9XHJcbiAgICB9XHJcbn1cclxuIl0KfQo=
