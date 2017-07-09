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
                    $asyncBody = Bridge.fn.bind(this, function () {
                        for (;;) {
                            $step = System.Array.min([0,1], $step);
                            switch ($step) {
                                case 0: {
                                    HandGames.Player.prototype.OnTurnStart.call(this);
                                    $task1 = System.Linq.Enumerable.from(this.Hand.cards).orderBy($asm.$.HandGames.AIPlayer.f1).toList(HandGames.Card).getItem(0).Play();
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
                    $t, 
                    card, 
                    mouseState, 
                    state, 
                    $t1, 
                    player, 
                    n, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        for (;;) {
                            $step = System.Array.min([0,1,2,3,4,5,6,7,8,9,10,11,12,13], $step);
                            switch ($step) {
                                case 0: {
                                    if (!Bridge.referenceEquals(this.Game.players.getItem(this.Game.turnIdx), this)) {
                                        return;
                                    }
                                    if (this.CurrentAlertScreen == null) {
                                        $step = 1;
                                        continue;
                                    } else  {
                                        $step = 12;
                                        continue;
                                    }
                                }
                                case 1: {
                                    $t = Bridge.getEnumerator(this.Hand.cards);
                                    $step = 2;
                                    continue;
                                }
                                case 2: {
                                    if ($t.moveNext()) {
                                        card = $t.Current;
                                        $step = 3;
                                        continue;
                                    }
                                    $step = 11;
                                    continue;
                                }
                                case 3: {
                                    mouseState = Microsoft.Xna.Framework.Input.Mouse.GetState();
                                    if (this.Hand.GetDrawingPosition(card).DrawPosition.Contains(mouseState.Position.$clone())) {
                                        $step = 4;
                                        continue;
                                    } else  {
                                        $step = 9;
                                        continue;
                                    }
                                }
                                case 4: {
                                    if (!this.Game.LastMouseDown) {
                                        $step = 5;
                                        continue;
                                    } else  {
                                        $step = 6;
                                        continue;
                                    }
                                }
                                case 5: {
                                    card.Highlighted = true;
                                    $step = 8;
                                    continue;
                                }
                                case 6: {
                                    $task1 = card.Play();
                                    $step = 7;
                                    $task1.continueWith($asyncBody, true);
                                    return;
                                }
                                case 7: {
                                    $task1.getAwaitedResult();
                                    $step = 11;
                                    continue;
                                }
                                case 8: {
                                    $step = 10;
                                    continue;
                                }
                                case 9: {
                                    card.Highlighted = false;
                                    $step = 10;
                                    continue;
                                }
                                case 10: {
                                    $step = 2;
                                    continue;
                                }
                                case 11: {
                                    $step = 13;
                                    continue;
                                }
                                case 12: {
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
                                    $step = 13;
                                    continue;
                                }
                                case 13: {
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
                    $t, 
                    v, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5,6], $step);
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
                                        $t = Bridge.getEnumerator($in.cards);
                                        $step = 2;
                                        continue;
                                    }
                                    case 2: {
                                        if ($t.moveNext()) {
                                            v = $t.Current;
                                            $step = 3;
                                            continue;
                                        }
                                        $step = 5;
                                        continue;
                                    }
                                    case 3: {
                                        $task2 = v.MoveCardTo($in.Game.discardPile);
                                        $step = 4;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 4: {
                                        $task2.getAwaitedResult();
                                        $step = 2;
                                        continue;
                                    }
                                    case 5: {
                                        $task3 = $in.Game.TopCard().MoveCardTo($in);
                                        $step = 6;
                                        $task3.continueWith($asyncBody);
                                        return;
                                    }
                                    case 6: {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJIYW5kR2FtZXMuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIlBsYXllci5jcyIsIkNhcmQuY3MiLCJDYXJkUG9vbC5jcyIsIkhhbmRHYW1lLmNzIiwiUG9pbnRlci5jcyIsIlByb2dyYW0uY3MiLCJOZXcgQnJpZGdlIFN0dWZmL0hhc2hIZWxwZXJzLmNzIiwiQUlQbGF5ZXIuY3MiLCJDYXJkcy9Mb3ZlTGV0dGVyQ2FyZC5jcyIsIlJlYWxDYXJkUG9vbC5jcyIsIkxvY2FsUGxheWVyLmNzIiwiTG92ZUxldHRlckdhbWUuY3MiLCJDYXJkcy9CYXJvbkNhcmQuY3MiLCJDYXJkcy9Db3VudGVzc0NhcmQuY3MiLCJDYXJkcy9HdWFyZENhcmQuY3MiLCJDYXJkcy9IYW5kbWFpZENhcmQuY3MiLCJDYXJkcy9LaW5nQ2FyZC5jcyIsIkNhcmRzL1ByaWVzdENhcmQuY3MiLCJDYXJkcy9QcmluY2VDYXJkLmNzIiwiQ2FyZHMvUHJpbmNlc3NDYXJkLmNzIiwiRGVjay5jcyIsIkRpc2NhcmRQaWxlLmNzIiwiSGFuZC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs0QkE2Q3VCQTs7Z0JBRVhBLFlBQU9BLElBQUlBLGVBQUtBLGFBQVlBLE9BQU1BOzs7OztnQkE3QmxDQSxxQkFBcUJBLDRCQUF1REEseUJBQWFBLEFBQXNEQTtnQkFDL0lBLElBQUlBO29CQUNBQSxnQkFBV0E7O2dCQUNmQTs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FRQUEsSUFBSUEsNEJBQXVEQSx5QkFBYUEsQUFBc0RBOzRDQUUxSEEsZ0JBQVdBLDRCQUF1REEseUJBQWFBLEFBQXNEQTs0Q0FDcklBOzs7d0NBRUpBOzRDQUVJQSxTQUFTQSwwQkFBYUEsTUFBZUEsQ0FBQ0EsaUNBQW9CQSx5QkFBcENBO2lEQUNqQkE7d0NBQ1RBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQWNBQTtvQ0FDQUEsSUFBSUE7Ozs7Ozs7O29D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QkFBY0EsUUFBUUEsc0NBQzdGQSxHQUFDQSw2Q0FBc0NBLG1DQUFjQSxDQUFDQSxrQkFBQ0EsQ0FBQ0EsR0FBQ0EsK0NBQXFCQSx3QkFBY0EsaUNBQXFCQSxDQUFDQSxvQkFBSUEseUVBQ3RIQSwwQkFDQUEsNkNBQ1VBLDhEQUNDQSxzQ0FBV0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFBsYXllclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBIYW5kIEhhbmQ7XHJcbiAgICAgICAgcHVibGljIEhhbmRHYW1lIEdhbWU7XHJcbiAgICAgICAgcHVibGljIGJvb2wgbG9zdDtcclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0hhbmRtYWlkZWQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIExvc2UgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub3RMb3N0UGxheWVycyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8Z2xvYmFsOjpIYW5kR2FtZXMuUGxheWVyPihHYW1lLnBsYXllcnMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuUGxheWVyLCBib29sPikodiA9PiAhdi5sb3N0KSk7XHJcbiAgICAgICAgICAgIGlmIChub3RMb3N0UGxheWVycy5Db3VudCgpID09IDEpXHJcbiAgICAgICAgICAgICAgICBHYW1lLndvbiA9IG5vdExvc3RQbGF5ZXJzLkZpcnN0KCk7XHJcbiAgICAgICAgICAgIGxvc3QgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiNwcmFnbWEgd2FybmluZyBkaXNhYmxlIENTMTk5OCAvLyBBc3luYyBtZXRob2QgbGFja3MgJ2F3YWl0JyBvcGVyYXRvcnMgYW5kIHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBFbmRUdXJuKClcclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgQ1MxOTk4IC8vIEFzeW5jIG1ldGhvZCBsYWNrcyAnYXdhaXQnIG9wZXJhdG9ycyBhbmQgd2lsbCBydW4gc3luY2hyb25vdXNseVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGxheWVyIHBsYXllcjtcclxuICAgICAgICAgICAgaWYgKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQ291bnQ8Z2xvYmFsOjpIYW5kR2FtZXMuUGxheWVyPihHYW1lLnBsYXllcnMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuUGxheWVyLCBib29sPikodiA9PiB2Lmxvc3QpKSA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lLndvbiA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Z2xvYmFsOjpIYW5kR2FtZXMuUGxheWVyPihHYW1lLnBsYXllcnMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuUGxheWVyLCBib29sPikodiA9PiAhdi5sb3N0KSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyID0gR2FtZS5wbGF5ZXJzW0dhbWUudHVybklkeCA9IChHYW1lLnR1cm5JZHggKyAxKSAlIEdhbWUucGxheWVycy5Db3VudF07XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKHBsYXllci5sb3N0KTtcclxuICAgICAgICAgICAgcGxheWVyLk9uVHVyblN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgVGFzazxUZXh0dXJlMkQ+IFRhcmdldENhcmQoKTtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgVGFzazxQbGF5ZXI+IFRhcmdldFBsYXllcigpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBUYXNrIExvb2tBdENhcmRzKFJlYWxDYXJkUG9vbCBjYXJkUG9vbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIFBsYXllciAoSGFuZEdhbWUgR2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEhhbmQgPSBuZXcgSGFuZCh0aGlzLkdhbWUgPSBHYW1lLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGFzeW5jIHZvaWQgT25UdXJuU3RhcnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSXNIYW5kbWFpZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChHYW1lIGlzIExvdmVMZXR0ZXJHYW1lKVxyXG4gICAgICAgICAgICAgICAgYXdhaXQgR2FtZS5Ub3BDYXJkKCkuTW92ZUNhcmRUbyhIYW5kKTtcclxuICAgICAgICAgICAgdmFyIGNvdW50ZXNzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxnbG9iYWw6OkhhbmRHYW1lcy5DYXJkPihIYW5kLmNhcmRzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQsIGJvb2w+KSh2ID0+IHYgaXMgQ2FyZHMuQ291bnRlc3NDYXJkKSk7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVzcyAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2luZ09yUHJpbmNlID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxnbG9iYWw6OkhhbmRHYW1lcy5DYXJkPihIYW5kLmNhcmRzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQsIGJvb2w+KSh2ID0+IHYgaXMgQ2FyZHMuS2luZ0NhcmQgfHwgdiBpcyBDYXJkcy5QcmluY2VDYXJkKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2luZ09yUHJpbmNlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY291bnRlc3MuUGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lc1xyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBDYXJkUG9vbCBAaW47XHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRCBpbWFnZTtcclxuICAgICAgICBwdWJsaWMgYm9vbCBIaWdobGlnaHRlZDtcclxuICAgICAgICBwdWJsaWMgUmVjdGFuZ2xlPyBvbGRMb2M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBUYXNrIE9uUGxheSgpO1xyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGFzeW5jIFRhc2sgT25EaXNjYXJkICgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICgoRGF0ZVRpbWUuTm93IC0gb3JnRGF0ZSkgPiBnbGlkZVRpbWUpXHJcbiAgICAgICAgICAgICAgICBpZiAoIWFuaW1hdGlvbkRvbmUuVGFzay5Jc0NvbXBsZXRlZClcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25Eb25lLlNldFJlc3VsdChudWxsKTtcclxuICAgICAgICAgICAgRHJhd0luZm8gZHJhd0luZm8gPSBAaW4uR2V0RHJhd2luZ1Bvc2l0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICBSZWN0YW5nbGU/IG5ld0xvYyA9IGRyYXdJbmZvLkRyYXdQb3NpdGlvbjtcclxuICAgICAgICAgICAgaWYgKG5ld0xvYyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBSZWN0YW5nbGUgcmVjdCA9IChSZWN0YW5nbGUpbmV3TG9jO1xyXG4gICAgICAgICAgICBpZiAob2xkTG9jICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJlY3RhbmdsZSBvbGRMb2NSZWFsID0gKFJlY3RhbmdsZSlvbGRMb2M7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCBnbGlkZU4gPSAoKGZsb2F0KShEYXRlVGltZS5Ob3cgLSAoRGF0ZVRpbWUpb3JnRGF0ZSkuVGlja3MgLyBnbGlkZVRpbWUuVGlja3MpO1xyXG4gICAgICAgICAgICAgICAgcmVjdCA9IG5ldyBSZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yMi5MZXJwKG9sZExvY1JlYWwuTG9jYXRpb24uVG9WZWN0b3IyKCksIHJlY3QuTG9jYXRpb24uVG9WZWN0b3IyKCksIGdsaWRlTikuVG9Qb2ludCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjIuTGVycChvbGRMb2NSZWFsLlNpemUuVG9WZWN0b3IyKCksIHJlY3QuU2l6ZS5Ub1ZlY3RvcjIoKSwgZ2xpZGVOKS5Ub1BvaW50KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChIaWdobGlnaHRlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUmVjdGFuZ2xlIGhpZ2hsaWdodFJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUocmVjdC5YIC0gMSwgcmVjdC5ZIC0gMSwgcmVjdC5XaWR0aCArIDEsIHJlY3QuSGVpZ2h0ICsgMSk7XHJcbiAgICAgICAgICAgICAgICBAaW4uR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEBpbi5HYW1lLnJlY3RhbmdsZSwgbmV3IFJlY3RhbmdsZShoaWdobGlnaHRSZWN0YW5nbGUuTG9jYXRpb24sIG5ldyBQb2ludCgxLCByZWN0LkhlaWdodCkpLCBDb2xvci5ZZWxsb3cpO1xyXG4gICAgICAgICAgICAgICAgQGluLkdhbWUuc3ByaXRlQmF0Y2guRHJhdyhAaW4uR2FtZS5yZWN0YW5nbGUsIG5ldyBSZWN0YW5nbGUobmV3IFBvaW50KGhpZ2hsaWdodFJlY3RhbmdsZS5SaWdodCwgaGlnaGxpZ2h0UmVjdGFuZ2xlLlkpLCBuZXcgUG9pbnQoMSwgcmVjdC5IZWlnaHQpKSwgQ29sb3IuWWVsbG93KTtcclxuICAgICAgICAgICAgICAgIEBpbi5HYW1lLnNwcml0ZUJhdGNoLkRyYXcoQGluLkdhbWUucmVjdGFuZ2xlLCBuZXcgUmVjdGFuZ2xlKHJlY3QuWCwgaGlnaGxpZ2h0UmVjdGFuZ2xlLlksIHJlY3QuV2lkdGgsIDEpLCBDb2xvci5ZZWxsb3cpO1xyXG4gICAgICAgICAgICAgICAgQGluLkdhbWUuc3ByaXRlQmF0Y2guRHJhdyhAaW4uR2FtZS5yZWN0YW5nbGUsIG5ldyBSZWN0YW5nbGUocmVjdC5YLCBoaWdobGlnaHRSZWN0YW5nbGUuQm90dG9tLCByZWN0LldpZHRoLCAxKSwgQ29sb3IuWWVsbG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBAaW4uR2FtZS5zcHJpdGVCYXRjaC5EcmF3KGRyYXdJbmZvLlNob3dDYXJkQmFjayA/IEBpbi5HYW1lLmNhcmRiYWNrIDogaW1hZ2UsIHJlY3QsIENvbG9yLldoaXRlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFRpbWVTcGFuIGdsaWRlVGltZSA9IFRpbWVTcGFuLkZyb21TZWNvbmRzKC42NSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGFzeW5jIFRhc2sgUGxheSAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXdhaXQgT25QbGF5KCk7XHJcbiAgICAgICAgICAgIGF3YWl0IE1vdmVDYXJkVG8oQGluLkdhbWUuZGlzY2FyZFBpbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgTW92ZUNhcmRUbyAoQ2FyZFBvb2wgdG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQGluIGlzIEhhbmQgJiYgdG8gaXMgRGlzY2FyZFBpbGUpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBPbkRpc2NhcmQoKTtcclxuICAgICAgICAgICAgSGlnaGxpZ2h0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIG9sZFBvcyA9IEBpbi5HZXREcmF3aW5nUG9zaXRpb24odGhpcyk7XHJcbiAgICAgICAgICAgIEBpbi5SZW1vdmUodGhpcyk7XHJcbiAgICAgICAgICAgIHRvLkFkZCh0aGlzKTtcclxuICAgICAgICAgICAgaWYgKCEob2xkUG9zLlBlcm1pc3Npb25zID09IERyYXdJbmZvLkRyYXdQZXJtaXNzaW9uLlVuZHJhd2FibGUgfHwgdG8uR2V0RHJhd2luZ1Bvc2l0aW9uKHRoaXMpLlBlcm1pc3Npb25zID09IERyYXdJbmZvLkRyYXdQZXJtaXNzaW9uLlVuZHJhd2FibGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvbGRMb2MgPSBvbGRQb3MuRHJhd1Bvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgb3JnRGF0ZSA9IERhdGVUaW1lLk5vdztcclxuICAgICAgICAgICAgICAgIGZyb20gPSBAaW47XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25Eb25lID0gbmV3IFRhc2tDb21wbGV0aW9uU291cmNlPG9iamVjdD4oKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IGFuaW1hdGlvbkRvbmUuVGFzaztcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkRvbmUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgb3JnRGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBmcm9tID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIG9sZExvYyA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRhc2tDb21wbGV0aW9uU291cmNlPG9iamVjdD4gYW5pbWF0aW9uRG9uZTtcclxuICAgICAgICBEYXRlVGltZT8gb3JnRGF0ZTtcclxuICAgICAgICBDYXJkUG9vbCBmcm9tO1xyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBDYXJkUG9vbFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBDYXJkUG9vbCAoSGFuZEdhbWUgZ2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWUgPSBnYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEFkZChDYXJkIGNhcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXJkLkBpbiA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgUmVtb3ZlKENhcmQgY2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkLkBpbiA9PSB0aGlzKVxyXG4gICAgICAgICAgICAgICAgY2FyZC5AaW4gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgYm9vbCBDb250YWlucyhDYXJkIGNhcmQpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBEcmF3SW5mbyBHZXREcmF3aW5nUG9zaXRpb24oQ2FyZCBjYXJkKTtcclxuICAgICAgICBwdWJsaWMgSGFuZEdhbWUgR2FtZTtcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFRoaXMgaXMgdGhlIG1haW4gdHlwZSBmb3IgeW91ciBnYW1lLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBIYW5kR2FtZSA6IEdhbWVcclxuICAgIHtcclxuICAgICAgICBHcmFwaGljc0RldmljZU1hbmFnZXIgZ3JhcGhpY3M7XHJcbiAgICAgICAgcHVibGljIFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PFBsYXllcj4gcGxheWVycyA9IG5ldyBMaXN0PFBsYXllcj4oKTtcclxuICAgICAgICBwdWJsaWMgUGxheWVyIHdvbjtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgc3RyaW5nIENvbnRlbnRGb2xkZXJOYW1lIHsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0XHJcbiNpZiAhV0lORE9XU1xyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICA8c3RyaW5nLCBpbnQ+IGNhcmRzIHsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIExpc3Q8VGV4dHVyZTJEPiBjYXJkSW1hZ2VzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBIYW5kR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBncmFwaGljcyA9IG5ldyBHcmFwaGljc0RldmljZU1hbmFnZXIodGhpcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSXNGdWxsU2NyZWVuID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgIFByZWZlcnJlZEJhY2tCdWZmZXJXaWR0aCA9IDEzNjYsXHJcbiAgICAgICAgICAgICAgICBQcmVmZXJyZWRCYWNrQnVmZmVySGVpZ2h0ID0gNzY4XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIENvbnRlbnQuUm9vdERpcmVjdG9yeSA9IFwiQ29udGVudFwiO1xyXG4gICAgICAgICAgICBJc01vdXNlVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBwZXJmb3JtIGFueSBpbml0aWFsaXphdGlvbiBpdCBuZWVkcyB0byBiZWZvcmUgc3RhcnRpbmcgdG8gcnVuLlxyXG4gICAgICAgIC8vLyBUaGlzIGlzIHdoZXJlIGl0IGNhbiBxdWVyeSBmb3IgYW55IHJlcXVpcmVkIHNlcnZpY2VzIGFuZCBsb2FkIGFueSBub24tZ3JhcGhpY1xyXG4gICAgICAgIC8vLyByZWxhdGVkIGNvbnRlbnQuICBDYWxsaW5nIGJhc2UuSW5pdGlhbGl6ZSB3aWxsIGVudW1lcmF0ZSB0aHJvdWdoIGFueSBjb21wb25lbnRzXHJcbiAgICAgICAgLy8vIGFuZCBpbml0aWFsaXplIHRoZW0gYXMgd2VsbC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogQWRkIHlvdXIgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxyXG5cclxuICAgICAgICAgICAgYmFzZS5Jbml0aWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEIGNhcmRiYWNrO1xyXG4gICAgICAgIHB1YmxpYyBEaXNjYXJkUGlsZSBkaXNjYXJkUGlsZTtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkQ29udGVudCB3aWxsIGJlIGNhbGxlZCBvbmNlIHBlciBnYW1lIGFuZCBpcyB0aGUgcGxhY2UgdG8gbG9hZFxyXG4gICAgICAgIC8vLyBhbGwgb2YgeW91ciBjb250ZW50LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgTG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IFNwcml0ZUJhdGNoLCB3aGljaCBjYW4gYmUgdXNlZCB0byBkcmF3IHRleHR1cmVzLlxyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaCA9IG5ldyBTcHJpdGVCYXRjaChHcmFwaGljc0RldmljZSk7XHJcbiAgICAgICAgICAgIGNhcmRJbWFnZXMgPSBuZXcgTGlzdDxUZXh0dXJlMkQ+KCk7XHJcbiAgICAgICAgICAgIGRlY2sgPSBuZXcgRGVjayh0aGlzKTtcclxuICAgICAgICAgICAgZGlzY2FyZFBpbGUgPSBuZXcgRGlzY2FyZFBpbGUodGhpcyk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IHVzZSB0aGlzLkNvbnRlbnQgdG8gbG9hZCB5b3VyIGdhbWUgY29udGVudCBoZXJlXHJcbiAgICAgICAgICAgIGZvbnQgPSBDb250ZW50LkxvYWQ8U3ByaXRlRm9udD4oXCJBcmlhbFwiKTtcclxuICAgICAgICAgICAgY2hvaWNlRm9udCA9IENvbnRlbnQuTG9hZDxTcHJpdGVGb250PihcIkNob2ljZSBUZXh0XCIpO1xyXG4gICAgICAgICAgICByZWN0YW5nbGUgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICBjYXJkYmFjayA9IENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KHN0cmluZy5Gb3JtYXQoXCJ7MH0vY2FyZGJhY2tcIixDb250ZW50Rm9sZGVyTmFtZSkpO1xyXG4gICAgICAgICAgICBwbGF5ZXJzLkFkZCh1aSA9IG5ldyBMb2NhbFBsYXllcih0aGlzKSk7XHJcbiAgICAgICAgICAgIHBsYXllcnMuQWRkKG5ldyBBSVBsYXllcih0aGlzKSk7XHJcbiAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBuID0gMDtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjYXJkS2V5UGFpciBpbiBjYXJkcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihzdHJpbmcuRm9ybWF0KFwiezB9L3sxfXsyfVwiLENvbnRlbnRGb2xkZXJOYW1lLG4gKyAxLGNhcmRLZXlQYWlyLktleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRJbWFnZXMuQWRkKGltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpZHggPSAwOyBpZHggPCBjYXJkS2V5UGFpci5WYWx1ZTsgaWR4KyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDYXJkIGNhcmQgPSAoQ2FyZClBc3NlbWJseS5HZXRFeGVjdXRpbmdBc3NlbWJseSgpLkdldFR5cGUoc3RyaW5nLkZvcm1hdChcIkhhbmRHYW1lcy5DYXJkcy57MH1DYXJkXCIsY2FyZEtleVBhaXIuS2V5KSkuR2V0Q29uc3RydWN0b3IobmV3IFR5cGVbXSB7IH0pLkludm9rZShuZXcgb2JqZWN0WzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZC5pbWFnZSA9IGltYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNrLkFkZChjYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdoaWxlIChmYWxzZSk7XHJcbiAgICAgICAgICAgIFNodWZmbGVEZWNrKCk7XHJcbiAgICAgICAgICAgIHBsYXllcnMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllcj4pKHBsYXllciA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IDE7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9wQ2FyZCA9IFRvcENhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWNrLlJlbW92ZSh0b3BDYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuSGFuZC5BZGQodG9wQ2FyZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcGxheWVyc1t0dXJuSWR4XS5PblR1cm5TdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIENhcmQgVG9wQ2FyZCgpIHtyZXR1cm4gZGVjay5jYXJkc1swXTt9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgdHVybklkeDtcclxuICAgICAgICBSYW5kb20gcm5kID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZvaWQgU2h1ZmZsZURlY2sgKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBpbnQgbiA9IGRlY2suY2FyZHMuQ291bnQ7XHJcbiAgICAgICAgICAgIHdoaWxlIChuID4gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbi0tO1xyXG4gICAgICAgICAgICAgICAgaW50IGsgPSBybmQuTmV4dChuICsgMSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBkZWNrLmNhcmRzW2tdO1xyXG4gICAgICAgICAgICAgICAgZGVjay5jYXJkc1trXSA9IGRlY2suY2FyZHNbbl07XHJcbiAgICAgICAgICAgICAgICBkZWNrLmNhcmRzW25dID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlMkQgcmVjdGFuZ2xlO1xyXG4gICAgICAgIHB1YmxpYyBEZWNrIGRlY2s7XHJcbiAgICAgICAgcHVibGljIExvY2FsUGxheWVyIHVpO1xyXG4gICAgICAgIHB1YmxpYyBTcHJpdGVGb250IGZvbnQsIGNob2ljZUZvbnQ7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVW5sb2FkQ29udGVudCB3aWxsIGJlIGNhbGxlZCBvbmNlIHBlciBnYW1lIGFuZCBpcyB0aGUgcGxhY2UgdG8gdW5sb2FkXHJcbiAgICAgICAgLy8vIGdhbWUtc3BlY2lmaWMgY29udGVudC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFVubG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogVW5sb2FkIGFueSBub24gQ29udGVudE1hbmFnZXIgY29udGVudCBoZXJlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBydW4gbG9naWMgc3VjaCBhcyB1cGRhdGluZyB0aGUgd29ybGQsXHJcbiAgICAgICAgLy8vIGNoZWNraW5nIGZvciBjb2xsaXNpb25zLCBnYXRoZXJpbmcgaW5wdXQsIGFuZCBwbGF5aW5nIGF1ZGlvLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZ2FtZVRpbWVcIj5Qcm92aWRlcyBhIHNuYXBzaG90IG9mIHRpbWluZyB2YWx1ZXMuPC9wYXJhbT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBBZGQgeW91ciB1cGRhdGUgbG9naWMgaGVyZVxyXG4gICAgICAgICAgICBib29sIF9ob2xkaW5nRG93biA9IE1vdXNlLkdldFN0YXRlKCkuTGVmdEJ1dHRvbiA9PSBCdXR0b25TdGF0ZS5QcmVzc2VkO1xyXG4gICAgICAgICAgICBMYXN0TW91c2VEb3duID0gX2hvbGRpbmdEb3duICYmICFob2xkaW5nRG93bjtcclxuICAgICAgICAgICAgaG9sZGluZ0Rvd24gPSBfaG9sZGluZ0Rvd247XHJcbiAgICAgICAgICAgIGlmICh3b24gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHVpLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBiYXNlLlVwZGF0ZShnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBMYXN0TW91c2VEb3duO1xyXG4gICAgICAgIGJvb2wgaG9sZGluZ0Rvd247XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhpcyBpcyBjYWxsZWQgd2hlbiB0aGUgZ2FtZSBzaG91bGQgZHJhdyBpdHNlbGYuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJnYW1lVGltZVwiPlByb3ZpZGVzIGEgc25hcHNob3Qgb2YgdGltaW5nIHZhbHVlcy48L3BhcmFtPlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIERyYXcoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHcmFwaGljc0RldmljZS5DbGVhcihDb2xvci5Db3JuZmxvd2VyQmx1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBBZGQgeW91ciBkcmF3aW5nIGNvZGUgaGVyZVxyXG5cclxuI2lmIFdJTkRPV1NcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guQmVnaW4oYmxlbmRTdGF0ZTogQmxlbmRTdGF0ZS5BbHBoYUJsZW5kKTtcclxuI2Vsc2VcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guQmVnaW4oKTtcclxuI2VuZGlmXHJcbiAgICAgICAgICAgIGlmICh3b24gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHVpLkRyYXcoKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgdGV4dCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0gaGFzIHdvbi5cIix3b24uR2V0VHlwZSgpLk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lYXN1cmUgPSBmb250Lk1lYXN1cmVTdHJpbmcodGV4dCk7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3U3RyaW5nKGZvbnQsIHRleHQsIG5ldyBWZWN0b3IyKHk6IChHcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLSBtZWFzdXJlLlkpIC8gMiwgeDogKEdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC0gbWVhc3VyZS5YKSAvIDIpLCBDb2xvci5SZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkVuZCgpO1xyXG5cclxuICAgICAgICAgICAgYmFzZS5EcmF3KGdhbWVUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUG9pbnRlcjxUPlxyXG4gICAge1xyXG4gICAgICAgIFQgdmFsdWU7XHJcbiAgICAgICAgcHVibGljIFBvaW50ZXIgKFQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRWYWx1ZShUIHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZTt9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgVCAoUG9pbnRlcjxUPiB2YWx1ZSkge3JldHVybiB2YWx1ZS52YWx1ZTt9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIG9wZXJhdG9yIH4gKFBvaW50ZXI8VD4gdmFsdWUpIHtyZXR1cm4gdmFsdWUudmFsdWU7fVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFByb2dyYW1cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1c2luZyAodmFyIGdhbWUgPSBuZXcgTG92ZUxldHRlckdhbWUoKSlcclxuICAgICAgICAgICAgICAgIGdhbWUuUnVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIFN5c3RlbS5Db2xsZWN0aW9uc1xyXG57XHJcbiAgICBpbnRlcm5hbCBzdGF0aWMgY2xhc3MgX0hhc2hIZWxwZXJzXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBJbnQzMiBIYXNoUHJpbWUgPSAxMDE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaW50W10gcHJpbWVzID0ge1xyXG4gICAgICAgICAgICAzLCA3LCAxMSwgMTcsIDIzLCAyOSwgMzcsIDQ3LCA1OSwgNzEsIDg5LCAxMDcsIDEzMSwgMTYzLCAxOTcsIDIzOSwgMjkzLCAzNTMsIDQzMSwgNTIxLCA2MzEsIDc2MSwgOTE5LFxyXG4gICAgICAgICAgICAxMTAzLCAxMzI3LCAxNTk3LCAxOTMxLCAyMzMzLCAyODAxLCAzMzcxLCA0MDQ5LCA0ODYxLCA1ODM5LCA3MDEzLCA4NDE5LCAxMDEwMywgMTIxNDMsIDE0NTkxLFxyXG4gICAgICAgICAgICAxNzUxOSwgMjEwMjMsIDI1MjI5LCAzMDI5MywgMzYzNTMsIDQzNjI3LCA1MjM2MSwgNjI4NTEsIDc1NDMxLCA5MDUyMywgMTA4NjMxLCAxMzAzNjMsIDE1NjQzNyxcclxuICAgICAgICAgICAgMTg3NzUxLCAyMjUzMDcsIDI3MDM3MSwgMzI0NDQ5LCAzODkzNTcsIDQ2NzIzNywgNTYwNjg5LCA2NzI4MjcsIDgwNzQwMywgOTY4ODk3LCAxMTYyNjg3LCAxMzk1MjYzLFxyXG4gICAgICAgICAgICAxNjc0MzE5LCAyMDA5MTkxLCAyNDExMDMzLCAyODkzMjQ5LCAzNDcxODk5LCA0MTY2Mjg3LCA0OTk5NTU5LCA1OTk5NDcxLCA3MTk5MzY5IH07XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJc1ByaW1lKGludCBjYW5kaWRhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoKGNhbmRpZGF0ZSAmIDEpICE9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBsaW1pdCA9IChpbnQpTWF0aC5TcXJ0KGNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBkaXZpc29yID0gMzsgZGl2aXNvciA8PSBsaW1pdDsgZGl2aXNvciArPSAyKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoY2FuZGlkYXRlICUgZGl2aXNvcikgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChjYW5kaWRhdGUgPT0gMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBHZXRQcmltZShpbnQgbWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1pbiA8IDApXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oXCJIYXNodGFibGUncyBjYXBhY2l0eSBvdmVyZmxvd2VkIGFuZCB3ZW50IG5lZ2F0aXZlLiBDaGVjayBsb2FkIGZhY3RvciwgY2FwYWNpdHkgYW5kIHRoZSBjdXJyZW50IHNpemUgb2YgdGhlIHRhYmxlLlwiKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcmltZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBwcmltZSA9IHByaW1lc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChwcmltZSA+PSBtaW4pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAobWluIHwgMSk7IGkgPCBJbnQzMi5NYXhWYWx1ZTsgaSArPSAyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSXNQcmltZShpKSAmJiAoKGkgLSAxKSAlIEhhc2hQcmltZSAhPSAwKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWluO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgR2V0TWluUHJpbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByaW1lc1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEV4cGFuZFByaW1lKGludCBvbGRTaXplKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IG5ld1NpemUgPSAyICogb2xkU2l6ZTtcclxuICAgICAgICAgICAgaWYgKCh1aW50KW5ld1NpemUgPiBNYXhQcmltZUFycmF5TGVuZ3RoICYmIE1heFByaW1lQXJyYXlMZW5ndGggPiBvbGRTaXplKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF4UHJpbWVBcnJheUxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gR2V0UHJpbWUobmV3U2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IE1heFByaW1lQXJyYXlMZW5ndGggPSAweDdGRUZGRkZEO1xyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBSVBsYXllciA6IFBsYXllclxyXG4gICAge1xyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSBDUzE5OTggLy8gQXN5bmMgbWV0aG9kIGxhY2tzICdhd2FpdCcgb3BlcmF0b3JzIGFuZCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XHJcbiAgICAgICAgcHVibGljIGFzeW5jIG92ZXJyaWRlIFRhc2s8VGV4dHVyZTJEPiBUYXJnZXRDYXJkKClcclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgQ1MxOTk4IC8vIEFzeW5jIG1ldGhvZCBsYWNrcyAnYXdhaXQnIG9wZXJhdG9ycyBhbmQgd2lsbCBydW4gc3luY2hyb25vdXNseVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuY2FyZEltYWdlc1szXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIEFJUGxheWVyKEhhbmRHYW1lIEdhbWUpIDogYmFzZShHYW1lKSB7IH1cclxuXHJcbiNwcmFnbWEgd2FybmluZyBkaXNhYmxlIENTMTk5OCAvLyBBc3luYyBtZXRob2QgbGFja3MgJ2F3YWl0JyBvcGVyYXRvcnMgYW5kIHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBMb29rQXRDYXJkcyhSZWFsQ2FyZFBvb2wgY2FyZFBvb2wpIHsgfVxyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSBDUzE5OTggLy8gQXN5bmMgbWV0aG9kIGxhY2tzICdhd2FpdCcgb3BlcmF0b3JzIGFuZCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyB2b2lkIE9uVHVyblN0YXJ0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuT25UdXJuU3RhcnQoKTtcclxuICAgICAgICAgICAgYXdhaXQgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5PcmRlckJ5PGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQsaW50PihIYW5kLmNhcmRzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQsIGludD4pKHYgPT4gKChDYXJkcy5Mb3ZlTGV0dGVyQ2FyZCl2KS5WYWx1ZSkpLlRvTGlzdCgpWzBdLlBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2s8UGxheWVyPiBUYXJnZXRQbGF5ZXIoKSB7cmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuT3JkZXJCeTxnbG9iYWw6OkhhbmRHYW1lcy5QbGF5ZXIsYm9vbD4oICAgICAgICAgICAgR2FtZS5wbGF5ZXJzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllciwgYm9vbD4pKHYgPT4gdi5Jc0hhbmRtYWlkZWQpKS5UaGVuQnk8Ym9vbD4oKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuUGxheWVyLCBib29sPikodiA9PiB2IGlzIEFJUGxheWVyKSkuVG9MaXN0KClbMF07fVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXMuQ2FyZHNcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIExvdmVMZXR0ZXJDYXJkIDogQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBpbnQgVmFsdWUgeyBnZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgUGxheSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gKChIYW5kKUBpbikucGxheWVyO1xyXG4gICAgICAgICAgICBhd2FpdCBiYXNlLlBsYXkoKTtcclxuICAgICAgICAgICAgYXdhaXQgcGxheWVyLkVuZFR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lc1xyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgUmVhbENhcmRQb29sIDogQ2FyZFBvb2xcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdDxDYXJkPiBjYXJkcyA9IG5ldyBMaXN0PENhcmQ+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWFsQ2FyZFBvb2woSGFuZEdhbWUgZ2FtZSkgOiBiYXNlKGdhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgQWRkKENhcmQgY2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhcmQuQGluID0gdGhpcztcclxuICAgICAgICAgICAgY2FyZHMuQWRkKGNhcmQpO1xyXG4gICAgICAgICAgICBiYXNlLkFkZChjYXJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgUmVtb3ZlKENhcmQgY2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhcmQuQGluID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKCFjYXJkcy5SZW1vdmUoY2FyZCkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJ7MH0gaXMgbm90IGluIGNvbGxlY3Rpb24uXCIsY2FyZCkpO1xyXG4gICAgICAgICAgICBiYXNlLlJlbW92ZShjYXJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgQ29udGFpbnMoQ2FyZCBjYXJkKSB7cmV0dXJuIGNhcmRzLkNvbnRhaW5zKGNhcmQpO31cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQ7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBMb2NhbFBsYXllciA6IFBsYXllclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE9uVHVyblN0YXJ0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuT25UdXJuU3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgW0ZsYWdzXVxyXG4gICAgICAgIHByaXZhdGUgZW51bSBBbGVydFNjcmVlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hvb3NlQVBsYXllciA9IDEsXHJcbiAgICAgICAgICAgIE5hbWVBQ2FyZCA9IDIsXHJcbiAgICAgICAgICAgIFZpZXdDYXJkcyA9IDZcclxuICAgICAgICB9XHJcbiAgICAgICAgQWxlcnRTY3JlZW4/IEN1cnJlbnRBbGVydFNjcmVlbjtcclxuXHJcbiAgICAgICAgcHVibGljIExvY2FsUGxheWVyKEhhbmRHYW1lIEdhbWUpIDogYmFzZShHYW1lKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2s8UGxheWVyPiBUYXJnZXRQbGF5ZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudEFsZXJ0U2NyZWVuID0gQWxlcnRTY3JlZW4uQ2hvb3NlQVBsYXllcjtcclxuICAgICAgICAgICAgUGxheWVyIHIgPSBhd2FpdCAodGFyZ2V0UGxheWVyID0gbmV3IFRhc2tDb21wbGV0aW9uU291cmNlPFBsYXllcj4oKSkuVGFzaztcclxuICAgICAgICAgICAgdGFyZ2V0UGxheWVyID0gbnVsbDtcclxuICAgICAgICAgICAgQ3VycmVudEFsZXJ0U2NyZWVuID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYXNrQ29tcGxldGlvblNvdXJjZTxQbGF5ZXI+IHRhcmdldFBsYXllcjtcclxuICAgICAgICBUYXNrQ29tcGxldGlvblNvdXJjZTxUZXh0dXJlMkQ+IHRhcmdldENhcmQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IERpY3Rpb25hcnk8QWxlcnRTY3JlZW4sIHN0cmluZz4gbWVzc2FnZXMgPSBCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8QWxlcnRTY3JlZW4sIHN0cmluZz4oKSwoX28xKT0+e19vMS5BZGQoQWxlcnRTY3JlZW4uTmFtZUFDYXJkLFwiQ2hvb3NlIGEgY2FyZFwiKTtfbzEuQWRkKEFsZXJ0U2NyZWVuLkNob29zZUFQbGF5ZXIsXCJDaG9vc2UgYSBwbGF5ZXJcIik7X28xLkFkZChBbGVydFNjcmVlbi5WaWV3Q2FyZHMsXCJZb3UgaGF2ZSAyIHNlY29uZHMgdG8gbG9vayBhdCB0aGVzZSBjYXJkcy5cIik7cmV0dXJuIF9vMTt9KTtcclxuXHJcbiAgICAgICAgcHVibGljIGFzeW5jIG92ZXJyaWRlIFRhc2s8VGV4dHVyZTJEPiBUYXJnZXRDYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEN1cnJlbnRBbGVydFNjcmVlbiA9IEFsZXJ0U2NyZWVuLk5hbWVBQ2FyZDtcclxuICAgICAgICAgICAgY2FyZHNUb0RyYXcgPSBHYW1lLmNhcmRJbWFnZXMuR2V0UmFuZ2UoMSwgR2FtZS5jYXJkSW1hZ2VzLkNvdW50IC0gMSk7XHJcbiAgICAgICAgICAgIHZhciByID0gYXdhaXQgKHRhcmdldENhcmQgPSBuZXcgVGFza0NvbXBsZXRpb25Tb3VyY2U8VGV4dHVyZTJEPigpKS5UYXNrO1xyXG4gICAgICAgICAgICB0YXJnZXRDYXJkID0gbnVsbDtcclxuICAgICAgICAgICAgQ3VycmVudEFsZXJ0U2NyZWVuID0gbnVsbDtcclxuICAgICAgICAgICAgY2FyZHNUb0RyYXcgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhc3luYyB2b2lkIFVwZGF0ZSAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKEdhbWUucGxheWVyc1tHYW1lLnR1cm5JZHhdICE9IHRoaXMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChDdXJyZW50QWxlcnRTY3JlZW4gPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNhcmQgaW4gSGFuZC5jYXJkcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBNb3VzZVN0YXRlIG1vdXNlU3RhdGUgPSBNb3VzZS5HZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChIYW5kLkdldERyYXdpbmdQb3NpdGlvbihjYXJkKS5EcmF3UG9zaXRpb24uQ29udGFpbnMobW91c2VTdGF0ZS5Qb3NpdGlvbikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUdhbWUuTGFzdE1vdXNlRG93bilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQuSGlnaGxpZ2h0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGNhcmQuUGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkLkhpZ2hsaWdodGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBNb3VzZS5HZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChDdXJyZW50QWxlcnRTY3JlZW4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBbGVydFNjcmVlbi5DaG9vc2VBUGxheWVyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZS5MYXN0TW91c2VEb3duKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHBsYXllciBpbiBHYW1lLnBsYXllcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllci5Jc0hhbmRtYWlkZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHZXRMb2NhdGlvbk9mKHBsYXllcikuQ29udGFpbnMoc3RhdGUuWCwgc3RhdGUuWSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyICE9IG51bGwgJiYgIXRhcmdldFBsYXllci5UYXNrLklzQ29tcGxldGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGxheWVyLlNldFJlc3VsdChwbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQWxlcnRTY3JlZW4uTmFtZUFDYXJkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBuID0gMDsgbiA8IEdhbWUuY2FyZEltYWdlcy5Db3VudDsgbisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9nZXRDYXJkUG9zaXRpb24obikuQ29udGFpbnMoc3RhdGUuWCwgc3RhdGUuWSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLkxlZnRCdXR0b24gPT0gQnV0dG9uU3RhdGUuUHJlc3NlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHYW1lLmNhcmRJbWFnZXNbbl0gIT0gbnVsbCAmJiAhdGFyZ2V0Q2FyZC5UYXNrLklzQ29tcGxldGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2FyZC5TZXRSZXN1bHQoR2FtZS5jYXJkSW1hZ2VzW25dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IERpY3Rpb25hcnk8QWxlcnRTY3JlZW4sIEFjdGlvbjxMb2NhbFBsYXllcj4+IGhpZ2hsaWdodHMgPSBCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8QWxlcnRTY3JlZW4sIEFjdGlvbjxMb2NhbFBsYXllcj4+KCksKF9vMik9PntfbzIuQWRkKEFsZXJ0U2NyZWVuLkNob29zZUFQbGF5ZXIsQHRoaXMgPT4gQHRoaXMuRHJhd1BsYXllcnMoKSk7X28yLkFkZChBbGVydFNjcmVlbi5OYW1lQUNhcmQsQHRoaXMgPT4gQHRoaXMuRHJhd0NhcmRzKCkpO3JldHVybiBfbzI7fSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLmNhcmRiYWNrLCBuZXcgUmVjdGFuZ2xlKEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuV2lkdGggLSAxNTAgLSBEZWNrLmNhcmRXaWR0aCAtIDIwLCBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAtIERlY2suY2FyZEhlaWdodCwgRGVjay5jYXJkV2lkdGgsIERlY2suY2FyZEhlaWdodCksIENvbG9yLldoZWF0KTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNhcmQgaW4gbmV3IExpc3Q8Q2FyZD4oR2FtZS5kaXNjYXJkUGlsZS5jYXJkcykpXHJcbiAgICAgICAgICAgICAgICBjYXJkLkRyYXcoKTtcclxuICAgICAgICAgICAgRHJhd0hhbmRzKCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBydW4gaW4gaGlnaGxpZ2h0cylcclxuICAgICAgICAgICAgICAgIGlmICgocnVuLktleSB8IEN1cnJlbnRBbGVydFNjcmVlbikgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICBydW4uVmFsdWUodGhpcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoQ3VycmVudEFsZXJ0U2NyZWVuICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZyBkaXNwbGF5ZWRUZXh0ID0gbWVzc2FnZXNbKEFsZXJ0U2NyZWVuKUN1cnJlbnRBbGVydFNjcmVlbl07XHJcbiAgICAgICAgICAgICAgICBHYW1lLnNwcml0ZUJhdGNoLkRyYXcoR2FtZS5yZWN0YW5nbGUsIEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuQm91bmRzLCBuZXcgQ29sb3IoQ29sb3IuQmxhY2ssIC45ZikpO1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMiB0ZXh0TWV0cmljcyA9IEdhbWUuY2hvaWNlRm9udC5NZWFzdXJlU3RyaW5nKGRpc3BsYXllZFRleHQpO1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMiB0ZXh0TG9jID0gLSB0ZXh0TWV0cmljcyAvIDI7XHJcbiAgICAgICAgICAgICAgICBHYW1lLnNwcml0ZUJhdGNoLkRyYXcoR2FtZS5yZWN0YW5nbGUsIG5ldyBSZWN0YW5nbGUodGV4dExvYy5Ub1BvaW50KCkgKyAoR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5Cb3VuZHMuU2l6ZS5Ub1ZlY3RvcjIoKSAvIDIpLlRvUG9pbnQoKSwgdGV4dE1ldHJpY3MuVG9Qb2ludCgpKSwgQ29sb3IuQmx1ZVZpb2xldCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lLnNwcml0ZUJhdGNoLkRyYXdTdHJpbmcoR2FtZS5jaG9pY2VGb250LCBkaXNwbGF5ZWRUZXh0LCB0ZXh0TG9jICsgR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5Cb3VuZHMuU2l6ZS5Ub1ZlY3RvcjIoKSAvIDIsIENvbG9yLkJsYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgcnVuIGluIGhpZ2hsaWdodHMpXHJcbiAgICAgICAgICAgICAgICBpZiAoKHJ1bi5LZXkgfCBDdXJyZW50QWxlcnRTY3JlZW4pICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuLlZhbHVlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBEcmF3SGFuZHMgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IG4gPSAwOyBuIDwgR2FtZS5wbGF5ZXJzLkNvdW50OyBuKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBHYW1lLnBsYXllcnNbbl07XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgY2FyZCBpbiBuZXcgTGlzdDxDYXJkPihwbGF5ZXIuSGFuZC5jYXJkcykpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZC5EcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgRHJhd1BsYXllcnMgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IG4gPSAwOyBuIDwgR2FtZS5wbGF5ZXJzLkNvdW50OyBuKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBHYW1lLnBsYXllcnNbbl07XHJcbiAgICAgICAgICAgICAgICB1aW50IGNvbG9yID0gKHVpbnQpKDB4ZmYgPDwgKG4gPDwgMykpICsgMHhmZjAwMDAwMDtcclxuICAgICAgICAgICAgICAgIFJlY3RhbmdsZSByID0gR2V0TG9jYXRpb25PZihwbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEdhbWUucmVjdGFuZ2xlLCByLCBuZXcgQ29sb3IoY29sb3IpKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIubG9zdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLnNwcml0ZUJhdGNoLkRyYXcoR2FtZS5yZWN0YW5nbGUsIHIsIG5ldyBDb2xvcihDb2xvci5CbGFjaywgLjVmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEdhbWUucmVjdGFuZ2xlLCBuZXcgUmVjdGFuZ2xlKHIuTG9jYXRpb24gKyBuZXcgUG9pbnQoMzUpLCBuZXcgUG9pbnQoMzApKSwgQ29sb3IuUmVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBsYXllci5Jc0hhbmRtYWlkZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEdhbWUucmVjdGFuZ2xlLCBuZXcgUmVjdGFuZ2xlKHIuTG9jYXRpb24gKyBuZXcgUG9pbnQoMzUpLCBuZXcgUG9pbnQoMzApKSwgQ29sb3IuQmx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChHYW1lLnBsYXllcnNbR2FtZS50dXJuSWR4XSAhPSBwbGF5ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEdhbWUucmVjdGFuZ2xlLCByLCBuZXcgQ29sb3IoQ29sb3IuV2hpdGUsIC4yNWYpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUmVjdGFuZ2xlIF9nZXRDYXJkUG9zaXRpb24oaW50IGluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgaW50IGNhcmRXaWR0aCA9IEhhbmQuY2FyZFdpZHRoLCBjYXJkSGVpZ2h0ID0gSGFuZC5jYXJkSGVpZ2h0O1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC8gMiAtIGNhcmRzVG9EcmF3LkNvdW50ICogY2FyZFdpZHRoIC8gMiArIGluZGV4ICogY2FyZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC0gY2FyZEhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBjYXJkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZEhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBMaXN0PFRleHR1cmUyRD4gY2FyZHNUb0RyYXc7XHJcblxyXG4gICAgICAgIHZvaWQgRHJhd0NhcmRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChDdXJyZW50QWxlcnRTY3JlZW4gPT0gQWxlcnRTY3JlZW4uTmFtZUFDYXJkIHx8IEN1cnJlbnRBbGVydFNjcmVlbiA9PSBBbGVydFNjcmVlbi5WaWV3Q2FyZHMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBuID0gMDsgbiA8IGNhcmRzVG9EcmF3LkNvdW50OyBuKyspXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5zcHJpdGVCYXRjaC5EcmF3KGNhcmRzVG9EcmF3W25dLCBfZ2V0Q2FyZFBvc2l0aW9uKG4pLCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBSZWN0YW5nbGUgR2V0TG9jYXRpb25PZiAoUGxheWVyIHBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBpbmRleCA9ICgoR2FtZS5wbGF5ZXJzLkluZGV4T2YocGxheWVyKSAqIDQgLyBHYW1lLnBsYXllcnMuQ291bnQgKyAoMiAvIEdhbWUucGxheWVycy5Db3VudCkpICsgMikgJSA0O1xyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IG5ldyBQb2ludCgxMDAsIDEwMCk7XHJcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IG5ldyBQb2ludChcclxuICAgICAgICAgICAgICAgIChHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoICAtIHNpemUuWCkgKiAoaW5kZXggJSAyKSxcclxuICAgICAgICAgICAgICAgIChHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAtIHNpemUuWSkgKiAoaW5kZXggLyAyKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHBvc2l0aW9uLCBzaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrIExvb2tBdENhcmRzKFJlYWxDYXJkUG9vbCBjYXJkUG9vbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhcmRzVG9EcmF3ID0gY2FyZFBvb2wuY2FyZHMuQ29udmVydEFsbDxnbG9iYWw6Ok1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzLlRleHR1cmUyRD4oKGdsb2JhbDo6U3lzdGVtLkNvbnZlcnRlcjxnbG9iYWw6OkhhbmRHYW1lcy5DYXJkLCBnbG9iYWw6Ok1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzLlRleHR1cmUyRD4pKHYgPT4gdi5pbWFnZSkpO1xyXG4gICAgICAgICAgICBDdXJyZW50QWxlcnRTY3JlZW4gPSBBbGVydFNjcmVlbi5WaWV3Q2FyZHM7XHJcbiAgICAgICAgICAgIGF3YWl0IFRhc2suRGVsYXkoMjAwMCk7XHJcbiAgICAgICAgICAgIEN1cnJlbnRBbGVydFNjcmVlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIGNhcmRzVG9EcmF3ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gQSBnYW1lIG9mIGxvdmUgbGV0dGVyLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBMb3ZlTGV0dGVyR2FtZSA6IEhhbmRHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBDb250ZW50Rm9sZGVyTmFtZSB7Z2V0e3JldHVybiBcIkxvdmUgTGV0dGVyXCI7fX1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGVcclxuI2lmIFdJTkRPV1NcclxuICAgICAgICAgICAgRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZW5kaWZcclxuICAgICAgICAgICAgPHN0cmluZywgaW50PiBjYXJkcyB7Z2V0e3JldHVybiBCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3XHJcbiNpZiBXSU5ET1dTXHJcbiAgICAgICAgICAgIERpY3Rpb25hcnlcclxuI2Vsc2VcclxuICAgICAgICAgICAgX0RpY3Rpb25hcnlcclxuI2VuZGlmXHJcbiAgICAgICAgICAgIDxzdHJpbmcsIGludD4oKSwoX28zKT0+e19vMy5BZGQoXCJHdWFyZFwiLDUpO19vMy5BZGQoXCJQcmllc3RcIiwyKTtfbzMuQWRkKFwiQmFyb25cIiwyKTtfbzMuQWRkKFwiSGFuZG1haWRcIiwyKTtfbzMuQWRkKFwiUHJpbmNlXCIsMik7X28zLkFkZChcIktpbmdcIiwxKTtfbzMuQWRkKFwiQ291bnRlc3NcIiwxKTtfbzMuQWRkKFwiUHJpbmNlc3NcIiwxKTtyZXR1cm4gX28zO30pO319XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lcy5DYXJkc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmFyb25DYXJkIDogTG92ZUxldHRlckNhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IFZhbHVlIHtnZXR7cmV0dXJuIDM7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgT25QbGF5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllclxyXG4gICAgICAgICAgICAgICAgbWUgPSAoKEhhbmQpQGluKS5wbGF5ZXI7XHJcbiAgICAgICAgICAgIHZhciBvdGhlciA9IGF3YWl0ICgoSGFuZClAaW4pLnBsYXllci5UYXJnZXRQbGF5ZXIoKTsgLy9Xb3JrYXJvdW5kIGZvciAjMjkzMVxyXG4gICAgICAgICAgICBhd2FpdCBtZS5Mb29rQXRDYXJkcyhvdGhlci5IYW5kKTtcclxuICAgICAgICAgICAgYXdhaXQgb3RoZXIuTG9va0F0Q2FyZHMobWUuSGFuZCk7XHJcbiAgICAgICAgICAgIHZhciBhQ29tcGFyZSA9ICgoTG92ZUxldHRlckNhcmQpKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Z2xvYmFsOjpIYW5kR2FtZXMuQ2FyZD4ob3RoZXIuSGFuZC5jYXJkcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkhhbmRHYW1lcy5DYXJkLCBib29sPikodiA9PiB2ICE9IHRoaXMpKSkpLlZhbHVlO1xyXG4gICAgICAgICAgICB2YXIgYkNvbXBhcmUgPSAoKExvdmVMZXR0ZXJDYXJkKShTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQ+KG1lLkhhbmQuY2FyZHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuQ2FyZCwgYm9vbD4pKHYgPT4gdiAhPSB0aGlzKSkpKS5WYWx1ZTsgLy9Xb3JrYXJvdW5kIGZvciAjMjkxOC5cclxuICAgICAgICAgICAgc3dpdGNoIChhQ29tcGFyZS5Db21wYXJlVG8oYkNvbXBhcmUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIC0xOiAvLyBHb29kIGZvciBtZVxyXG4gICAgICAgICAgICAgICAgICAgIG90aGVyLkxvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTogLy8gQmFkIGZvciBtZVxyXG4gICAgICAgICAgICAgICAgICAgIG1lLkxvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzLkNhcmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDb3VudGVzc0NhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gNzt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lcy5DYXJkc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR3VhcmRDYXJkIDogTG92ZUxldHRlckNhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IFZhbHVlIHtnZXR7cmV0dXJuIDE7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgT25QbGF5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBhd2FpdCAoKEhhbmQpQGluKS5wbGF5ZXIuVGFyZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXR0ZWRDYXJkID0gYXdhaXQgKChIYW5kKUBpbikucGxheWVyLlRhcmdldENhcmQoKTsgLy9Xb3JrYXJvdW5kIGZvciAjMjkxOC5cclxuICAgICAgICAgICAgaWYgKHBsYXllci5IYW5kLmNhcmRzWzBdLmltYWdlID09IHRhcmdldHRlZENhcmQpXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuTG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzLkNhcmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIYW5kbWFpZENhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gNDt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgKChIYW5kKUBpbikucGxheWVyLklzSGFuZG1haWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXMuQ2FyZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEtpbmdDYXJkIDogTG92ZUxldHRlckNhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IFZhbHVlIHtnZXR7cmV0dXJuIDY7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgT25QbGF5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9ICgoSGFuZClAaW4pLnBsYXllcjtcclxuICAgICAgICAgICAgdmFyIG90aGVyID0gYXdhaXQgbWUuVGFyZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IG1lLkhhbmQuY2FyZHNbMF0uTW92ZUNhcmRUbyhvdGhlci5IYW5kKTtcclxuICAgICAgICAgICAgYXdhaXQgb3RoZXIuSGFuZC5jYXJkc1swXS5Nb3ZlQ2FyZFRvKG1lLkhhbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lcy5DYXJkc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJpZXN0Q2FyZCA6IExvdmVMZXR0ZXJDYXJkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBWYWx1ZSB7Z2V0e3JldHVybiAyO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrIE9uUGxheSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhd2FpdCAoKEhhbmQpQGluKS5wbGF5ZXIuTG9va0F0Q2FyZHMoKGF3YWl0ICgoSGFuZClAaW4pLnBsYXllci5UYXJnZXRQbGF5ZXIoKSkuSGFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXMuQ2FyZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFByaW5jZUNhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gNTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIEBpbiA9IChhd2FpdCAoKEhhbmQpdGhpcy5AaW4pLnBsYXllci5UYXJnZXRQbGF5ZXIoKSkuSGFuZDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHYgaW4gKChIYW5kKUBpbikuY2FyZHMpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB2Lk1vdmVDYXJkVG8oQGluLkdhbWUuZGlzY2FyZFBpbGUpO1xyXG4gICAgICAgICAgICBhd2FpdCBAaW4uR2FtZS5Ub3BDYXJkKCkuTW92ZUNhcmRUbyhAaW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzLkNhcmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcmluY2Vzc0NhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gODt9fVxyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgQ1MxOTk4IC8vIEFzeW5jIG1ldGhvZCBsYWNrcyAnYXdhaXQnIG9wZXJhdG9ycyBhbmQgd2lsbCBydW4gc3luY2hyb25vdXNseVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrIE9uRGlzY2FyZCgpXHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIENTMTk5OCAvLyBBc3luYyBtZXRob2QgbGFja3MgJ2F3YWl0JyBvcGVyYXRvcnMgYW5kIHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICgoSGFuZClAaW4pLnBsYXllci5Mb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERlY2sgOiBSZWFsQ2FyZFBvb2xcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRXaWR0aCA9IDE1MDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRIZWlnaHQgPSAyMDk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEZWNrKEhhbmRHYW1lIGdhbWUpIDogYmFzZShnYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBEcmF3SW5mbyBHZXREcmF3aW5nUG9zaXRpb24oQ2FyZCBjYXJkKSB7cmV0dXJuIG5ldyBEcmF3SW5mb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1Bvc2l0aW9uID0gbmV3IFJlY3RhbmdsZShHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC0gMTUwIC0gY2FyZFdpZHRoIC0gMjAsIEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC0gY2FyZEhlaWdodCwgY2FyZFdpZHRoLCBjYXJkSGVpZ2h0KSxcclxuICAgICAgICAgICAgUGVybWlzc2lvbnMgPSBEcmF3SW5mby5EcmF3UGVybWlzc2lvbi5BbmltYXRhYmxlXHJcbiAgICAgICAgfTt9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERpc2NhcmRQaWxlIDogUmVhbENhcmRQb29sXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIERpc2NhcmRQaWxlKEhhbmRHYW1lIGdhbWUpIDogYmFzZShnYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgY2FyZFdpZHRoID0gSGFuZC5jYXJkV2lkdGggLyAyO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgY2FyZEhlaWdodCA9IEhhbmQuY2FyZEhlaWdodCAvIDI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBEcmF3SW5mbyBHZXREcmF3aW5nUG9zaXRpb24oQ2FyZCBjYXJkKSB7cmV0dXJuIG5ldyBEcmF3SW5mb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3UG9zaXRpb24gPSBuZXcgUmVjdGFuZ2xlKEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuV2lkdGggLSAxMDAgLSBjYXJkV2lkdGggLSAxMCwgKEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC0gY2FyZEhlaWdodCkgLyAyLCBjYXJkV2lkdGgsIGNhcmRIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgUGVybWlzc2lvbnMgPSBjYXJkc1tjYXJkcy5Db3VudCAtIDFdID09IGNhcmQgPyBEcmF3SW5mby5EcmF3UGVybWlzc2lvbi5EcmF3YWJsZSA6IERyYXdJbmZvLkRyYXdQZXJtaXNzaW9uLkFuaW1hdGFibGVcclxuICAgICAgICAgICAgfTt9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhhbmQgOiBSZWFsQ2FyZFBvb2xcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRXaWR0aCA9IDE1MDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRIZWlnaHQgPSAyMDk7XHJcbiAgICAgICAgcHVibGljIFBsYXllciBwbGF5ZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYW5kKEhhbmRHYW1lIGdhbWUsIFBsYXllciBwbGF5ZXIpIDogYmFzZShnYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgRHJhd0luZm8gR2V0RHJhd2luZ1Bvc2l0aW9uKENhcmQgY2FyZCkge3JldHVybiBuZXcgRHJhd0luZm9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd1Bvc2l0aW9uID0gbmV3IFJlY3RhbmdsZShcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC8gMiAtIGNhcmRzLkNvdW50ICogY2FyZFdpZHRoIC8gMiArIGNhcmRzLkluZGV4T2YoY2FyZCkgKiBjYXJkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgKEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC0gY2FyZEhlaWdodCkgKiAoKCgoR2FtZS5wbGF5ZXJzLkluZGV4T2YocGxheWVyKSAqIDQgLyBHYW1lLnBsYXllcnMuQ291bnQgKyAoMiAvIEdhbWUucGxheWVycy5Db3VudCkpICsgMikgJSA0KSAvIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBjYXJkSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIFBlcm1pc3Npb25zID0gRHJhd0luZm8uRHJhd1Blcm1pc3Npb24uRHJhd2FibGUsXHJcbiAgICAgICAgICAgICAgICBTaG93Q2FyZEJhY2sgPSBHYW1lLnVpICE9IHBsYXllclxyXG4gICAgICAgICAgICB9O31cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
