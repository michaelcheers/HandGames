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
                                        if (System.Linq.Enumerable.from(this.Game.players).all($asm.$.HandGames.Player.f2)) {
                                            Bridge.global.alert("All players lost.");
                                            $tcs.setResult(null);
                                            return;
                                        }
                                        do {
                                            player = this.Game.players.getItem(($t = (((this.Game.players.indexOf(this) + 1) | 0)) % this.Game.players.Count, this.Game.turnIdx = $t, $t));
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
                                    countess = System.Linq.Enumerable.from(this.Hand.cards).firstOrDefault($asm.$.HandGames.Player.f3, null);
                                    if (countess != null) {
                                        $step = 4;
                                        continue;
                                    } 
                                    $step = 8;
                                    continue;
                                }
                                case 4: {
                                    kingOrPrince = System.Linq.Enumerable.from(this.Hand.cards).firstOrDefault($asm.$.HandGames.Player.f4, null);
                                    if (kingOrPrince != null) {
                                        $step = 5;
                                        continue;
                                    } 
                                    $step = 7;
                                    continue;
                                }
                                case 5: {
                                    $task2 = kingOrPrince.Play();
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
        return Bridge.is(v, HandGames.Cards.CountessCard);
    },
        f4: function (v) {
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
                    $taskResult1, 
                    $task2, 
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
                                        this.Highlighted = false;
                                        oldPos = this.in.GetDrawingPosition(this);
                                        this.in.Remove(this);
                                        to.Add(this);
                                        if (!(oldPos.Permissions === HandGames.DrawInfo.DrawPermission.Undrawable || to.GetDrawingPosition(this).Permissions === HandGames.DrawInfo.DrawPermission.Undrawable)) {
                                            $step = 1;
                                            continue;
                                        } 
                                        $step = 3;
                                        continue;
                                    }
                                    case 1: {
                                        this.oldLoc = oldPos.DrawPosition.$clone();
                                        this.orgDate = new Date();
                                        this.from = this.in;
                                        this.animationDone = new System.Threading.Tasks.TaskCompletionSource();
                                        $task1 = this.animationDone.task;
                                        $step = 2;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        this.animationDone = null;
                                        this.orgDate = null;
                                        this.from = null;
                                        this.oldLoc = null;
                                        $step = 3;
                                        continue;
                                    }
                                    case 3: {
                                        if (Bridge.is(this.in, HandGames.Hand) && Bridge.is(to, HandGames.DiscardPile)) {
                                            $step = 4;
                                            continue;
                                        } 
                                        $step = 6;
                                        continue;
                                    }
                                    case 4: {
                                        $task2 = this.OnDiscard();
                                        $step = 5;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 5: {
                                        $task2.getAwaitedResult();
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
            choiceFont: null
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
            this.ui.Update();
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
                this.spriteBatch.DrawString(this.font, System.String.format("{0} has won.", Bridge.Reflection.getTypeName(Bridge.getType(this.won))), new Microsoft.Xna.Framework.Vector2.$ctor2(0, 0), Microsoft.Xna.Framework.Color.Red.$clone());
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

    Bridge.define("LRCEngine.IDrawMode", {
        $kind: "interface"
    });

    Bridge.define("LRCEngine.Extensions", {
        statics: {
            methods: {
                Draw: function (spriteBatch, texture, vect, color) {
                    spriteBatch.Draw$4(texture, vect.Origin.$clone(), null, color.$clone(), 0, Microsoft.Xna.Framework.Vector2.Zero.$clone(), new Microsoft.Xna.Framework.Vector2.$ctor2(vect.Size.X / texture.Width, vect.Size.Y / texture.Height), Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0);
                },
                Contains: function (rect, point) {
                    return rect.X <= point.X && rect.Y <= point.Y && ((rect.X + rect.Width) | 0) > point.X && ((rect.Y + rect.Height) | 0) > point.Y;
                },
                Intersects: function (rect, other) {
                    return rect.X <= other.X + other.Width && rect.Y <= other.Y + other.Height && ((rect.X + rect.Width) | 0) >= other.X && ((rect.Y + rect.Height) | 0) >= other.Y;
                },
                Vectangle: function (rect) {
                    return new LRCEngine.Vectangle.$ctor2(rect.X, rect.Y, rect.Width, rect.Height);
                }
            }
        }
    });

    Bridge.define("LRCEngine.InputState", {
        fields: {
            oldMouse: null,
            oldKeyboard: null,
            preFirstUpdate: false,
            firstUpdate: false,
            hoveringElement: null,
            hoveringElementMouseDown: null,
            mouseLeft: null,
            mouseMiddle: null,
            mouseRight: null
        },
        props: {
            mouse: null,
            keyboard: null,
            pauseMouse: false,
            MousePos: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.mouse.X, this.mouse.Y);
                }
            },
            OldMousePos: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.oldMouse.X, this.oldMouse.Y);
                }
            },
            MouseDelta: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(((this.mouse.X - this.oldMouse.X) | 0), ((this.mouse.Y - this.oldMouse.Y) | 0));
                }
            }
        },
        ctors: {
            init: function () {
                this.oldMouse = new Microsoft.Xna.Framework.Input.MouseState();
                this.oldKeyboard = new Microsoft.Xna.Framework.Input.KeyboardState();
                this.preFirstUpdate = true;
                this.firstUpdate = true;
                this.mouse = new Microsoft.Xna.Framework.Input.MouseState();
                this.keyboard = new Microsoft.Xna.Framework.Input.KeyboardState();
            }
        },
        methods: {
            Update: function () {
                if (this.firstUpdate && !this.preFirstUpdate) {
                    this.firstUpdate = false;
                }
                this.preFirstUpdate = false;
                this.oldKeyboard = this.keyboard.$clone();
                this.keyboard = Microsoft.Xna.Framework.Input.Keyboard.GetState();
                /* if (WasKeyJustPressed(Keys.Space))
                {
                   pauseMouse = !pauseMouse;
                }
                else if (IsKeyDown(Keys.Space) && pauseMouse && (WasMouseLeftJustPressed() || WasMouseRightJustPressed()))
                {
                   // force an update if the user clicks
                   mouse = Mouse.GetState();
                }*/

                if (this.pauseMouse) {
                    this.mouse = this.oldMouse.$clone();
                } else {
                    this.oldMouse = this.mouse.$clone();
                    this.mouse = Microsoft.Xna.Framework.Input.Mouse.GetState();
                }

                if (this.mouseLeft != null) {
                    this.mouseLeft.Update(this.mouse.$clone());
                    this.mouseMiddle.Update(this.mouse.$clone());
                    this.mouseRight.Update(this.mouse.$clone());
                } else {
                    this.mouseLeft = new LRCEngine.MouseButtonState(LRCEngine.MouseButton.LEFT, this.mouse.$clone());
                    this.mouseMiddle = new LRCEngine.MouseButtonState(LRCEngine.MouseButton.MIDDLE, this.mouse.$clone());
                    this.mouseRight = new LRCEngine.MouseButtonState(LRCEngine.MouseButton.RIGHT, this.mouse.$clone());
                }

                if (this.mouseLeft.justPressed) {
                    this.hoveringElementMouseDown = this.hoveringElement;
                }

                this.hoveringElement = null;
            },
            UpdateMouseHover: function (list) {
                if (this.hoveringElement != null) {
                    return;
                }

                for (var Idx = (System.Array.getCount(list, LRCEngine.UIMouseResponder) - 1) | 0; Idx >= 0; Idx = (Idx - 1) | 0) {
                    this.hoveringElement = System.Array.getItem(list, Idx, LRCEngine.UIMouseResponder).LRCEngine$UIMouseResponder$GetMouseHover(this.MousePos.$clone());
                    if (this.hoveringElement != null) {
                        break;
                    }
                }
            },
            WasMouseLeftJustPressed: function () {
                return this.mouseLeft.isDown && this.mouseLeft.duration === 0;
            },
            WasMouseLeftJustReleased: function () {
                return !this.mouseLeft.isDown && this.mouseLeft.duration === 0;
            },
            WasMouseRightJustPressed: function () {
                return this.mouseRight.isDown && this.mouseRight.duration === 0;
            },
            WasMouseRightJustReleased: function () {
                return !this.mouseRight.isDown && this.mouseRight.duration === 0;
            },
            WasKeyJustPressed: function (key) {
                return this.keyboard.IsKeyDown(key) && !this.oldKeyboard.IsKeyDown(key);
            },
            WasKeyJustReleased: function (key) {
                return !this.keyboard.IsKeyDown(key) && this.oldKeyboard.IsKeyDown(key);
            },
            IsKeyDown: function (key) {
                return this.keyboard.IsKeyDown(key);
            },
            IsKeyUp: function (key) {
                return this.keyboard.IsKeyUp(key);
            },
            GetPseudoJoystick: function (up, down, left, right) {
                var upDown = 0.0;
                if (this.keyboard.IsKeyDown(up)) {
                    upDown = -1.0;
                } else if (this.keyboard.IsKeyDown(down)) {
                    upDown = 1.0;
                }

                var leftRight = 0.0;
                if (this.keyboard.IsKeyDown(left)) {
                    leftRight = -1.0;
                } else if (this.keyboard.IsKeyDown(right)) {
                    leftRight = 1.0;
                }

                return new Microsoft.Xna.Framework.Vector2.$ctor2(leftRight, upDown);
            }
        }
    });

    Bridge.define("LRCEngine.JSONArray", {
        statics: {
            fields: {
                empty: null
            },
            ctors: {
                init: function () {
                    this.empty = new LRCEngine.JSONArray.$ctor1(System.Array.init([], System.Object));
                }
            }
        },
        fields: {
            array: null
        },
        props: {
            Length: {
                get: function () {
                    return this.array.length;
                }
            }
        },
        ctors: {
            $ctor1: function (inArray) {
                this.$initialize();
                this.array = inArray;
            },
            ctor: function (inArray) {
                this.$initialize();                var $t, $t1;

                var unused = null;
                var unused2 = null;
                var count = 0;
                $t = Bridge.getEnumerator(inArray);
                try {
                    while ($t.moveNext()) {
                        var obj = $t.Current;
                        unused = obj; // suppress warnings about unused obj
                        count = (count + 1) | 0;
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }unused2 = unused;
                unused = unused2;

                this.array = System.Array.init(count, null, System.Object);
                var idx = 0;
                $t1 = Bridge.getEnumerator(inArray);
                try {
                    while ($t1.moveNext()) {
                        var obj1 = $t1.Current;
                        this.array[System.Array.index(idx, this.array)] = obj1;
                        idx = (idx + 1) | 0;
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$dispose();
                    }
                }}
    },
    methods: {
        getItem: function (key) {
            return this.array[System.Array.index(key, this.array)];
        },
        AddToSet: function (theSet) {
            var $t;
            $t = Bridge.getEnumerator(this.array);
            try {
                while ($t.moveNext()) {
                    var s = Bridge.cast($t.Current, System.String);
                    theSet.setItem(s, true);
                }
            } finally {
                if (Bridge.is($t, System.IDisposable)) {
                    $t.System$IDisposable$dispose();
                }
            }},
        asJSONTables: function () {
            return new LRCEngine.JSONArray_JSONTables(Bridge.getEnumerator(this.array));
        },
        asJSONArrays: function () {
            return new LRCEngine.JSONArray_JSONArrays(Bridge.getEnumerator(this.array));
        },
        asStrings: function () {
            return new (LRCEngine.JSONArrayEnumerator$1(System.String))(Bridge.getEnumerator(this.array));
        },
        toPoint: function () {
            return new Microsoft.Xna.Framework.Point.$ctor2(this.getInt(0), this.getInt(1));
        },
        toVector2: function () {
            return new Microsoft.Xna.Framework.Vector2.$ctor2(this.getFloat(0), this.getFloat(1));
        },
        toVector3: function () {
            return new Microsoft.Xna.Framework.Vector3.$ctor3(this.getFloat(0), this.getFloat(1), this.getFloat(2));
        },
        getProperty: function (idx) {
            return this.array[System.Array.index(idx, this.array)];
        },
        getInt: function (idx) {
            return Bridge.Int.clip32(System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.array[System.Array.index(idx, this.array)]), System.Double)));
        },
        getFloat: function (idx) {
            return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.array[System.Array.index(idx, this.array)]), System.Double));
        },
        getDouble: function (idx) {
            return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.array[System.Array.index(idx, this.array)]), System.Double));
        },
        getString: function (idx) {
            return Bridge.cast(this.array[System.Array.index(idx, this.array)], System.String);
        },
        getString$1: function (idx, defaultValue) {
            if (this.array.length > idx) {
                return Bridge.cast(this.array[System.Array.index(idx, this.array)], System.String);
            } else {
                return defaultValue;
            }
        },
        getBool: function (idx) {
            return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.array[System.Array.index(idx, this.array)]), System.Boolean));
        },
        getArray: function (idx) {
            return new LRCEngine.JSONArray.$ctor1(Bridge.cast(this.array[System.Array.index(idx, this.array)], System.Array.type(System.Object)));
        },
        getJSON: function (idx) {
            return new LRCEngine.JSONTable.$ctor1(Bridge.cast(this.array[System.Array.index(idx, this.array)], System.Collections.Generic._Dictionary$2(System.String,System.Object)));
        },
        toStringArray: function () {
            var result = System.Array.init(this.array.length, null, System.String);
            for (var Idx = 0; Idx < this.array.length; Idx = (Idx + 1) | 0) {
                result[System.Array.index(Idx, result)] = Bridge.cast(this.array[System.Array.index(Idx, this.array)], System.String);
            }

            return result;
        },
        toString: function () {
            var $t;
            var result = "[ ";
            $t = Bridge.getEnumerator(this.array);
            try {
                while ($t.moveNext()) {
                    var val = $t.Current;
                    if (Bridge.referenceEquals(Bridge.getType(val), System.String)) {
                        result = System.String.concat(result, (System.String.concat("\"", val, "\", ")));
                    } else {
                        result = System.String.concat(result, (System.String.concat("", val, ", ")));
                    }
                }
            } finally {
                if (Bridge.is($t, System.IDisposable)) {
                    $t.System$IDisposable$dispose();
                }
            }result = System.String.concat(result, " ]");
            return result;
        }
    }
    });

    Bridge.define("LRCEngine.JSONArrayEnumerator$1", function (T) { return {
        inherits: [System.Collections.Generic.IEnumerator$1(T)],
        fields: {
            baseEnumerator: null
        },
        props: {
            Current: {
                get: function () {
                    return Bridge.cast(Bridge.unbox(this.baseEnumerator.System$Collections$IEnumerator$Current), T);
                }
            },
            System$Collections$IEnumerator$Current: {
                get: function () {
                    return this.Current;
                }
            }
        },
        alias: [
            "moveNext", "System$Collections$IEnumerator$moveNext",
            "reset", "System$Collections$IEnumerator$reset",
            "Current", ["System$Collections$Generic$IEnumerator$1$" + Bridge.getTypeAlias(T) + "$Current$1", "System$Collections$Generic$IEnumerator$1$Current$1"]
        ],
        ctors: {
            ctor: function (aBaseEnumerator) {
                this.$initialize();
                this.baseEnumerator = aBaseEnumerator;
            }
        },
        methods: {
            GetEnumerator: function () {
                return this;
            },
            moveNext: function () {
                return this.baseEnumerator.System$Collections$IEnumerator$moveNext();
            },
            reset: function () {
                this.baseEnumerator.System$Collections$IEnumerator$reset();
            },
            System$IDisposable$dispose: function () { }
        }
    }; });

    Bridge.define("LRCEngine.JSONTable", {
        statics: {
            methods: {
                LogError: function (error) {
                    throw new System.ArgumentException(error);
                },
                parseValue: function (json, idx) {
                    LRCEngine.JSONTable.SkipWhitespace(json, idx);
                    if (json.charCodeAt(idx.v) === 123) {
                        var result = new (System.Collections.Generic._Dictionary$2(System.String,System.Object)).ctor();

                        while (true) {
                            idx.v = (idx.v + 1) | 0;
                            LRCEngine.JSONTable.SkipWhitespace(json, idx);

                            // permit trailing commas - {"foo":"bar" , } is legal
                            if (json.charCodeAt(idx.v) === 125) {
                                idx.v = (idx.v + 1) | 0;
                                return result;
                            }

                            var key = Bridge.cast(LRCEngine.JSONTable.parseValue(json, idx), System.String);
                            LRCEngine.JSONTable.SkipWhitespace(json, idx);

                            if (json.charCodeAt(idx.v) !== 58) {
                                LRCEngine.JSONTable.ReportError(json, idx.v, "Invalid keyvalue separator: " + String.fromCharCode(json.charCodeAt(idx.v)) + "!");
                                return null;
                            }

                            idx.v = (idx.v + 1) | 0;
                            var value = LRCEngine.JSONTable.parseValue(json, idx);
                            result.setItem(key, value);

                            LRCEngine.JSONTable.SkipWhitespace(json, idx);

                            if (json.charCodeAt(idx.v) === 125) {
                                idx.v = (idx.v + 1) | 0;
                                return result;
                            } else if (json.charCodeAt(idx.v) !== 44) {
                                //ReportError(json, idx, "Expected a comma, got: " + json[idx] + "");
                                //return null;
                                // permit missing commas - {"foo":1 "bar":1 } is legal
                                idx.v = (idx.v - 1) | 0;
                            }
                        }
                    } else if (json.charCodeAt(idx.v) === 91) {
                        var values = new (System.Collections.Generic.List$1(System.Object))();
                        idx.v = (idx.v + 1) | 0;

                        while (true) {
                            LRCEngine.JSONTable.SkipWhitespace(json, idx);

                            if (json.charCodeAt(idx.v) === 93) {
                                idx.v = (idx.v + 1) | 0;
                                return values.toArray();
                            }

                            var value1 = LRCEngine.JSONTable.parseValue(json, idx);
                            LRCEngine.JSONTable.SkipWhitespace(json, idx);

                            values.add(value1);

                            LRCEngine.JSONTable.SkipWhitespace(json, idx);

                            if (json.charCodeAt(idx.v) === 44) {
                                idx.v = (idx.v + 1) | 0;
                            } else if (json.charCodeAt(idx.v) !== 93) {
                                LRCEngine.JSONTable.ReportError(json, idx.v, "Expected a comma, got: " + String.fromCharCode(json.charCodeAt(idx.v)) + "");
                                return null;
                            }
                        }
                    } else if (json.charCodeAt(idx.v) === 34) {
                        idx.v = (idx.v + 1) | 0;
                        var stringSoFar = "";
                        var startIdx = idx.v;
                        while (json.charCodeAt(idx.v) !== 34) {
                            if (json.charCodeAt(idx.v) === 92) {
                                stringSoFar = System.String.concat(stringSoFar, (json.substr(startIdx, ((idx.v - startIdx) | 0))));
                                idx.v = (idx.v + 1) | 0;
                                if (json.charCodeAt(idx.v) === 110) {
                                    stringSoFar = System.String.concat(stringSoFar, String.fromCharCode(10));
                                } else {
                                    stringSoFar = System.String.concat(stringSoFar, String.fromCharCode(json.charCodeAt(idx.v)));
                                }
                                startIdx = (idx.v + 1) | 0;
                            }
                            idx.v = (idx.v + 1) | 0;
                        }
                        idx.v = (idx.v + 1) | 0;
                        return System.String.concat(stringSoFar, json.substr(startIdx, ((((idx.v - startIdx) | 0) - 1) | 0)));
                    } else if (json.charCodeAt(idx.v) === 45 || json.charCodeAt(idx.v) >= 48 && json.charCodeAt(idx.v) <= 57) {
                        var negate = (json.charCodeAt(idx.v) === 45);
                        if (negate) {
                            idx.v = (idx.v + 1) | 0;
                        }

                        var numberSoFar = 0;
                        do {
                            numberSoFar = (((((numberSoFar * 10) | 0) + json.charCodeAt(idx.v)) | 0) - 48) | 0;
                            idx.v = (idx.v + 1) | 0;
                        } while (json.charCodeAt(idx.v) >= 48 && json.charCodeAt(idx.v) <= 57);

                        var result1;

                        if (json.charCodeAt(idx.v) === 46) {
                            // floating point
                            idx.v = (idx.v + 1) | 0;

                            var fractionSoFar = 0;
                            var divisor = 1.0;
                            do {
                                fractionSoFar = (((((fractionSoFar * 10) | 0) + json.charCodeAt(idx.v)) | 0) - 48) | 0;
                                divisor *= 10.0;
                                idx.v = (idx.v + 1) | 0;
                            } while (json.charCodeAt(idx.v) >= 48 && json.charCodeAt(idx.v) <= 57);

                            result1 = numberSoFar + fractionSoFar / divisor;
                        } else {
                            result1 = numberSoFar;
                        }

                        if (negate) {
                            return Bridge.box(-result1, System.Double, System.Double.format, System.Double.getHashCode);
                        } else {
                            return Bridge.box(result1, System.Double, System.Double.format, System.Double.getHashCode);
                        }
                    } else if (json.charCodeAt(idx.v) >= 97 && json.charCodeAt(idx.v) <= 122) {
                        var startIdx1 = idx.v;
                        do {
                            idx.v = (idx.v + 1) | 0;
                        } while (json.charCodeAt(idx.v) >= 97 && json.charCodeAt(idx.v) <= 122);

                        var keyword = json.substr(startIdx1, ((idx.v - startIdx1) | 0));
                        if (Bridge.referenceEquals(keyword, "false")) {
                            return Bridge.box(false, System.Boolean, System.Boolean.toString);
                        } else if (Bridge.referenceEquals(keyword, "true")) {
                            return Bridge.box(true, System.Boolean, System.Boolean.toString);
                        } else {
                            LRCEngine.JSONTable.ReportError(json, idx.v, System.String.concat("Invalid json keyword: ", keyword, "!"));
                            return null;
                        }
                    } else {
                        LRCEngine.JSONTable.ReportError(json, idx.v, "Invalid symbol: '" + String.fromCharCode(json.charCodeAt(idx.v)) + "'");
                        return null;
                    }
                },
                SkipWhitespace: function (text, idx) {
                    if (text.length <= idx.v) {
                        return;
                    }

                    var c = text.charCodeAt(idx.v);
                    while (c === 32 || c === 9 || c === 13 || c === 10) {
                        idx.v = (idx.v + 1) | 0;
                        c = text.charCodeAt(idx.v);
                    }

                    if (c === 47) {
                        if (text.charCodeAt(((idx.v + 1) | 0)) === 47) {
                            // comment
                            idx.v = (idx.v + 1) | 0; // to the /
                            do {
                                idx.v = (idx.v + 1) | 0; // to the character after the /
                                c = text.charCodeAt(idx.v);
                            } while (idx.v < text.length && c !== 10);
                        } else if (text.charCodeAt(((idx.v + 1) | 0)) === 42) {
                            /* comment */
                            var startIdx = idx.v;
                            idx.v = (idx.v + 1) | 0; // to the *
                            do {
                                idx.v = (idx.v + 1) | 0; // to the character after the *
                                c = text.charCodeAt(idx.v);
                            } while (idx.v < text.length && (c !== 42 || text.charCodeAt(((idx.v + 1) | 0)) !== 47));
                            if (idx.v === text.length) {
                                LRCEngine.JSONTable.ReportError(text, startIdx, "Unterminated /* comment");
                            } else {
                                idx.v = (idx.v + 2) | 0; // to the character after the */
                            }
                        }

                        LRCEngine.JSONTable.SkipWhitespace(text, idx);
                    }
                },
                parseCommandWord: function (text, idx) {
                    LRCEngine.JSONTable.SkipWhitespace(text, idx);
                    if ((text.charCodeAt(idx.v) >= 97 && text.charCodeAt(idx.v) <= 122) || (text.charCodeAt(idx.v) >= 65 && text.charCodeAt(idx.v) <= 90)) {
                        var startIdx = idx.v;
                        do {
                            idx.v = (idx.v + 1) | 0;
                        } while (idx.v < text.length && ((text.charCodeAt(idx.v) >= 97 && text.charCodeAt(idx.v) <= 122) || (text.charCodeAt(idx.v) >= 65 && text.charCodeAt(idx.v) <= 90)));

                        var word = text.substr(startIdx, ((idx.v - startIdx) | 0));
                        if (Bridge.referenceEquals(word, "true") || Bridge.referenceEquals(word, "false")) {
                            return null; // can't handle keywords here
                        }
                        return word;
                    } else {
                        return null;
                    }
                },
                ReportError: function (json, errorAt, message) {
                    var lineNumber = 1;
                    var lineStartIdx = 0;
                    for (var idx = 0; idx <= errorAt; idx = (idx + 1) | 0) {
                        if (json.charCodeAt(idx) === 10) {
                            lineNumber = (lineNumber + 1) | 0;
                            lineStartIdx = (idx + 1) | 0;
                        }
                    }

                    var lineText = "";
                    for (var endIdx = (errorAt + 1) | 0; endIdx < json.length; endIdx = (endIdx + 1) | 0) {
                        if (json.charCodeAt(endIdx) === 10 || json.charCodeAt(endIdx) === 13) {
                            lineText = json.substr(lineStartIdx, ((endIdx - lineStartIdx) | 0));
                            break;
                        }
                    }

                    LRCEngine.JSONTable.LogError(System.String.concat("JSON error at line " + lineNumber + " - ", lineText, "\n", message));
                }
            }
        },
        fields: {
            dictionary: null
        },
        props: {
            Keys: {
                get: function () {
                    return this.dictionary.Keys;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.dictionary = new (System.Collections.Generic._Dictionary$2(System.String,System.Object)).ctor();
            },
            $ctor1: function (inDictionary) {
                this.$initialize();
                this.dictionary = inDictionary;
            },
            $ctor2: function (filename) {
                this.$initialize();
                var request = new XMLHttpRequest();
                request.open("GET", filename, false);
                request.send(null);
                var idx = { v : 0 };
                this.dictionary = Bridge.cast(LRCEngine.JSONTable.parseValue(request.responseText, idx), System.Collections.Generic._Dictionary$2(System.String,System.Object));
            }
        },
        methods: {
            hasKey: function (name) {
                return this.dictionary.containsKey(name);
            },
            getProperty: function (name) {
                return this.dictionary.getItem(name);
            },
            getProperty$1: function (name, defaultValue) {
                if (this.dictionary.containsKey(name)) {
                    return this.dictionary.getItem(name);
                } else {
                    return defaultValue;
                }
            },
            getInt$1: function (name, defaultValue) {
                if (this.dictionary.containsKey(name)) {
                    return Bridge.Int.clip32(System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.dictionary.getItem(name)), System.Double))); // values are stored in the dictionary as doubles
                } else {
                    return defaultValue;
                }
            },
            getInt: function (name) {
                if (!this.dictionary.containsKey(name)) {
                    LRCEngine.JSONTable.LogError(System.String.concat("Table has no int called ", name));
                }
                return Bridge.Int.clip32(System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.dictionary.getItem(name)), System.Double)));
            },
            getFloat$1: function (name, defaultValue) {
                if (this.dictionary.containsKey(name)) {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.dictionary.getItem(name)), System.Double)); // values are stored in the dictionary as doubles
                } else {
                    return defaultValue;
                }
            },
            getFloat: function (name) {
                if (!this.dictionary.containsKey(name)) {
                    LRCEngine.JSONTable.LogError(System.String.concat("Table has no float called ", name));
                }
                return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.dictionary.getItem(name)), System.Double));
            },
            getDouble$1: function (name, defaultValue) {
                if (this.dictionary.containsKey(name)) {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.dictionary.getItem(name)), System.Double));
                } else {
                    return defaultValue;
                }
            },
            getDouble: function (name) {
                if (!this.dictionary.containsKey(name)) {
                    LRCEngine.JSONTable.LogError(System.String.concat("Table has no double called ", name));
                }
                return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.dictionary.getItem(name)), System.Double));
            },
            getString$1: function (name, defaultValue) {
                if (this.dictionary.containsKey(name)) {
                    return Bridge.cast(this.dictionary.getItem(name), System.String);
                } else {
                    return defaultValue;
                }
            },
            getString: function (name) {
                if (!this.dictionary.containsKey(name)) {
                    LRCEngine.JSONTable.LogError(System.String.concat("Table has no string called ", name));
                }
                return Bridge.cast(this.dictionary.getItem(name), System.String);
            },
            getBool$1: function (name, defaultValue) {
                if (this.dictionary.containsKey(name)) {
                    return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.dictionary.getItem(name)), System.Boolean));
                } else {
                    return defaultValue;
                }
            },
            getBool: function (name) {
                if (!this.dictionary.containsKey(name)) {
                    LRCEngine.JSONTable.LogError(System.String.concat("Table has no bool called ", name));
                }
                return System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.dictionary.getItem(name)), System.Boolean));
            },
            getArray$1: function (name, defaultValue) {
                if (this.dictionary.containsKey(name)) {
                    return new LRCEngine.JSONArray.$ctor1(Bridge.cast(this.dictionary.getItem(name), System.Array.type(System.Object)));
                } else {
                    return defaultValue;
                }
            },
            getArray: function (name) {
                if (!this.dictionary.containsKey(name)) {
                    LRCEngine.JSONTable.LogError(System.String.concat("Table has no array called ", name));
                }
                return new LRCEngine.JSONArray.$ctor1(Bridge.cast(this.dictionary.getItem(name), System.Array.type(System.Object)));
            },
            getJSON$1: function (name, defaultValue) {
                if (this.dictionary.containsKey(name)) {
                    return new LRCEngine.JSONTable.$ctor1(Bridge.cast(this.dictionary.getItem(name), System.Collections.Generic._Dictionary$2(System.String,System.Object)));
                } else {
                    return defaultValue;
                }
            },
            getJSON: function (name) {
                if (!this.dictionary.containsKey(name)) {
                    LRCEngine.JSONTable.LogError(System.String.concat("Table has no subtable called ", name));
                }
                return new LRCEngine.JSONTable.$ctor1(Bridge.cast(this.dictionary.getItem(name), System.Collections.Generic._Dictionary$2(System.String,System.Object)));
            },
            getVector2: function (name) {
                var array = this.getArray(name);
                if (array.Length !== 2) {
                    LRCEngine.JSONTable.LogError("getVector2 - array length is " + array.Length);
                }
                return array.toVector2();
            },
            toString: function () {
                var $t;
                var result = "{ ";
                $t = Bridge.getEnumerator(this.dictionary.Keys, "GetEnumerator");
                try {
                    while ($t.moveNext()) {
                        var key = $t.Current;
                        var val = this.dictionary.getItem(key);
                        if (Bridge.referenceEquals(Bridge.getType(val), System.String)) {
                            result = System.String.concat(result, (System.String.concat("\"", key, "\":\"", val, "\",\n")));
                        } else {
                            result = System.String.concat(result, (System.String.concat("\"", key, "\":", val, ",\n")));
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }result = System.String.concat(result, "}");
                return result;
            },
            Add: function (key, val) {
                this.dictionary.setItem(key, val);
            }
        }
    });

    Bridge.define("LRCEngine.LRCEngineExtensions", {
        statics: {
            methods: {
                DotProduct: function (a, b) {
                    return a.X * b.X + a.Y * b.Y;
                },
                ToAngle: function (a) {
                    var len = a.Length();

                    if (len < 0.001) {
                        return 0;
                    } else {
                        var dir = Microsoft.Xna.Framework.Vector2.op_Division$1(a.$clone(), len);

                        var result = Math.asin(dir.Y);
                        if (a.X < 0) {
                            result = Math.PI - result;
                        }
                        return result;
                    }
                },
                Contains: function (rect, pos) {
                    return rect.Contains(new Microsoft.Xna.Framework.Point.$ctor2(Bridge.Int.clip32(pos.X), Bridge.Int.clip32(pos.Y)));
                },
                XY: function (rect) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(rect.X, rect.Y);
                },
                Draw: function (spriteBatch, image, rect, col) {
                    image.Draw$1(spriteBatch, rect.$clone(), col.$clone());
                },
                Multiply: function (col1, col2) {
                    return new Microsoft.Xna.Framework.Color.$ctor9(((col1.R * col2.R) | 0) * (1.52587891E-05), ((col1.G * col2.G) | 0) * (1.52587891E-05), ((col1.B * col2.B) | 0) * (1.52587891E-05), ((col1.A * col2.A) | 0) * (1.52587891E-05));
                },
                Size: function (texture) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(texture.Width, texture.Height);
                },
                hexToInt: function (str) {
                    var $t;
                    var result = 0;
                    $t = Bridge.getEnumerator(str);
                    try {
                        while ($t.moveNext()) {
                            var c = $t.Current;
                            if (c >= 97 && c <= 102) {
                                result = ((((((c - 97) | 0)) + 10) | 0) + ((result * 16) | 0)) | 0;
                            } else if (c >= 65 && c <= 70) {
                                result = ((((((c - 65) | 0)) + 10) | 0) + ((result * 16) | 0)) | 0;
                            } else if (c >= 48 && c <= 57) {
                                result = ((((c - 48) | 0)) + ((result * 16) | 0)) | 0;
                            } else {
                                return 0;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }return result;
                },
                toColor: function (str) {
                    if (str.length === 6) {
                        return new Microsoft.Xna.Framework.Color.$ctor6(LRCEngine.LRCEngineExtensions.hexToInt(str.substr(0, 2)), LRCEngine.LRCEngineExtensions.hexToInt(str.substr(2, 2)), LRCEngine.LRCEngineExtensions.hexToInt(str.substr(4, 2)));
                    } else if (str.length === 8) {
                        return new Microsoft.Xna.Framework.Color.$ctor7(LRCEngine.LRCEngineExtensions.hexToInt(str.substr(0, 2)), LRCEngine.LRCEngineExtensions.hexToInt(str.substr(2, 2)), LRCEngine.LRCEngineExtensions.hexToInt(str.substr(4, 2)), LRCEngine.LRCEngineExtensions.hexToInt(str.substr(6, 2)));
                    }
                    return Microsoft.Xna.Framework.Color.White.$clone();
                },
                toInt: function (rot) {
                    switch (rot) {
                        case LRCEngine.Rotation90.Rot90: 
                            return 90;
                        case LRCEngine.Rotation90.Rot180: 
                            return 180;
                        case LRCEngine.Rotation90.Rot270: 
                            return 270;
                        default: 
                            return 0;
                    }
                },
                getRotation: function (table, name, defaultValue) {
                    var angle = table.getInt$1(name, LRCEngine.LRCEngineExtensions.toInt(defaultValue));
                    return ((Bridge.Int.div(angle, 90)) | 0);
                },
                rotateBy: function (rotation, other) {
                    var newRotation = (((LRCEngine.LRCEngineExtensions.toInt(rotation) + LRCEngine.LRCEngineExtensions.toInt(other)) | 0)) % 360;
                    return ((Bridge.Int.div(newRotation, 90)) | 0);
                },
                invert: function (rotation) {
                    var newRotation = (360 - LRCEngine.LRCEngineExtensions.toInt(rotation)) | 0;
                    return ((Bridge.Int.div(newRotation, 90)) | 0);
                },
                DrawString: function (spriteBatch, font, text, position, alignment, color) {
                    switch (alignment) {
                        case LRCEngine.TextAlignment.LEFT: 
                            spriteBatch.DrawString(font, text, position.$clone(), color.$clone());
                            break;
                        case LRCEngine.TextAlignment.RIGHT: 
                            {
                                var size = font.MeasureString(text);
                                spriteBatch.DrawString(font, text, new Microsoft.Xna.Framework.Vector2.$ctor2(Bridge.Int.clip32(position.X - size.X), position.Y), color.$clone());
                            }
                            break;
                        case LRCEngine.TextAlignment.CENTER: 
                            {
                                var size1 = font.MeasureString(text);
                                spriteBatch.DrawString(font, text, new Microsoft.Xna.Framework.Vector2.$ctor2(Bridge.Int.clip32(position.X - size1.X / 2), position.Y), color.$clone());
                            }
                            break;
                    }
                },
                InsertLineBreaks: function (rawText, font, lineWidth) {
                    var spaceWidth = font.MeasureString(" ").X;
                    var x = 0;
                    var wordStartIdx = 0;
                    var result = "";
                    var lastSplit = "";
                    var lastSplitWidth = 0;
                    for (var Idx = 0; Idx <= rawText.length; Idx = (Idx + 1) | 0) {
                        if (Idx === rawText.length || rawText.charCodeAt(Idx) === 32) {
                            var word = rawText.substr(wordStartIdx, ((Idx - wordStartIdx) | 0));
                            var wordWidth = font.MeasureString(word).X;
                            if (x + lastSplitWidth + wordWidth > lineWidth) {
                                result = System.String.concat(result, "\n");
                                x = 0;
                            } else {
                                result = System.String.concat(result, lastSplit);
                                x += lastSplitWidth;

                                if (Idx < rawText.length) {
                                    lastSplit = "" + String.fromCharCode(rawText.charCodeAt(Idx));
                                    lastSplitWidth = font.MeasureString(lastSplit).X;
                                }
                            }
                            result = System.String.concat(result, word);
                            x += wordWidth;
                            wordStartIdx = (Idx + 1) | 0;
                        } else if (rawText.charCodeAt(Idx) === 10) {
                            result = System.String.concat(result, "\n");
                            x = 0;
                        }
                    }

                    return result;
                },
                DrawBeam: function (spriteBatch, texture, start, end, thickness, color) {
                    var offset = Microsoft.Xna.Framework.Vector2.op_Subtraction(end.$clone(), start.$clone());
                    var beamRotation = LRCEngine.LRCEngineExtensions.ToAngle(offset);
                    var beamRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(Bridge.Int.clip32(start.X), Bridge.Int.clip32(start.Y), Bridge.Int.clip32(offset.Length()), thickness);
                    spriteBatch.Draw$2(texture, beamRect.$clone(), null, color.$clone(), beamRotation, new Microsoft.Xna.Framework.Vector2.$ctor2(0, ((Bridge.Int.div(texture.Height, 2)) | 0)), Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0.0);
                },
                GetStringBounds: function (font, text, position, alignment) {
                    var size = font.MeasureString(text);
                    switch (alignment) {
                        case LRCEngine.TextAlignment.LEFT: 
                        default: 
                            return new Microsoft.Xna.Framework.Rectangle.$ctor2(Bridge.Int.clip32(position.X), Bridge.Int.clip32(position.Y), Bridge.Int.clip32(size.X), Bridge.Int.clip32(size.Y));
                        case LRCEngine.TextAlignment.RIGHT: 
                            return new Microsoft.Xna.Framework.Rectangle.$ctor2(Bridge.Int.clip32(position.X - size.X), Bridge.Int.clip32(position.Y), Bridge.Int.clip32(size.X), Bridge.Int.clip32(size.Y));
                        case LRCEngine.TextAlignment.CENTER: 
                            return new Microsoft.Xna.Framework.Rectangle.$ctor2(Bridge.Int.clip32(position.X - size.X * 0.5), Bridge.Int.clip32(position.Y), Bridge.Int.clip32(size.X), Bridge.Int.clip32(size.Y));
                    }
                },
                Bloat: function (rect, amount) {
                    return new Microsoft.Xna.Framework.Rectangle.$ctor2(((rect.X - amount) | 0), ((rect.Y - amount) | 0), ((rect.Width + ((amount * 2) | 0)) | 0), ((rect.Height + ((amount * 2) | 0)) | 0));
                },
                FixNegatives: function (rect) {
                    return new Microsoft.Xna.Framework.Rectangle.$ctor2(Math.min(rect.X, ((rect.X + rect.Width) | 0)), Math.min(rect.Y, ((rect.Y + rect.Height) | 0)), Math.abs(rect.Width), Math.abs(rect.Height));
                }
            }
        }
    });

    Bridge.define("LRCEngine.MouseButton", {
        $kind: "enum",
        statics: {
            fields: {
                LEFT: 0,
                MIDDLE: 1,
                RIGHT: 2
            }
        }
    });

    Bridge.define("LRCEngine.MouseButtonState", {
        statics: {
            fields: {
                DRAG_THRESHOLD: 0,
                FRAMERATE: 0
            },
            ctors: {
                init: function () {
                    this.DRAG_THRESHOLD = 3.0;
                    this.FRAMERATE = 0.0333333351;
                }
            }
        },
        fields: {
            button: 0,
            isDown: false,
            dragged: false,
            durationFrames: 0,
            initialMousePos: null
        },
        props: {
            duration: {
                get: function () {
                    return this.durationFrames * LRCEngine.MouseButtonState.FRAMERATE;
                }
            },
            justPressed: {
                get: function () {
                    return this.isDown && this.durationFrames === 0;
                }
            },
            justReleased: {
                get: function () {
                    return !this.isDown && this.durationFrames === 0;
                }
            }
        },
        ctors: {
            init: function () {
                this.initialMousePos = new Microsoft.Xna.Framework.Vector2();
            },
            ctor: function (button, initialState) {
                this.$initialize();
                this.button = button;
                this.isDown = this.IsButtonPressed(initialState.$clone());
                this.durationFrames = 100;
                this.initialMousePos = new Microsoft.Xna.Framework.Vector2.$ctor2(initialState.X, initialState.Y);
            }
        },
        methods: {
            Update: function (state) {
                var newPressed = this.IsButtonPressed(state.$clone());
                if (this.isDown !== newPressed) {
                    this.isDown = newPressed;
                    this.durationFrames = 0;
                    this.dragged = false;
                    this.initialMousePos = new Microsoft.Xna.Framework.Vector2.$ctor2(state.X, state.Y);
                } else {
                    this.durationFrames = (this.durationFrames + 1) | 0;

                    if (this.isDown && !this.dragged && (Microsoft.Xna.Framework.Vector2.op_Subtraction(this.initialMousePos.$clone(), new Microsoft.Xna.Framework.Vector2.$ctor2(state.X, state.Y))).LengthSquared() > LRCEngine.MouseButtonState.DRAG_THRESHOLD * LRCEngine.MouseButtonState.DRAG_THRESHOLD) {
                        this.dragged = true;
                    }
                }
            },
            IsButtonPressed: function (state) {
                switch (this.button) {
                    case LRCEngine.MouseButton.LEFT: 
                        return state.LeftButton === Microsoft.Xna.Framework.Input.ButtonState.Pressed;
                    case LRCEngine.MouseButton.MIDDLE: 
                        return state.MiddleButton === Microsoft.Xna.Framework.Input.ButtonState.Pressed;
                    case LRCEngine.MouseButton.RIGHT: 
                        return state.RightButton === Microsoft.Xna.Framework.Input.ButtonState.Pressed;
                }
                return false;
            }
        }
    });

    Bridge.define("LRCEngine.RichImage", {
        fields: {
            layers: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.layers = new (System.Collections.Generic.List$1(LRCEngine.RichImageLayer))();
            },
            $ctor3: function (texture) {
                this.$initialize();
                this.layers = function (_o6) {
                        _o6.add(new LRCEngine.RichImageLayer_Texture.$ctor2(texture, Microsoft.Xna.Framework.Color.White.$clone(), "default", 0, LRCEngine.Rotation90.None));
                        return _o6;
                    }(new (System.Collections.Generic.List$1(LRCEngine.RichImageLayer))());
            },
            $ctor2: function (layer) {
                this.$initialize();
                this.layers = function (_o7) {
                        _o7.add(layer);
                        return _o7;
                    }(new (System.Collections.Generic.List$1(LRCEngine.RichImageLayer))());
            },
            $ctor1: function (template, content) {
                this.$initialize();
                this.layers = new (System.Collections.Generic.List$1(LRCEngine.RichImageLayer))();

                var layerTemplate = template.getArray$1("layers", null);
                if (layerTemplate != null) {
                    for (var Idx = 0; Idx < layerTemplate.Length; Idx = (Idx + 1) | 0) {
                        this.layers.add(new LRCEngine.RichImageLayer_Texture.ctor(layerTemplate.getJSON(Idx), content));
                    }
                } else {
                    this.layers.add(new LRCEngine.RichImageLayer_Texture.ctor(template, content));
                }
            }
        },
        methods: {
            Add$1: function (layer) {
                this.layers.add(layer);
            },
            Add: function (image) {
                this.layers.add(new LRCEngine.RichImageLayer_Image(image, LRCEngine.Rotation90.None));
            },
            Draw: function (spriteBatch, rect) {
                this.Draw$2(spriteBatch, rect.$clone(), Microsoft.Xna.Framework.Color.White.$clone(), LRCEngine.Rotation90.None);
            },
            Draw$1: function (spriteBatch, rect, col) {
                this.Draw$2(spriteBatch, rect.$clone(), col.$clone(), LRCEngine.Rotation90.None);
            },
            Draw$2: function (spriteBatch, rect, col, rotation) {
                var $t;
                $t = Bridge.getEnumerator(this.layers);
                try {
                    while ($t.moveNext()) {
                        var curLayer = $t.Current;
                        curLayer.LRCEngine$RichImageLayer$Draw(spriteBatch, rect.$clone(), col.$clone(), rotation);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }}
        }
    });

    Bridge.define("LRCEngine.RichImageDrawMode", {
        $kind: "enum",
        statics: {
            fields: {
                DEFAULT: 0,
                STRETCHED: 1,
                FIXED: 2,
                FITTED: 3,
                TILED: 4,
                TILED9GRID: 5,
                STRETCHED9GRID: 6,
                TILEDPROGRESSBAR: 7
            }
        }
    });

    Bridge.define("LRCEngine.RichImageLayer", {
        $kind: "interface"
    });

    Bridge.define("LRCEngine.Rotation90", {
        $kind: "enum",
        statics: {
            fields: {
                None: 0,
                Rot90: 1,
                Rot180: 2,
                Rot270: 3
            }
        }
    });

    Bridge.define("LRCEngine.Splash", {
        fields: {
            text: null,
            alignment: 0,
            font: null,
            icon: null,
            pos: null,
            velocity: null,
            color: null,
            lifetime: 0,
            drag: 0,
            gravity: 0
        },
        props: {
            alive: false
        },
        ctors: {
            init: function () {
                this.pos = new Microsoft.Xna.Framework.Vector2();
                this.velocity = new Microsoft.Xna.Framework.Vector2();
                this.color = new Microsoft.Xna.Framework.Color();
            },
            ctor: function (text, alignment, font, color, pos, velocity, drag, gravity, lifeSeconds) {
                this.$initialize();
                this.text = text;
                this.alignment = alignment;
                this.font = font;
                this.color = color.$clone();
                this.pos = pos.$clone();
                this.velocity = velocity.$clone();
                this.drag = drag;
                this.gravity = gravity;
                this.lifetime = Bridge.Int.clip32(lifeSeconds * 30);
                this.alive = true;
            }
        },
        methods: {
            Update: function () {
                this.lifetime = (this.lifetime - 1) | 0;
                if (this.lifetime <= 0) {
                    this.alive = false;
                } else {
                    this.velocity.Y += this.gravity;
                    this.velocity = Microsoft.Xna.Framework.Vector2.op_Multiply$1(this.velocity.$clone(), this.drag);
                    this.pos = Microsoft.Xna.Framework.Vector2.op_Addition(this.pos.$clone(), this.velocity.$clone());
                }
            },
            Draw: function (spriteBatch) {
                if (this.text != null) {
                    LRCEngine.LRCEngineExtensions.DrawString(spriteBatch, this.font, this.text, this.pos.$clone(), this.alignment, this.color.$clone());
                }

                if (this.icon != null) {
                    spriteBatch.Draw(this.icon, new Microsoft.Xna.Framework.Rectangle.$ctor2(Bridge.Int.clip32(this.pos.X), Bridge.Int.clip32(this.pos.Y), this.icon.Width, this.icon.Height), this.color.$clone());
                }
            }
        }
    });

    Bridge.define("LRCEngine.SplashManager", {
        fields: {
            splashes: null
        },
        ctors: {
            init: function () {
                this.splashes = new (System.Collections.Generic.List$1(LRCEngine.Splash))();
            }
        },
        methods: {
            Add: function (s) {
                this.splashes.add(s);
            },
            Update: function () {
                var $t, $t1;
                var numDead = 0;
                $t = Bridge.getEnumerator(this.splashes);
                try {
                    while ($t.moveNext()) {
                        var s = $t.Current;
                        if (s.alive) {
                            s.Update();
                        } else {
                            numDead = (numDead + 1) | 0;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                var GARBAGE_COLLECT_THRESHOLD = 3;
                if (numDead === this.splashes.Count) {
                    this.splashes.clear();
                } else if (numDead > GARBAGE_COLLECT_THRESHOLD) {
                    var newList = new (System.Collections.Generic.List$1(LRCEngine.Splash))();
                    $t1 = Bridge.getEnumerator(this.splashes);
                    try {
                        while ($t1.moveNext()) {
                            var s1 = $t1.Current;
                            newList.add(s1);
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$dispose();
                        }
                    }this.splashes = newList;
                }
            },
            Draw: function (spriteBatch) {
                var $t;
                $t = Bridge.getEnumerator(this.splashes);
                try {
                    while ($t.moveNext()) {
                        var s = $t.Current;
                        if (s.alive) {
                            s.Draw(spriteBatch);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }}
        }
    });

    Bridge.define("LRCEngine.SpriteObject", {
        fields: {
            pos: null,
            _size: null,
            _scale: null,
            texture: null,
            textureRegion: null,
            color: null,
            layerDepth: 0
        },
        props: {
            size: {
                get: function () {
                    return this._size.$clone();
                },
                set: function (value) {
                    this._size = value.$clone();
                    this._scale = new Microsoft.Xna.Framework.Vector2.$ctor2(value.X / this.textureRegion.Width, value.Y / this.textureRegion.Height);
                }
            },
            bounds: {
                get: function () {
                    return new LRCEngine.Vectangle.$ctor1(this.pos.$clone(), this.size.$clone());
                }
            }
        },
        ctors: {
            init: function () {
                this.pos = new Microsoft.Xna.Framework.Vector2();
                this._size = new Microsoft.Xna.Framework.Vector2();
                this._scale = new Microsoft.Xna.Framework.Vector2();
                this.textureRegion = new Microsoft.Xna.Framework.Rectangle();
                this.color = new Microsoft.Xna.Framework.Color();
                this.color = Microsoft.Xna.Framework.Color.White.$clone();
            },
            ctor: function (texture, pos) {
                LRCEngine.SpriteObject.$ctor1.call(this, texture, pos, LRCEngine.LRCEngineExtensions.Size(texture));
            },
            $ctor1: function (texture, pos, size) {
                this.$initialize();
                this.texture = texture;
                this.pos = pos.$clone();
                this.textureRegion = new Microsoft.Xna.Framework.Rectangle.$ctor2(0, 0, texture.Width, texture.Height);
                this.size = size.$clone();
            },
            $ctor2: function (texture, pos, size, color) {
                LRCEngine.SpriteObject.$ctor1.call(this, texture, pos, size);
                this.color = color.$clone();
            },
            $ctor3: function (texture, pos, size, color, textureRegion) {
                this.$initialize();
                this.texture = texture;
                this.pos = pos.$clone();
                this.textureRegion = textureRegion.$clone();
                this.size = size.$clone();
                this.color = color.$clone();
            }
        },
        methods: {
            Draw: function (spriteBatch) {
                spriteBatch.Draw(this.texture, new Microsoft.Xna.Framework.Rectangle.$ctor1(this.pos.ToPoint(), this._scale.ToPoint()), this.color.$clone()); /* , textureRegion, color, 0, Vector2.Zero, */ /* _scale*/ /* ,*/ /* spriteEffects*/ /* , layerDepth*/ /* );*/
            }
        }
    });

    Bridge.define("LRCEngine.TextAlignment", {
        $kind: "enum",
        statics: {
            fields: {
                LEFT: 0,
                CENTER: 1,
                RIGHT: 2
            }
        }
    });

    Bridge.define("LRCEngine.Tooltip", {
        statics: {
            methods: {
                DrawTooltip: function (spriteBatch, font, bg, text, origin, align) {
                    var $t, $t1;
                    var lineHeight = 0;
                    var maxWidth = 0;
                    $t = Bridge.getEnumerator(text);
                    try {
                        while ($t.moveNext()) {
                            var s = $t.Current;
                            var lineSize = font.MeasureString(s);
                            if (lineSize.X > maxWidth) {
                                maxWidth = lineSize.X;
                            }
                            if (lineSize.Y > lineHeight) {
                                lineHeight = lineSize.Y;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }
                    var padding = new Microsoft.Xna.Framework.Vector2.$ctor2(4, 2);

                    if (align === LRCEngine.Tooltip.Align.RIGHT) {
                        origin.X -= (maxWidth + padding.X * 2);
                    } else {
                        if (align === LRCEngine.Tooltip.Align.CENTER) {
                            origin.X -= Bridge.Int.clip32((maxWidth + padding.X * 2) / 2);
                        }
                    }

                    bg.Draw(spriteBatch, new Microsoft.Xna.Framework.Rectangle.$ctor2(Bridge.Int.clip32(origin.X), Bridge.Int.clip32(origin.Y), Bridge.Int.clip32(maxWidth + padding.X * 2), Bridge.Int.clip32(text.Count * lineHeight + padding.Y * 2)));
                    var stringPos = Microsoft.Xna.Framework.Vector2.op_Addition(origin.$clone(), new Microsoft.Xna.Framework.Vector2.$ctor2(padding.X, padding.Y));
                    $t1 = Bridge.getEnumerator(text);
                    try {
                        while ($t1.moveNext()) {
                            var s1 = $t1.Current;
                            spriteBatch.DrawString(font, s1, stringPos.$clone(), Microsoft.Xna.Framework.Color.Black.$clone());
                            stringPos = new Microsoft.Xna.Framework.Vector2.$ctor2(stringPos.X, stringPos.Y + lineHeight);
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$dispose();
                        }
                    }},
                StringToLines: function (text, font, maxWidth) {
                    var $t;
                    var words = System.String.split(text, System.Array.init([32], System.Char).map(function(i) {{ return String.fromCharCode(i); }}), null, 1);
                    var result = new (System.Collections.Generic.List$1(System.String))();
                    var currentLine = "";
                    var spaceWidth = font.MeasureString(" ").X;
                    var currentWidth = 0;
                    $t = Bridge.getEnumerator(words);
                    try {
                        while ($t.moveNext()) {
                            var word = $t.Current;
                            var stringSize = font.MeasureString(word);
                            if (currentWidth > 0 && currentWidth + stringSize.X > maxWidth) {
                                result.add(currentLine);
                                currentWidth = 0;
                                currentLine = "";
                            }

                            if (currentWidth > 0) {
                                currentLine = System.String.concat(currentLine, " ");
                                currentWidth += spaceWidth;
                            }

                            currentWidth += stringSize.X;
                            currentLine = System.String.concat(currentLine, word);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }result.add(currentLine);
                    return result;
                }
            }
        }
    });

    Bridge.define("LRCEngine.Tooltip.Align", {
        $kind: "enum",
        statics: {
            fields: {
                LEFT: 0,
                RIGHT: 1,
                CENTER: 2
            }
        }
    });

    Bridge.define("LRCEngine.UIMouseResponder", {
        $kind: "interface"
    });

    Bridge.define("LRCEngine.UIButtonAppearance", {
        fields: {
            font: null,
            textColor: null,
            image: null,
            textOffset: null,
            fillColor: null
        },
        ctors: {
            init: function () {
                this.textColor = new Microsoft.Xna.Framework.Color();
                this.textOffset = new Microsoft.Xna.Framework.Vector2();
                this.fillColor = new Microsoft.Xna.Framework.Color();
            },
            ctor: function (font, textColor, image, fillColor) {
                this.$initialize();
                this.font = font;
                this.textColor = textColor.$clone();
                this.image = image;
                this.fillColor = fillColor.$clone();
            },
            $ctor1: function (font, textColor, image, fillColor, textOffset) {
                this.$initialize();
                this.font = font;
                this.textColor = textColor.$clone();
                this.image = image;
                this.fillColor = fillColor.$clone();
                this.textOffset = textOffset.$clone();
            }
        },
        methods: {
            Draw: function (spriteBatch, label, icon, frame) {
                this.image.Draw$1(spriteBatch, frame.$clone(), this.fillColor.$clone());
                //            MagicUI.Draw9Grid(spriteBatch, texture, frame, fillColor);
                //            spriteBatch.Draw(texture, frame, fillColor);

                if (icon != null) {
                    if (this.font != null) {
                        // icon and text
                        var labelSize = this.font.MeasureString(label);
                        var iconSpacing = 2;
                        var iconOrigin = Microsoft.Xna.Framework.Vector2.op_Subtraction(Microsoft.Xna.Framework.Vector2.op_Addition(frame.Center.ToVector2(), this.textOffset.$clone()), Microsoft.Xna.Framework.Vector2.op_Division$1(new Microsoft.Xna.Framework.Vector2.$ctor2(labelSize.X + icon.Width + iconSpacing, icon.Height), 2));
                        var textOrigin = new Microsoft.Xna.Framework.Vector2.$ctor2(Bridge.Int.clip32(iconOrigin.X + icon.Width + iconSpacing), Bridge.Int.clip32(frame.Center.Y + this.textOffset.$clone().Y - labelSize.Y / 2));
                        spriteBatch.Draw$3(icon, iconOrigin.$clone(), Microsoft.Xna.Framework.Color.White.$clone());
                        spriteBatch.DrawString(this.font, label, textOrigin.$clone(), this.textColor.$clone());
                    } else {
                        // icon only
                        spriteBatch.Draw$3(icon, Microsoft.Xna.Framework.Vector2.op_Subtraction(Microsoft.Xna.Framework.Vector2.op_Addition(frame.Center.ToVector2(), this.textOffset.$clone()), Microsoft.Xna.Framework.Vector2.op_Division$1(LRCEngine.LRCEngineExtensions.Size(icon), 2)), Microsoft.Xna.Framework.Color.White.$clone());
                    }
                } else if (this.font != null) {
                    // text only
                    var labelSize1 = this.font.MeasureString(label);
                    spriteBatch.DrawString(this.font, label, new Microsoft.Xna.Framework.Vector2.$ctor2(Math.floor(frame.Center.X + this.textOffset.$clone().X - labelSize1.X / 2), Math.floor(frame.Center.Y + this.textOffset.$clone().Y - labelSize1.Y / 2)), this.textColor.$clone());
                }
            }
        }
    });

    Bridge.define("LRCEngine.UIButtonStyle", {
        fields: {
            normal: null,
            hover: null,
            pressed: null,
            disabled: null
        },
        ctors: {
            ctor: function (normal, hover, pressed, disabled) {
                this.$initialize();
                this.normal = normal;
                this.hover = hover;
                this.pressed = pressed;
                this.disabled = disabled;
            }
        }
    });

    Bridge.define("LRCEngine.UIRadioButtonGroup$1", function (T) { return {
        fields: {
            selectedButton: null
        },
        props: {
            selectedValue: {
                get: function () {
                    return this.selectedButton.value;
                }
            }
        }
    }; });

    Bridge.define("LRCEngine.Vectangle", {
        $kind: "struct",
        statics: {
            methods: {
                BoundingBox: function (a, b) {
                    var origin = new Microsoft.Xna.Framework.Vector2.$ctor2(Math.min(a.X, b.X), Math.min(a.Y, b.Y));
                    var botRight = new Microsoft.Xna.Framework.Vector2.$ctor2(Math.max(a.X, b.X), Math.max(a.Y, b.Y));
                    return new LRCEngine.Vectangle.$ctor1(origin.$clone(), Microsoft.Xna.Framework.Vector2.op_Subtraction(botRight.$clone(), origin.$clone()));
                },
                getDefaultValue: function () { return new LRCEngine.Vectangle(); }
            }
        },
        fields: {
            X: 0,
            Y: 0,
            Width: 0,
            Height: 0
        },
        props: {
            Origin: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.X, this.Y);
                },
                set: function (value) {
                    this.X = value.X;
                    this.Y = value.Y;
                }
            },
            Size: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.Width, this.Height);
                },
                set: function (value) {
                    this.Width = value.X;
                    this.Height = value.Y;
                }
            },
            MaxX: {
                get: function () {
                    return this.X + this.Width;
                }
            },
            MaxY: {
                get: function () {
                    return this.Y + this.Height;
                }
            },
            XY: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.X, this.Y);
                }
            },
            LeftSide: {
                get: function () {
                    return new LRCEngine.Vectangle.$ctor2(this.X, this.Y, 0, this.Height);
                }
            },
            RightSide: {
                get: function () {
                    return new LRCEngine.Vectangle.$ctor2(this.X + this.Width, this.Y, 0, this.Height);
                }
            },
            TopSide: {
                get: function () {
                    return new LRCEngine.Vectangle.$ctor2(this.X, this.Y, this.Width, 0);
                }
            },
            BottomSide: {
                get: function () {
                    return new LRCEngine.Vectangle.$ctor2(this.X, this.Y + this.Height, this.Width, 0);
                }
            },
            Top: {
                get: function () {
                    return this.Y;
                }
            },
            Bottom: {
                get: function () {
                    return this.Y + this.Height;
                }
            },
            Left: {
                get: function () {
                    return this.X;
                }
            },
            Right: {
                get: function () {
                    return this.X + this.Width;
                }
            },
            CenterX: {
                get: function () {
                    return this.X + this.Width / 2;
                }
            },
            CenterY: {
                get: function () {
                    return this.Y + this.Height / 2;
                }
            },
            TopLeft: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.Left, this.Top);
                }
            },
            TopCenter: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.CenterX, this.Top);
                }
            },
            TopRight: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.Right, this.Top);
                }
            },
            CenterLeft: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.Left, this.CenterY);
                }
            },
            Center: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.CenterX, this.CenterY);
                }
            },
            CenterRight: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.Right, this.CenterY);
                }
            },
            BottomLeft: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.Left, this.Bottom);
                }
            },
            BottomCenter: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.CenterX, this.Bottom);
                }
            },
            BottomRight: {
                get: function () {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(this.Right, this.Bottom);
                }
            }
        },
        ctors: {
            $ctor2: function (aX, aY, aWidth, aHeight) {
                this.$initialize();
                this.X = aX;
                this.Y = aY;
                this.Width = aWidth;
                this.Height = aHeight;
            },
            $ctor1: function (origin, size) {
                this.$initialize();
                this.X = origin.X;
                this.Y = origin.Y;
                this.Width = size.X;
                this.Height = size.Y;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            Contains$1: function (point) {
                return this.X <= point.X && this.Y <= point.Y && this.X + this.Width > point.X && this.Y + this.Height > point.Y;
            },
            Contains: function (other) {
                return this.X <= other.X && this.Y <= other.Y && this.X + this.Width >= other.X + other.Width && this.Y + this.Height >= other.Y + other.Height;
            },
            Intersects: function (other) {
                return this.X <= other.X + other.Width && this.Y <= other.Y + other.Height && this.X + this.Width >= other.X && this.Y + this.Height >= other.Y;
            },
            Bloat: function (amount) {
                return new LRCEngine.Vectangle.$ctor2(this.X - amount, this.Y - amount, this.Width + amount * 2, this.Height + amount * 2);
            },
            Bloat$1: function (bX, bY) {
                return new LRCEngine.Vectangle.$ctor2(this.X - bX, this.Y - bY, this.Width + bX * 2, this.Height + bY * 2);
            },
            getHashCode: function () {
                var h = Bridge.addHash([3771388956, this.X, this.Y, this.Width, this.Height]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, LRCEngine.Vectangle)) {
                    return false;
                }
                return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y) && Bridge.equals(this.Width, o.Width) && Bridge.equals(this.Height, o.Height);
            },
            $clone: function (to) {
                var s = to || new LRCEngine.Vectangle();
                s.X = this.X;
                s.Y = this.Y;
                s.Width = this.Width;
                s.Height = this.Height;
                return s;
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
                                    $task1 = System.Linq.Enumerable.from(this.Hand.cards).orderBy($asm.$.HandGames.AIPlayer.f1).first().Play();
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
                                        $tcs.setResult(System.Linq.Enumerable.from(this.Game.players).orderBy($asm.$.HandGames.AIPlayer.f2).thenBy($asm.$.HandGames.AIPlayer.f3).first());
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
                                        this.cardsToDraw = this.Game.cardImages;
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
                    mouseState, 
                    $t, 
                    card, 
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
                                    mouseState = Microsoft.Xna.Framework.Input.Mouse.GetState();
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
                                    if (this.Hand.GetDrawingPosition(card).DrawPosition.Contains(mouseState.Position.$clone())) {
                                        $step = 4;
                                        continue;
                                    } else  {
                                        $step = 9;
                                        continue;
                                    }
                                }
                                case 4: {
                                    if (mouseState.LeftButton !== Microsoft.Xna.Framework.Input.ButtonState.Pressed) {
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
                                    $step = 8;
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
                                            if (state.LeftButton === Microsoft.Xna.Framework.Input.ButtonState.Pressed) {
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
                $t = Bridge.getEnumerator(this.Game.discardPile.cards);
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
                    $t = Bridge.getEnumerator(player.Hand.cards);
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

    Bridge.define("LRCEngine.DrawMode_Fitted", {
        inherits: [LRCEngine.IDrawMode],
        alias: ["Draw", "LRCEngine$IDrawMode$Draw"],
        methods: {
            Draw: function (spriteBatch, rect, texture, color, rotation) {
                var textureAspect = texture.Width / texture.Height;
                var rectAspect = rect.Width / rect.Height;

                var scale;
                if (textureAspect > rectAspect) {
                    // fit width
                    scale = rect.Width / texture.Width;
                } else {
                    scale = rect.Height / texture.Height;
                }

                var drawRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(Bridge.Int.clip32(rect.X + 0.5 * (rect.Width - texture.Width * scale)), Bridge.Int.clip32(rect.Y + 0.5 * (rect.Height - texture.Height * scale)), Bridge.Int.clip32(texture.Width * scale), Bridge.Int.clip32(texture.Height * scale));
                spriteBatch.Draw(texture, drawRect.$clone(), color.$clone());
            }
        }
    });

    Bridge.define("LRCEngine.DrawMode_Fixed", {
        inherits: [LRCEngine.IDrawMode],
        alias: ["Draw", "LRCEngine$IDrawMode$Draw"],
        methods: {
            Draw: function (spriteBatch, rect, texture, color, rotation) {
                spriteBatch.Draw$3(texture, new Microsoft.Xna.Framework.Vector2.$ctor2(rect.Left, rect.Top), color.$clone());
            }
        }
    });

    Bridge.define("LRCEngine.DrawMode_Stretch9Grid", {
        inherits: [LRCEngine.IDrawMode],
        alias: ["Draw", "LRCEngine$IDrawMode$Draw"],
        methods: {
            Draw: function (spriteBatch, rect, texture, color, rotation) {
                var nonStretchWidth = (Bridge.Int.div(texture.Width, 2)) | 0;
                var nonStretchHeight = (Bridge.Int.div(texture.Height, 2)) | 0;

                var texMiddleWidth = (texture.Width - ((nonStretchWidth * 2) | 0)) | 0;
                var texMiddleHeight = (texture.Height - ((nonStretchHeight * 2) | 0)) | 0;
                var texRightEdgeX = (texture.Width - nonStretchWidth) | 0;
                var texBottomEdgeY = (texture.Height - nonStretchHeight) | 0;

                var screenMiddleWidth = (rect.Width - ((nonStretchWidth * 2) | 0)) | 0;
                var screenMiddleHeight = (rect.Height - ((nonStretchHeight * 2) | 0)) | 0;
                var rightEdgeX = (((rect.X + rect.Width) | 0) - nonStretchWidth) | 0;
                var bottomEdgeY = (((rect.Y + rect.Height) | 0) - nonStretchHeight) | 0;

                // TL, top, TR
                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rect.X, rect.Y, nonStretchWidth, nonStretchHeight), new Microsoft.Xna.Framework.Rectangle.$ctor2(0, 0, nonStretchWidth, nonStretchHeight), color.$clone());
                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(((rect.X + nonStretchWidth) | 0), rect.Y, screenMiddleWidth, nonStretchHeight), new Microsoft.Xna.Framework.Rectangle.$ctor2(nonStretchWidth, 0, texMiddleWidth, nonStretchHeight), color.$clone());
                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rightEdgeX, rect.Y, nonStretchWidth, nonStretchHeight), new Microsoft.Xna.Framework.Rectangle.$ctor2(texRightEdgeX, 0, nonStretchWidth, nonStretchHeight), color.$clone());

                // left, center, right
                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rect.X, ((rect.Y + nonStretchHeight) | 0), nonStretchWidth, screenMiddleHeight), new Microsoft.Xna.Framework.Rectangle.$ctor2(0, nonStretchHeight, nonStretchWidth, texMiddleHeight), color.$clone());
                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(((rect.X + nonStretchWidth) | 0), ((rect.Y + nonStretchHeight) | 0), screenMiddleWidth, screenMiddleHeight), new Microsoft.Xna.Framework.Rectangle.$ctor2(nonStretchWidth, nonStretchHeight, texMiddleWidth, texMiddleHeight), color.$clone());
                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rightEdgeX, ((rect.Y + nonStretchHeight) | 0), nonStretchWidth, screenMiddleHeight), new Microsoft.Xna.Framework.Rectangle.$ctor2(texRightEdgeX, nonStretchHeight, nonStretchWidth, texMiddleHeight), color.$clone());

                // BL, bottom, BR
                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rect.X, bottomEdgeY, nonStretchWidth, nonStretchHeight), new Microsoft.Xna.Framework.Rectangle.$ctor2(0, texBottomEdgeY, nonStretchWidth, nonStretchHeight), color.$clone());
                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(((rect.X + nonStretchWidth) | 0), bottomEdgeY, screenMiddleWidth, nonStretchHeight), new Microsoft.Xna.Framework.Rectangle.$ctor2(nonStretchWidth, texBottomEdgeY, texMiddleWidth, nonStretchHeight), color.$clone());
                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rightEdgeX, bottomEdgeY, nonStretchWidth, nonStretchHeight), new Microsoft.Xna.Framework.Rectangle.$ctor2(texRightEdgeX, texBottomEdgeY, nonStretchWidth, nonStretchHeight), color.$clone());
            }
        }
    });

    Bridge.define("LRCEngine.DrawMode_Stretched", {
        inherits: [LRCEngine.IDrawMode],
        alias: ["Draw", "LRCEngine$IDrawMode$Draw"],
        methods: {
            Draw: function (spriteBatch, rect, texture, color, rotation) {
                var rot = 0.0;
                var rotWidth = rect.Width;
                var rotHeight = rect.Height;
                if (rotation === LRCEngine.Rotation90.None) {
                    spriteBatch.Draw(texture, rect.$clone(), color.$clone());
                    return;
                }

                if (rotation === LRCEngine.Rotation90.Rot90) {
                    rot = 1.57079637;
                    rotWidth = rect.Height;
                    rotHeight = rect.Width;
                } else if (rotation === LRCEngine.Rotation90.Rot180) {
                    rot = 3.14159274;
                } else if (rotation === LRCEngine.Rotation90.Rot270) {
                    rot = 4.712389;
                    rotWidth = rect.Height;
                    rotHeight = rect.Width;
                }

                var halfWidth = (Bridge.Int.div(rect.Width, 2)) | 0;
                var halfHeight = (Bridge.Int.div(rect.Height, 2)) | 0;

                var rotRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(((rect.X + halfWidth) | 0), ((rect.Y + halfHeight) | 0), rotWidth, rotHeight);

                // origin would be <texture.Width/2, texture.Height/2>, if halfWidth and halfHeight weren't rounded
                var origin = new Microsoft.Xna.Framework.Vector2.$ctor2(texture.Width * (halfWidth / rect.Width), texture.Height * (halfHeight / rect.Height));

                spriteBatch.Draw$2(texture, rotRect.$clone(), null, color.$clone(), rot, origin.$clone(), Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0);
            }
        }
    });

    Bridge.define("LRCEngine.DrawMode_Tiled", {
        inherits: [LRCEngine.IDrawMode],
        alias: ["Draw", "LRCEngine$IDrawMode$Draw"],
        methods: {
            Draw: function (spriteBatch, rect, texture, color, rotation) {
                for (var X = rect.X; X < ((rect.X + rect.Width) | 0); X = (X + texture.Width) | 0) {
                    for (var Y = rect.Y; Y < ((rect.Y + rect.Height) | 0); Y = (Y + texture.Height) | 0) {
                        spriteBatch.Draw$3(texture, new Microsoft.Xna.Framework.Vector2.$ctor2(X, Y), color.$clone());
                    }
                }
            }
        }
    });

    Bridge.define("LRCEngine.DrawMode_Tiled9Grid", {
        inherits: [LRCEngine.IDrawMode],
        alias: ["Draw", "LRCEngine$IDrawMode$Draw"],
        methods: {
            Draw: function (spriteBatch, rect, texture, color, rotation) {
                // man, this is fiddly
                var fragmentW = (Bridge.Int.div(texture.Width, 4)) | 0;
                var fragmentH = (Bridge.Int.div(texture.Height, 4)) | 0;
                var rightEdgeX = (((rect.X + rect.Width) | 0) - fragmentW) | 0;
                var bottomEdgeY = (((rect.Y + rect.Height) | 0) - fragmentH) | 0;
                var X;
                var Y = (rect.Y + fragmentH) | 0;
                for (X = (rect.X + fragmentW) | 0; X <= ((((rect.X + rect.Width) | 0) - ((fragmentW * 3) | 0)) | 0); X = (X + (((fragmentW * 2) | 0))) | 0) {
                    // top
                    spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(X, rect.Y, ((fragmentW * 2) | 0), fragmentH), new Microsoft.Xna.Framework.Rectangle.$ctor2(fragmentW, 0, ((fragmentW * 2) | 0), fragmentH), color.$clone());
                    // middles
                    for (Y = (rect.Y + fragmentH) | 0; Y <= ((((rect.Y + rect.Height) | 0) - ((fragmentH * 3) | 0)) | 0); Y = (Y + (((fragmentH * 2) | 0))) | 0) {
                        spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(X, Y, ((fragmentW * 2) | 0), ((fragmentH * 2) | 0)), new Microsoft.Xna.Framework.Rectangle.$ctor2(fragmentW, fragmentH, ((fragmentW * 2) | 0), ((fragmentH * 2) | 0)), color.$clone());
                    }
                    // bottom gap-fill
                    if (Y < bottomEdgeY) {
                        var fillY = (bottomEdgeY - Y) | 0;
                        spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(X, Y, ((fragmentW * 2) | 0), fillY), new Microsoft.Xna.Framework.Rectangle.$ctor2(fragmentW, fragmentH, ((fragmentW * 2) | 0), fillY), color.$clone());
                    }
                    // bottom
                    spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(X, bottomEdgeY, ((fragmentW * 2) | 0), fragmentH), new Microsoft.Xna.Framework.Rectangle.$ctor2(fragmentW, ((fragmentH * 3) | 0), ((fragmentW * 2) | 0), fragmentH), color.$clone());
                }

                var finalX = X;
                var finalY = Y;
                var fillW = (rightEdgeX - finalX) | 0;
                var fillH = (bottomEdgeY - finalY) | 0;

                // bottom-right corner gap fill
                if (fillW > 0 && fillH > 0) {
                    spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(finalX, finalY, fillW, fillH), new Microsoft.Xna.Framework.Rectangle.$ctor2(fragmentW, fragmentH, fillW, fillH), color.$clone());
                }

                // edge gap fill
                if (fillW > 0) {
                    // top
                    spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(finalX, rect.Y, fillW, fragmentH), new Microsoft.Xna.Framework.Rectangle.$ctor2(fragmentW, 0, fillW, fragmentH), color.$clone());
                    // bottom
                    spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(finalX, bottomEdgeY, fillW, fragmentH), new Microsoft.Xna.Framework.Rectangle.$ctor2(fragmentW, ((fragmentH * 3) | 0), fillW, fragmentH), color.$clone());
                }
                if (fillH > 0) {
                    // left
                    spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rect.X, finalY, fragmentW, fillH), new Microsoft.Xna.Framework.Rectangle.$ctor2(0, fragmentH, fragmentW, fillH), color.$clone());
                    // right 
                    spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rightEdgeX, finalY, fragmentW, fillH), new Microsoft.Xna.Framework.Rectangle.$ctor2(((fragmentW * 3) | 0), fragmentH, fragmentW, fillH), color.$clone());
                }

                for (Y = (rect.Y + fragmentH) | 0; Y <= ((((rect.Y + rect.Height) | 0) - ((fragmentH * 3) | 0)) | 0); Y = (Y + (((fragmentH * 2) | 0))) | 0) {
                    // left
                    spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rect.X, Y, fragmentW, ((fragmentH * 2) | 0)), new Microsoft.Xna.Framework.Rectangle.$ctor2(0, fragmentH, fragmentW, ((fragmentH * 2) | 0)), color.$clone());
                    // right
                    spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rightEdgeX, Y, fragmentW, ((fragmentH * 2) | 0)), new Microsoft.Xna.Framework.Rectangle.$ctor2(((fragmentW * 3) | 0), fragmentH, fragmentW, ((fragmentH * 2) | 0)), color.$clone());
                    // right gap-fill
                    spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(finalX, Y, fillW, ((fragmentH * 2) | 0)), new Microsoft.Xna.Framework.Rectangle.$ctor2(fragmentW, fragmentH, fillW, ((fragmentH * 2) | 0)), color.$clone());
                }

                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rect.X, rect.Y, fragmentW, fragmentH), new Microsoft.Xna.Framework.Rectangle.$ctor2(0, 0, fragmentW, fragmentH), color.$clone());
                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rightEdgeX, bottomEdgeY, fragmentW, fragmentH), new Microsoft.Xna.Framework.Rectangle.$ctor2(((fragmentW * 3) | 0), ((fragmentH * 3) | 0), fragmentW, fragmentH), color.$clone());
                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rect.X, bottomEdgeY, fragmentW, fragmentH), new Microsoft.Xna.Framework.Rectangle.$ctor2(0, ((fragmentH * 3) | 0), fragmentW, fragmentH), color.$clone());
                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rightEdgeX, rect.Y, fragmentW, fragmentH), new Microsoft.Xna.Framework.Rectangle.$ctor2(((fragmentW * 3) | 0), 0, fragmentW, fragmentH), color.$clone());
            }
        }
    });

    Bridge.define("LRCEngine.DrawMode_TiledProgressBar", {
        inherits: [LRCEngine.IDrawMode],
        alias: ["Draw", "LRCEngine$IDrawMode$Draw"],
        methods: {
            Draw: function (spriteBatch, rect, texture, color, rotation) {
                var leftEndWidth = (Bridge.Int.div(texture.Width, 4)) | 0;
                var tileSize = (Bridge.Int.div(texture.Width, 2)) | 0;
                var rightEndWidth = (((texture.Width - tileSize) | 0) - leftEndWidth) | 0;
                var tiledAreaWidth = (((rect.Width - leftEndWidth) | 0) - rightEndWidth) | 0;
                var tileCount = Bridge.Int.clip32(Bridge.Math.round(tiledAreaWidth / tileSize, 0, 6));
                var tileSpacing = Bridge.Int.clip32(Math.ceil(tiledAreaWidth / tileCount));

                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(rect.X, rect.Y, leftEndWidth, rect.Height), new Microsoft.Xna.Framework.Rectangle.$ctor2(0, 0, leftEndWidth, texture.Height), color.$clone());
                for (var X = 0; X < tiledAreaWidth; X = (X + tileSpacing) | 0) {
                    spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(((((rect.X + leftEndWidth) | 0) + X) | 0), rect.Y, tileSpacing, rect.Height), new Microsoft.Xna.Framework.Rectangle.$ctor2(leftEndWidth, 0, tileSize, texture.Height), color.$clone());
                }
                spriteBatch.Draw$1(texture, new Microsoft.Xna.Framework.Rectangle.$ctor2(((((rect.X + rect.Width) | 0) - rightEndWidth) | 0), rect.Y, rightEndWidth, rect.Height), new Microsoft.Xna.Framework.Rectangle.$ctor2(((texture.Width - rightEndWidth) | 0), 0, rightEndWidth, texture.Height), color.$clone());
            }
        }
    });

    Bridge.define("LRCEngine.JSONArray_JSONArrays", {
        inherits: [LRCEngine.JSONArrayEnumerator$1(LRCEngine.JSONArray)],
        props: {
            Current: {
                get: function () {
                    return new LRCEngine.JSONArray.$ctor1(Bridge.cast(this.baseEnumerator.System$Collections$IEnumerator$Current, System.Array.type(System.Object)));
                }
            }
        },
        alias: ["Current", ["System$Collections$Generic$IEnumerator$1$LRCEngine$JSONArray$Current$1", "System$Collections$Generic$IEnumerator$1$Current$1"],
        "Current", "System$Collections$IEnumerator$Current"],
        ctors: {
            ctor: function (aBaseEnumerator) {
                this.$initialize();
                LRCEngine.JSONArrayEnumerator$1(LRCEngine.JSONArray).ctor.call(this, aBaseEnumerator);
            }
        }
    });

    Bridge.define("LRCEngine.JSONArray_JSONTables", {
        inherits: [LRCEngine.JSONArrayEnumerator$1(LRCEngine.JSONTable)],
        props: {
            Current: {
                get: function () {
                    return new LRCEngine.JSONTable.$ctor1(Bridge.cast(this.baseEnumerator.System$Collections$IEnumerator$Current, System.Collections.Generic._Dictionary$2(System.String,System.Object)));
                }
            }
        },
        alias: ["Current", ["System$Collections$Generic$IEnumerator$1$LRCEngine$JSONTable$Current$1", "System$Collections$Generic$IEnumerator$1$Current$1"],
        "Current", "System$Collections$IEnumerator$Current"],
        ctors: {
            ctor: function (aBaseEnumerator) {
                this.$initialize();
                LRCEngine.JSONArrayEnumerator$1(LRCEngine.JSONTable).ctor.call(this, aBaseEnumerator);
            }
        }
    });

    Bridge.define("LRCEngine.RichImageLayer_Image", {
        inherits: [LRCEngine.RichImageLayer],
        fields: {
            image: null,
            rotation: 0
        },
        alias: ["Draw", "LRCEngine$RichImageLayer$Draw"],
        ctors: {
            ctor: function (aImage, aRotation) {
                this.$initialize();
                this.image = aImage;
                this.rotation = aRotation;
            }
        },
        methods: {
            Draw: function (spriteBatch, rect, col, aRotation) {
                this.image.Draw$2(spriteBatch, rect.$clone(), col.$clone(), LRCEngine.LRCEngineExtensions.rotateBy(this.rotation, aRotation));
            }
        }
    });

    Bridge.define("LRCEngine.RichImageLayer_Texture", {
        inherits: [LRCEngine.RichImageLayer],
        statics: {
            fields: {
                drawModesByName: null,
                drawModes: null
            },
            ctors: {
                init: function () {
                    this.drawModesByName = $asm.$.LRCEngine.RichImageLayer_Texture.f1(new (System.Collections.Generic._Dictionary$2(System.String,LRCEngine.IDrawMode)).ctor());
                    this.drawModes = $asm.$.LRCEngine.RichImageLayer_Texture.f2(new (System.Collections.Generic._Dictionary$2(LRCEngine.RichImageDrawMode,LRCEngine.IDrawMode)).ctor());
                }
            }
        },
        fields: {
            texture: null,
            color: null,
            drawMode: null,
            padding: 0,
            offset: null,
            rotation: 0,
            modifiesRect: false
        },
        alias: ["Draw", "LRCEngine$RichImageLayer$Draw"],
        ctors: {
            init: function () {
                this.color = new Microsoft.Xna.Framework.Color();
                this.offset = new Microsoft.Xna.Framework.Vector2();
            },
            $ctor1: function (aTexture, aColor, aDrawMode, aPadding, aRotation) {
                this.$initialize();
                this.texture = aTexture;
                this.color = aColor.$clone();
                this.drawMode = LRCEngine.RichImageLayer_Texture.drawModes.getItem(aDrawMode);
                this.padding = aPadding;
                this.rotation = aRotation;
                this.offset = Microsoft.Xna.Framework.Vector2.Zero.$clone();

                this.modifiesRect = (this.padding !== 0 || this.offset.X !== 0 || this.offset.Y !== 0);
            },
            $ctor2: function (aTexture, aColor, aDrawMode, aPadding, aRotation) {
                this.$initialize();
                this.texture = aTexture;
                this.color = aColor.$clone();
                this.drawMode = LRCEngine.RichImageLayer_Texture.drawModesByName.getItem(aDrawMode);
                this.padding = aPadding;
                this.rotation = aRotation;
                this.offset = Microsoft.Xna.Framework.Vector2.Zero.$clone();

                this.modifiesRect = (this.padding !== 0 || this.offset.X !== 0 || this.offset.Y !== 0);
            },
            ctor: function (template, content) {
                this.$initialize();
                this.texture = content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, template.getString$1("texture", "white"));
                this.color = LRCEngine.LRCEngineExtensions.toColor(template.getString$1("color", "FFFFFF"));
                this.drawMode = LRCEngine.RichImageLayer_Texture.drawModesByName.getItem(template.getString$1("draw", "default"));
                this.padding = template.getInt$1("padding", 0);

                var offsetArray = template.getArray$1("offset", null);
                if (offsetArray == null) {
                    this.offset = new Microsoft.Xna.Framework.Vector2.$ctor2(0, 0);
                } else {
                    this.offset = offsetArray.toVector2();
                }

                this.rotation = LRCEngine.LRCEngineExtensions.getRotation(template, "rotation", LRCEngine.Rotation90.None);

                this.modifiesRect = (this.padding !== 0 || this.offset.X !== 0 || this.offset.Y !== 0);
            }
        },
        methods: {
            Draw: function (spriteBatch, rect, inCol, aRotation) {
                var finalColor = LRCEngine.LRCEngineExtensions.Multiply(inCol, this.color.$clone());
                if (this.modifiesRect) {
                    this.drawMode.LRCEngine$IDrawMode$Draw(spriteBatch, new Microsoft.Xna.Framework.Rectangle.$ctor2(((((rect.X + Bridge.Int.clip32(this.offset.X)) | 0) - this.padding) | 0), ((((rect.Y + Bridge.Int.clip32(this.offset.Y)) | 0) - this.padding) | 0), ((rect.Width + ((this.padding * 2) | 0)) | 0), ((rect.Height + ((this.padding * 2) | 0)) | 0)), this.texture, finalColor.$clone(), LRCEngine.LRCEngineExtensions.rotateBy(this.rotation, aRotation));
                } else {
                    this.drawMode.LRCEngine$IDrawMode$Draw(spriteBatch, rect.$clone(), this.texture, finalColor.$clone(), LRCEngine.LRCEngineExtensions.rotateBy(this.rotation, aRotation));
                }
            }
        }
    });

    Bridge.ns("LRCEngine.RichImageLayer_Texture", $asm.$);

    Bridge.apply($asm.$.LRCEngine.RichImageLayer_Texture, {
        f1: function (_o4) {
            _o4.add("default", new LRCEngine.DrawMode_Stretched());
            _o4.add("stretched", new LRCEngine.DrawMode_Stretched());
            _o4.add("fixed", new LRCEngine.DrawMode_Fixed());
            _o4.add("fitted", new LRCEngine.DrawMode_Fitted());
            _o4.add("tiled", new LRCEngine.DrawMode_Tiled());
            _o4.add("tiled9grid", new LRCEngine.DrawMode_Tiled9Grid());
            _o4.add("stretched9grid", new LRCEngine.DrawMode_Stretch9Grid());
            _o4.add("tiledprogressbar", new LRCEngine.DrawMode_TiledProgressBar());
            return _o4;
        },
        f2: function (_o5) {
            _o5.add(LRCEngine.RichImageDrawMode.DEFAULT, new LRCEngine.DrawMode_Stretched());
            _o5.add(LRCEngine.RichImageDrawMode.STRETCHED, new LRCEngine.DrawMode_Stretched());
            _o5.add(LRCEngine.RichImageDrawMode.FIXED, new LRCEngine.DrawMode_Fixed());
            _o5.add(LRCEngine.RichImageDrawMode.FITTED, new LRCEngine.DrawMode_Fitted());
            _o5.add(LRCEngine.RichImageDrawMode.TILED, new LRCEngine.DrawMode_Tiled());
            _o5.add(LRCEngine.RichImageDrawMode.TILED9GRID, new LRCEngine.DrawMode_Tiled9Grid());
            _o5.add(LRCEngine.RichImageDrawMode.STRETCHED9GRID, new LRCEngine.DrawMode_Stretch9Grid());
            _o5.add(LRCEngine.RichImageDrawMode.TILEDPROGRESSBAR, new LRCEngine.DrawMode_TiledProgressBar());
            return _o5;
        }
    });

    Bridge.define("LRCEngine.UIElement", {
        inherits: [LRCEngine.UIMouseResponder],
        fields: {
            parent: null
        },
        methods: {
            Update: function (inputState) {
                this.Update$1(inputState, Microsoft.Xna.Framework.Vector2.Zero.$clone());
            },
            Draw: function (spriteBatch) {
                this.Draw$1(spriteBatch, Microsoft.Xna.Framework.Vector2.Zero.$clone());
            }
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
                                $step = System.Array.min([0,1], $step);
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
                                        aCompare = Bridge.cast((other.Hand.cards.getItem(0)), HandGames.Cards.LoveLetterCard).Value;
                                        bCompare = Bridge.cast((me.Hand.cards.getItem(0)), HandGames.Cards.LoveLetterCard).Value; //Workaround for #2918.
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

    Bridge.define("LRCEngine.UIButton", {
        inherits: [LRCEngine.UIElement],
        statics: {
            methods: {
                GetDefaultStyle: function (Content) {
                    var font = Content.Load(Microsoft.Xna.Framework.Graphics.SpriteFont, "Arial");
                    var normalImage = new LRCEngine.RichImage.$ctor2(new LRCEngine.RichImageLayer_Texture.$ctor2(Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "button3d"), Microsoft.Xna.Framework.Color.White.$clone(), "stretched9grid", 0, LRCEngine.Rotation90.None));
                    var hoverImage = new LRCEngine.RichImage.$ctor2(new LRCEngine.RichImageLayer_Texture.$ctor2(Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "button3d_hover"), Microsoft.Xna.Framework.Color.White.$clone(), "stretched9grid", 0, LRCEngine.Rotation90.None));
                    var pressedImage = new LRCEngine.RichImage.$ctor2(new LRCEngine.RichImageLayer_Texture.$ctor2(Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "button3d_pressed"), Microsoft.Xna.Framework.Color.White.$clone(), "stretched9grid", 0, LRCEngine.Rotation90.None));

                    return new LRCEngine.UIButtonStyle(new LRCEngine.UIButtonAppearance.ctor(font, Microsoft.Xna.Framework.Color.Black.$clone(), normalImage, Microsoft.Xna.Framework.Color.White.$clone()), new LRCEngine.UIButtonAppearance.ctor(font, Microsoft.Xna.Framework.Color.Black.$clone(), hoverImage, Microsoft.Xna.Framework.Color.White.$clone()), new LRCEngine.UIButtonAppearance.$ctor1(font, Microsoft.Xna.Framework.Color.Black.$clone(), pressedImage, Microsoft.Xna.Framework.Color.White.$clone(), new Microsoft.Xna.Framework.Vector2.$ctor2(0, 1)), new LRCEngine.UIButtonAppearance.ctor(font, Microsoft.Xna.Framework.Color.Black.$clone(), normalImage, Microsoft.Xna.Framework.Color.Gray.$clone()));
                }
            }
        },
        fields: {
            label: null,
            icon: null,
            frame: null,
            styles: null,
            mouseInside: false,
            pressedInside: false,
            enabled: false,
            visible: false
        },
        props: {
            onPress: null
        },
        alias: ["GetMouseHover", "LRCEngine$UIMouseResponder$GetMouseHover"],
        ctors: {
            init: function () {
                this.frame = new Microsoft.Xna.Framework.Rectangle();
                this.enabled = true;
                this.visible = true;
            },
            $ctor1: function (label, frame, styles, onPress) {
                this.$initialize();
                LRCEngine.UIElement.ctor.call(this);
                this.label = label;
                this.frame = frame.$clone();
                this.styles = styles;
                this.onPress = onPress;
            },
            ctor: function (label, icon, frame, styles, onPress) {
                this.$initialize();
                LRCEngine.UIElement.ctor.call(this);
                this.label = label;
                this.icon = icon;
                this.frame = frame.$clone();
                this.styles = styles;
                this.onPress = onPress;
            }
        },
        methods: {
            GetMouseHover: function (localMousePos) {
                return this.frame.Contains$2(localMousePos.$clone()) ? this : null;
            },
            Update$1: function (inputState, origin) {
                if (!this.enabled || !this.visible) {
                    this.mouseInside = false;
                    this.pressedInside = false;
                    return;
                }

                this.mouseInside = Bridge.referenceEquals(inputState.hoveringElement, this); // frame.Contains(inputState.MousePos - origin);
                if (this.mouseInside && inputState.WasMouseLeftJustPressed()) {
                    this.pressedInside = true;
                }

                if (!inputState.mouseLeft.isDown) {
                    if (this.mouseInside && this.pressedInside) {
                        this.Pressed();
                    }
                    this.pressedInside = false;
                }
            },
            Pressed: function () {
                if (!Bridge.staticEquals(this.onPress, null)) {
                    this.onPress();
                }
            },
            Draw$1: function (spriteBatch, origin) {
                if (!this.visible) {
                    return;
                }

                var currentStyle;
                if (!this.enabled) {
                    currentStyle = this.styles.disabled;
                } else if (this.mouseInside) {
                    if (this.pressedInside) {
                        currentStyle = this.styles.pressed;
                    } else {
                        currentStyle = this.styles.hover;
                    }
                } else {
                    currentStyle = this.styles.normal;
                }

                currentStyle.Draw(spriteBatch, this.label, this.icon, new Microsoft.Xna.Framework.Rectangle.$ctor2(((this.frame.X + Bridge.Int.clip32(origin.X)) | 0), ((this.frame.Y + Bridge.Int.clip32(origin.Y)) | 0), this.frame.Width, this.frame.Height));
            },
            SetEnabled: function (enabled) {
                this.enabled = enabled;
            },
            SetVisible: function (visible) {
                this.visible = visible;
            }
        }
    });

    Bridge.define("LRCEngine.UIContainer", {
        inherits: [LRCEngine.UIElement],
        fields: {
            origin: null,
            elements: null
        },
        alias: ["GetMouseHover", "LRCEngine$UIMouseResponder$GetMouseHover"],
        ctors: {
            init: function () {
                this.origin = new Microsoft.Xna.Framework.Vector2();
                this.elements = new (System.Collections.Generic.List$1(LRCEngine.UIElement))();
            },
            ctor: function () {
                this.$initialize();
                LRCEngine.UIElement.ctor.call(this);

            },
            $ctor1: function (origin) {
                this.$initialize();
                LRCEngine.UIElement.ctor.call(this);
                this.origin = origin.$clone();
            }
        },
        methods: {
            GetMouseHover: function (localMousePos) {
                var childMousePos = Microsoft.Xna.Framework.Vector2.op_Subtraction(localMousePos.$clone(), this.origin.$clone());
                for (var Idx = (this.elements.Count - 1) | 0; Idx >= 0; Idx = (Idx - 1) | 0) {
                    var selected = this.elements.getItem(Idx).GetMouseHover(childMousePos.$clone());
                    if (selected != null) {
                        return selected;
                    }
                }

                return null;
            },
            Update$1: function (inputState, origin) {
                var $t;
                var newOrigin = Microsoft.Xna.Framework.Vector2.op_Addition(origin.$clone(), this.origin.$clone());
                $t = Bridge.getEnumerator(this.elements);
                try {
                    while ($t.moveNext()) {
                        var element = $t.Current;
                        element.Update$1(inputState, newOrigin.$clone());
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            Draw$1: function (spriteBatch, origin) {
                var $t;
                var newOrigin = Microsoft.Xna.Framework.Vector2.op_Addition(origin.$clone(), this.origin.$clone());
                $t = Bridge.getEnumerator(this.elements);
                try {
                    while ($t.moveNext()) {
                        var element = $t.Current;
                        element.Draw$1(spriteBatch, newOrigin.$clone());
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            Add: function (element) {
                this.elements.add(element);
                element.parent = this;
            },
            Remove: function (element) {
                this.elements.remove(element);
                element.parent = null;
            },
            Clear: function () {
                var $t;
                $t = Bridge.getEnumerator(this.elements);
                try {
                    while ($t.moveNext()) {
                        var element = $t.Current;
                        element.parent = null;
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }this.elements.clear();
            }
        }
    });

    Bridge.define("LRCEngine.UIRadioButton$1", function (T) { return {
        inherits: [LRCEngine.UIButton],
        fields: {
            group: null,
            value: Bridge.getDefaultValue(T),
            activeAppearance: null,
            onRadioPress: null
        },
        ctors: {
            ctor: function (label, value, group, frame, styles, activeAppearance, onPress) {
                this.$initialize();
                LRCEngine.UIButton.$ctor1.call(this, label, frame, styles, onPress);
                this.group = group;
                this.value = value;
                this.activeAppearance = activeAppearance;
            },
            $ctor1: function (label, value, group, frame, styles, activeAppearance, onRadioPress) {
                this.$initialize();
                LRCEngine.UIButton.$ctor1.call(this, label, frame, styles, null);
                this.group = group;
                this.value = value;
                this.activeAppearance = activeAppearance;
                this.onRadioPress = onRadioPress;
            }
        },
        methods: {
            Pressed: function () {
                this.group.selectedButton = this;

                if (!Bridge.staticEquals(this.onRadioPress, null)) {
                    this.onRadioPress(this.value);
                }

                LRCEngine.UIButton.prototype.Pressed.call(this);
            },
            Draw$1: function (spriteBatch, origin) {
                if (Bridge.referenceEquals(this.group.selectedButton, this)) {
                    this.activeAppearance.Draw(spriteBatch, this.label, this.icon, new Microsoft.Xna.Framework.Rectangle.$ctor2(((this.frame.X + Bridge.Int.clip32(origin.X)) | 0), ((this.frame.Y + Bridge.Int.clip32(origin.Y)) | 0), this.frame.Width, this.frame.Height));
                } else {
                    LRCEngine.UIButton.prototype.Draw$1.call(this, spriteBatch, origin.$clone());
                }
            }
        }
    }; });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJIYW5kR2FtZXMuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIlBsYXllci5jcyIsIkNhcmQuY3MiLCJDYXJkUG9vbC5jcyIsIkhhbmRHYW1lLmNzIiwiUG9pbnRlci5jcyIsIlByb2dyYW0uY3MiLCJMUkNFbmdpbmUvVmVjdGFuZ2xlLmNzIiwiTFJDRW5naW5lL0lucHV0U3RhdGUuY3MiLCJMUkNFbmdpbmUvSlNPTlRhYmxlLmNzIiwiTFJDRW5naW5lL0xSQ0VuZ2luZS5jcyIsIkxSQ0VuZ2luZS9SaWNoSW1hZ2UuY3MiLCJMUkNFbmdpbmUvU3BsYXNoU3lzdGVtLmNzIiwiTFJDRW5naW5lL1Nwcml0ZU9iamVjdC5jcyIsIkxSQ0VuZ2luZS9VSUJ1dHRvbi5jcyIsIk5ldyBCcmlkZ2UgU3R1ZmYvSGFzaEhlbHBlcnMuY3MiLCJBSVBsYXllci5jcyIsIkNhcmRzL0xvdmVMZXR0ZXJDYXJkLmNzIiwiUmVhbENhcmRQb29sLmNzIiwiTG9jYWxQbGF5ZXIuY3MiLCJMb3ZlTGV0dGVyR2FtZS5jcyIsIkxSQ0VuZ2luZS9VSUNvbnRhaW5lci5jcyIsIkNhcmRzL0Jhcm9uQ2FyZC5jcyIsIkNhcmRzL0NvdW50ZXNzQ2FyZC5jcyIsIkNhcmRzL0d1YXJkQ2FyZC5jcyIsIkNhcmRzL0hhbmRtYWlkQ2FyZC5jcyIsIkNhcmRzL0tpbmdDYXJkLmNzIiwiQ2FyZHMvUHJpZXN0Q2FyZC5jcyIsIkNhcmRzL1ByaW5jZUNhcmQuY3MiLCJDYXJkcy9QcmluY2Vzc0NhcmQuY3MiLCJEZWNrLmNzIiwiRGlzY2FyZFBpbGUuY3MiLCJIYW5kLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OzRCQTZDdUJBOztnQkFFWEEsWUFBT0EsSUFBSUEsZUFBS0EsYUFBWUEsT0FBTUE7Ozs7O2dCQTdCbENBLHFCQUFxQkEsNEJBQXVEQSx5QkFBYUEsQUFBc0RBO2dCQUMvSUEsSUFBSUE7b0JBQ0FBLGdCQUFXQTs7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aWNzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBQbGF5ZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgSGFuZCBIYW5kO1xyXG4gICAgICAgIHB1YmxpYyBIYW5kR2FtZSBHYW1lO1xyXG4gICAgICAgIHB1YmxpYyBib29sIGxvc3Q7XHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNIYW5kbWFpZGVkO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBMb3NlICgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm90TG9zdFBsYXllcnMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllcj4oR2FtZS5wbGF5ZXJzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllciwgYm9vbD4pKHYgPT4gIXYubG9zdCkpO1xyXG4gICAgICAgICAgICBpZiAobm90TG9zdFBsYXllcnMuQ291bnQoKSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgR2FtZS53b24gPSBub3RMb3N0UGxheWVycy5GaXJzdCgpO1xyXG4gICAgICAgICAgICBsb3N0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSBDUzE5OTggLy8gQXN5bmMgbWV0aG9kIGxhY2tzICdhd2FpdCcgb3BlcmF0b3JzIGFuZCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgRW5kVHVybigpXHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIENTMTk5OCAvLyBBc3luYyBtZXRob2QgbGFja3MgJ2F3YWl0JyBvcGVyYXRvcnMgYW5kIHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllciBwbGF5ZXI7XHJcbiAgICAgICAgICAgIGlmIChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFsbDxnbG9iYWw6OkhhbmRHYW1lcy5QbGF5ZXI+KEdhbWUucGxheWVycywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkhhbmRHYW1lcy5QbGF5ZXIsIGJvb2w+KSh2ID0+IHYubG9zdCkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBCcmlkZ2UuSHRtbDUuR2xvYmFsLkFsZXJ0KFwiQWxsIHBsYXllcnMgbG9zdC5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyID0gR2FtZS5wbGF5ZXJzW0dhbWUudHVybklkeCA9IChHYW1lLnBsYXllcnMuSW5kZXhPZih0aGlzKSArIDEpICUgR2FtZS5wbGF5ZXJzLkNvdW50XTtcclxuICAgICAgICAgICAgfSB3aGlsZSAocGxheWVyLmxvc3QpO1xyXG4gICAgICAgICAgICBwbGF5ZXIuT25UdXJuU3RhcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBUYXNrPFRleHR1cmUyRD4gVGFyZ2V0Q2FyZCgpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBUYXNrPFBsYXllcj4gVGFyZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFRhc2sgTG9va0F0Q2FyZHMoUmVhbENhcmRQb29sIGNhcmRQb29sKTtcclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgUGxheWVyIChIYW5kR2FtZSBHYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSGFuZCA9IG5ldyBIYW5kKHRoaXMuR2FtZSA9IEdhbWUsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgYXN5bmMgdm9pZCBPblR1cm5TdGFydCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJc0hhbmRtYWlkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKEdhbWUgaXMgTG92ZUxldHRlckdhbWUpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBHYW1lLlRvcENhcmQoKS5Nb3ZlQ2FyZFRvKEhhbmQpO1xyXG4gICAgICAgICAgICB2YXIgY291bnRlc3MgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQ+KEhhbmQuY2FyZHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuQ2FyZCwgYm9vbD4pKHYgPT4gdiBpcyBDYXJkcy5Db3VudGVzc0NhcmQpKTtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXNzICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBraW5nT3JQcmluY2UgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQ+KEhhbmQuY2FyZHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuQ2FyZCwgYm9vbD4pKHYgPT4gdiBpcyBDYXJkcy5LaW5nQ2FyZCB8fCB2IGlzIENhcmRzLlByaW5jZUNhcmQpKTtcclxuICAgICAgICAgICAgICAgIGlmIChraW5nT3JQcmluY2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBraW5nT3JQcmluY2UuUGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lc1xyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBDYXJkUG9vbCBAaW47XHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRCBpbWFnZTtcclxuICAgICAgICBwdWJsaWMgYm9vbCBIaWdobGlnaHRlZDtcclxuICAgICAgICBwdWJsaWMgUmVjdGFuZ2xlPyBvbGRMb2M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBUYXNrIE9uUGxheSgpO1xyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGFzeW5jIFRhc2sgT25EaXNjYXJkICgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICgoRGF0ZVRpbWUuTm93IC0gb3JnRGF0ZSkgPiBnbGlkZVRpbWUpXHJcbiAgICAgICAgICAgICAgICBpZiAoIWFuaW1hdGlvbkRvbmUuVGFzay5Jc0NvbXBsZXRlZClcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25Eb25lLlNldFJlc3VsdChudWxsKTtcclxuICAgICAgICAgICAgRHJhd0luZm8gZHJhd0luZm8gPSBAaW4uR2V0RHJhd2luZ1Bvc2l0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICBSZWN0YW5nbGU/IG5ld0xvYyA9IGRyYXdJbmZvLkRyYXdQb3NpdGlvbjtcclxuICAgICAgICAgICAgaWYgKG5ld0xvYyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBSZWN0YW5nbGUgcmVjdCA9IChSZWN0YW5nbGUpbmV3TG9jO1xyXG4gICAgICAgICAgICBpZiAob2xkTG9jICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJlY3RhbmdsZSBvbGRMb2NSZWFsID0gKFJlY3RhbmdsZSlvbGRMb2M7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCBnbGlkZU4gPSAoKGZsb2F0KShEYXRlVGltZS5Ob3cgLSAoRGF0ZVRpbWUpb3JnRGF0ZSkuVGlja3MgLyBnbGlkZVRpbWUuVGlja3MpO1xyXG4gICAgICAgICAgICAgICAgcmVjdCA9IG5ldyBSZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yMi5MZXJwKG9sZExvY1JlYWwuTG9jYXRpb24uVG9WZWN0b3IyKCksIHJlY3QuTG9jYXRpb24uVG9WZWN0b3IyKCksIGdsaWRlTikuVG9Qb2ludCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjIuTGVycChvbGRMb2NSZWFsLlNpemUuVG9WZWN0b3IyKCksIHJlY3QuU2l6ZS5Ub1ZlY3RvcjIoKSwgZ2xpZGVOKS5Ub1BvaW50KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChIaWdobGlnaHRlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUmVjdGFuZ2xlIGhpZ2hsaWdodFJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUocmVjdC5YIC0gMSwgcmVjdC5ZIC0gMSwgcmVjdC5XaWR0aCArIDEsIHJlY3QuSGVpZ2h0ICsgMSk7XHJcbiAgICAgICAgICAgICAgICBAaW4uR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEBpbi5HYW1lLnJlY3RhbmdsZSwgbmV3IFJlY3RhbmdsZShoaWdobGlnaHRSZWN0YW5nbGUuTG9jYXRpb24sIG5ldyBQb2ludCgxLCByZWN0LkhlaWdodCkpLCBDb2xvci5ZZWxsb3cpO1xyXG4gICAgICAgICAgICAgICAgQGluLkdhbWUuc3ByaXRlQmF0Y2guRHJhdyhAaW4uR2FtZS5yZWN0YW5nbGUsIG5ldyBSZWN0YW5nbGUobmV3IFBvaW50KGhpZ2hsaWdodFJlY3RhbmdsZS5SaWdodCwgaGlnaGxpZ2h0UmVjdGFuZ2xlLlkpLCBuZXcgUG9pbnQoMSwgcmVjdC5IZWlnaHQpKSwgQ29sb3IuWWVsbG93KTtcclxuICAgICAgICAgICAgICAgIEBpbi5HYW1lLnNwcml0ZUJhdGNoLkRyYXcoQGluLkdhbWUucmVjdGFuZ2xlLCBuZXcgUmVjdGFuZ2xlKHJlY3QuWCwgaGlnaGxpZ2h0UmVjdGFuZ2xlLlksIHJlY3QuV2lkdGgsIDEpLCBDb2xvci5ZZWxsb3cpO1xyXG4gICAgICAgICAgICAgICAgQGluLkdhbWUuc3ByaXRlQmF0Y2guRHJhdyhAaW4uR2FtZS5yZWN0YW5nbGUsIG5ldyBSZWN0YW5nbGUocmVjdC5YLCBoaWdobGlnaHRSZWN0YW5nbGUuQm90dG9tLCByZWN0LldpZHRoLCAxKSwgQ29sb3IuWWVsbG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBAaW4uR2FtZS5zcHJpdGVCYXRjaC5EcmF3KGRyYXdJbmZvLlNob3dDYXJkQmFjayA/IEBpbi5HYW1lLmNhcmRiYWNrIDogaW1hZ2UsIHJlY3QsIENvbG9yLldoaXRlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFRpbWVTcGFuIGdsaWRlVGltZSA9IFRpbWVTcGFuLkZyb21TZWNvbmRzKC42NSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGFzeW5jIFRhc2sgUGxheSAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXdhaXQgT25QbGF5KCk7XHJcbiAgICAgICAgICAgIGF3YWl0IE1vdmVDYXJkVG8oQGluLkdhbWUuZGlzY2FyZFBpbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgTW92ZUNhcmRUbyAoQ2FyZFBvb2wgdG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIaWdobGlnaHRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgb2xkUG9zID0gQGluLkdldERyYXdpbmdQb3NpdGlvbih0aGlzKTtcclxuICAgICAgICAgICAgQGluLlJlbW92ZSh0aGlzKTtcclxuICAgICAgICAgICAgdG8uQWRkKHRoaXMpO1xyXG4gICAgICAgICAgICBpZiAoIShvbGRQb3MuUGVybWlzc2lvbnMgPT0gRHJhd0luZm8uRHJhd1Blcm1pc3Npb24uVW5kcmF3YWJsZSB8fCB0by5HZXREcmF3aW5nUG9zaXRpb24odGhpcykuUGVybWlzc2lvbnMgPT0gRHJhd0luZm8uRHJhd1Blcm1pc3Npb24uVW5kcmF3YWJsZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9sZExvYyA9IG9sZFBvcy5EcmF3UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBvcmdEYXRlID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgICAgICAgICAgZnJvbSA9IEBpbjtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkRvbmUgPSBuZXcgVGFza0NvbXBsZXRpb25Tb3VyY2U8b2JqZWN0PigpO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgYW5pbWF0aW9uRG9uZS5UYXNrO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRG9uZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBvcmdEYXRlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGZyb20gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgb2xkTG9jID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoQGluIGlzIEhhbmQgJiYgdG8gaXMgRGlzY2FyZFBpbGUpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBPbkRpc2NhcmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRhc2tDb21wbGV0aW9uU291cmNlPG9iamVjdD4gYW5pbWF0aW9uRG9uZTtcclxuICAgICAgICBEYXRlVGltZT8gb3JnRGF0ZTtcclxuICAgICAgICBDYXJkUG9vbCBmcm9tO1xyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBDYXJkUG9vbFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBDYXJkUG9vbCAoSGFuZEdhbWUgZ2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWUgPSBnYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEFkZChDYXJkIGNhcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXJkLkBpbiA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgUmVtb3ZlKENhcmQgY2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkLkBpbiA9PSB0aGlzKVxyXG4gICAgICAgICAgICAgICAgY2FyZC5AaW4gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgYm9vbCBDb250YWlucyhDYXJkIGNhcmQpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBEcmF3SW5mbyBHZXREcmF3aW5nUG9zaXRpb24oQ2FyZCBjYXJkKTtcclxuICAgICAgICBwdWJsaWMgSGFuZEdhbWUgR2FtZTtcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFRoaXMgaXMgdGhlIG1haW4gdHlwZSBmb3IgeW91ciBnYW1lLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBIYW5kR2FtZSA6IEdhbWVcclxuICAgIHtcclxuICAgICAgICBHcmFwaGljc0RldmljZU1hbmFnZXIgZ3JhcGhpY3M7XHJcbiAgICAgICAgcHVibGljIFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PFBsYXllcj4gcGxheWVycyA9IG5ldyBMaXN0PFBsYXllcj4oKTtcclxuICAgICAgICBwdWJsaWMgUGxheWVyIHdvbjtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgc3RyaW5nIENvbnRlbnRGb2xkZXJOYW1lIHsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0XHJcbiNpZiAhV0lORE9XU1xyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICA8c3RyaW5nLCBpbnQ+IGNhcmRzIHsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIExpc3Q8VGV4dHVyZTJEPiBjYXJkSW1hZ2VzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBIYW5kR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBncmFwaGljcyA9IG5ldyBHcmFwaGljc0RldmljZU1hbmFnZXIodGhpcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSXNGdWxsU2NyZWVuID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgIFByZWZlcnJlZEJhY2tCdWZmZXJXaWR0aCA9IDEzNjYsXHJcbiAgICAgICAgICAgICAgICBQcmVmZXJyZWRCYWNrQnVmZmVySGVpZ2h0ID0gNzY4XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIENvbnRlbnQuUm9vdERpcmVjdG9yeSA9IFwiQ29udGVudFwiO1xyXG4gICAgICAgICAgICBJc01vdXNlVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBwZXJmb3JtIGFueSBpbml0aWFsaXphdGlvbiBpdCBuZWVkcyB0byBiZWZvcmUgc3RhcnRpbmcgdG8gcnVuLlxyXG4gICAgICAgIC8vLyBUaGlzIGlzIHdoZXJlIGl0IGNhbiBxdWVyeSBmb3IgYW55IHJlcXVpcmVkIHNlcnZpY2VzIGFuZCBsb2FkIGFueSBub24tZ3JhcGhpY1xyXG4gICAgICAgIC8vLyByZWxhdGVkIGNvbnRlbnQuICBDYWxsaW5nIGJhc2UuSW5pdGlhbGl6ZSB3aWxsIGVudW1lcmF0ZSB0aHJvdWdoIGFueSBjb21wb25lbnRzXHJcbiAgICAgICAgLy8vIGFuZCBpbml0aWFsaXplIHRoZW0gYXMgd2VsbC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogQWRkIHlvdXIgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxyXG5cclxuICAgICAgICAgICAgYmFzZS5Jbml0aWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEIGNhcmRiYWNrO1xyXG4gICAgICAgIHB1YmxpYyBEaXNjYXJkUGlsZSBkaXNjYXJkUGlsZTtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkQ29udGVudCB3aWxsIGJlIGNhbGxlZCBvbmNlIHBlciBnYW1lIGFuZCBpcyB0aGUgcGxhY2UgdG8gbG9hZFxyXG4gICAgICAgIC8vLyBhbGwgb2YgeW91ciBjb250ZW50LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgTG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IFNwcml0ZUJhdGNoLCB3aGljaCBjYW4gYmUgdXNlZCB0byBkcmF3IHRleHR1cmVzLlxyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaCA9IG5ldyBTcHJpdGVCYXRjaChHcmFwaGljc0RldmljZSk7XHJcbiAgICAgICAgICAgIGNhcmRJbWFnZXMgPSBuZXcgTGlzdDxUZXh0dXJlMkQ+KCk7XHJcbiAgICAgICAgICAgIGRlY2sgPSBuZXcgRGVjayh0aGlzKTtcclxuICAgICAgICAgICAgZGlzY2FyZFBpbGUgPSBuZXcgRGlzY2FyZFBpbGUodGhpcyk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IHVzZSB0aGlzLkNvbnRlbnQgdG8gbG9hZCB5b3VyIGdhbWUgY29udGVudCBoZXJlXHJcbiAgICAgICAgICAgIGZvbnQgPSBDb250ZW50LkxvYWQ8U3ByaXRlRm9udD4oXCJBcmlhbFwiKTtcclxuICAgICAgICAgICAgY2hvaWNlRm9udCA9IENvbnRlbnQuTG9hZDxTcHJpdGVGb250PihcIkNob2ljZSBUZXh0XCIpO1xyXG4gICAgICAgICAgICByZWN0YW5nbGUgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICBjYXJkYmFjayA9IENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KHN0cmluZy5Gb3JtYXQoXCJ7MH0vY2FyZGJhY2tcIixDb250ZW50Rm9sZGVyTmFtZSkpO1xyXG4gICAgICAgICAgICBwbGF5ZXJzLkFkZCh1aSA9IG5ldyBMb2NhbFBsYXllcih0aGlzKSk7XHJcbiAgICAgICAgICAgIHBsYXllcnMuQWRkKG5ldyBBSVBsYXllcih0aGlzKSk7XHJcbiAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBuID0gMDtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjYXJkS2V5UGFpciBpbiBjYXJkcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihzdHJpbmcuRm9ybWF0KFwiezB9L3sxfXsyfVwiLENvbnRlbnRGb2xkZXJOYW1lLG4gKyAxLGNhcmRLZXlQYWlyLktleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRJbWFnZXMuQWRkKGltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpZHggPSAwOyBpZHggPCBjYXJkS2V5UGFpci5WYWx1ZTsgaWR4KyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDYXJkIGNhcmQgPSAoQ2FyZClBc3NlbWJseS5HZXRFeGVjdXRpbmdBc3NlbWJseSgpLkdldFR5cGUoc3RyaW5nLkZvcm1hdChcIkhhbmRHYW1lcy5DYXJkcy57MH1DYXJkXCIsY2FyZEtleVBhaXIuS2V5KSkuR2V0Q29uc3RydWN0b3IobmV3IFR5cGVbXSB7IH0pLkludm9rZShuZXcgb2JqZWN0WzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZC5pbWFnZSA9IGltYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNrLkFkZChjYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdoaWxlIChmYWxzZSk7XHJcbiAgICAgICAgICAgIFNodWZmbGVEZWNrKCk7XHJcbiAgICAgICAgICAgIHBsYXllcnMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllcj4pKHBsYXllciA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IDE7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9wQ2FyZCA9IFRvcENhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWNrLlJlbW92ZSh0b3BDYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuSGFuZC5BZGQodG9wQ2FyZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcGxheWVyc1t0dXJuSWR4XS5PblR1cm5TdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIENhcmQgVG9wQ2FyZCgpIHtyZXR1cm4gZGVjay5jYXJkc1swXTt9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgdHVybklkeDtcclxuICAgICAgICBSYW5kb20gcm5kID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZvaWQgU2h1ZmZsZURlY2sgKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBpbnQgbiA9IGRlY2suY2FyZHMuQ291bnQ7XHJcbiAgICAgICAgICAgIHdoaWxlIChuID4gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbi0tO1xyXG4gICAgICAgICAgICAgICAgaW50IGsgPSBybmQuTmV4dChuICsgMSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBkZWNrLmNhcmRzW2tdO1xyXG4gICAgICAgICAgICAgICAgZGVjay5jYXJkc1trXSA9IGRlY2suY2FyZHNbbl07XHJcbiAgICAgICAgICAgICAgICBkZWNrLmNhcmRzW25dID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlMkQgcmVjdGFuZ2xlO1xyXG4gICAgICAgIHB1YmxpYyBEZWNrIGRlY2s7XHJcbiAgICAgICAgcHVibGljIExvY2FsUGxheWVyIHVpO1xyXG4gICAgICAgIHB1YmxpYyBTcHJpdGVGb250IGZvbnQsIGNob2ljZUZvbnQ7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVW5sb2FkQ29udGVudCB3aWxsIGJlIGNhbGxlZCBvbmNlIHBlciBnYW1lIGFuZCBpcyB0aGUgcGxhY2UgdG8gdW5sb2FkXHJcbiAgICAgICAgLy8vIGdhbWUtc3BlY2lmaWMgY29udGVudC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFVubG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogVW5sb2FkIGFueSBub24gQ29udGVudE1hbmFnZXIgY29udGVudCBoZXJlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBydW4gbG9naWMgc3VjaCBhcyB1cGRhdGluZyB0aGUgd29ybGQsXHJcbiAgICAgICAgLy8vIGNoZWNraW5nIGZvciBjb2xsaXNpb25zLCBnYXRoZXJpbmcgaW5wdXQsIGFuZCBwbGF5aW5nIGF1ZGlvLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZ2FtZVRpbWVcIj5Qcm92aWRlcyBhIHNuYXBzaG90IG9mIHRpbWluZyB2YWx1ZXMuPC9wYXJhbT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBBZGQgeW91ciB1cGRhdGUgbG9naWMgaGVyZVxyXG4gICAgICAgICAgICB1aS5VcGRhdGUoKTtcclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGlzIGlzIGNhbGxlZCB3aGVuIHRoZSBnYW1lIHNob3VsZCBkcmF3IGl0c2VsZi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImdhbWVUaW1lXCI+UHJvdmlkZXMgYSBzbmFwc2hvdCBvZiB0aW1pbmcgdmFsdWVzLjwvcGFyYW0+XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgRHJhdyhHYW1lVGltZSBnYW1lVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdyYXBoaWNzRGV2aWNlLkNsZWFyKENvbG9yLkNvcm5mbG93ZXJCbHVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IEFkZCB5b3VyIGRyYXdpbmcgY29kZSBoZXJlXHJcblxyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5CZWdpbigpO1xyXG4gICAgICAgICAgICBpZiAod29uID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB1aS5EcmF3KCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXdTdHJpbmcoZm9udCwgc3RyaW5nLkZvcm1hdChcInswfSBoYXMgd29uLlwiLHdvbi5HZXRUeXBlKCkuTmFtZSksIG5ldyBWZWN0b3IyKDAsIDApLCBDb2xvci5SZWQpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5FbmQoKTtcclxuXHJcbiAgICAgICAgICAgIGJhc2UuRHJhdyhnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFBvaW50ZXI8VD5cclxuICAgIHtcclxuICAgICAgICBUIHZhbHVlO1xyXG4gICAgICAgIHB1YmxpYyBQb2ludGVyIChUIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0VmFsdWUoVCB2YWx1ZSkgeyB0aGlzLnZhbHVlID0gdmFsdWU7fVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGltcGxpY2l0IG9wZXJhdG9yIFQgKFBvaW50ZXI8VD4gdmFsdWUpIHtyZXR1cm4gdmFsdWUudmFsdWU7fVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBvcGVyYXRvciB+IChQb2ludGVyPFQ+IHZhbHVlKSB7cmV0dXJuIHZhbHVlLnZhbHVlO31cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcm9ncmFtXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdXNpbmcgKHZhciBnYW1lID0gbmV3IExvdmVMZXR0ZXJHYW1lKCkpXHJcbiAgICAgICAgICAgICAgICBnYW1lLlJ1bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG5cclxubmFtZXNwYWNlIExSQ0VuZ2luZVxyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IFZlY3RhbmdsZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBYO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBZO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBXaWR0aDtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgSGVpZ2h0O1xyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBPcmlnaW4geyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIoWCwgWSk7IH0gc2V0IHsgWCA9IHZhbHVlLlg7IFkgPSB2YWx1ZS5ZOyB9IH1cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBTaXplIHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0b3IyKFdpZHRoLCBIZWlnaHQpOyB9IHNldCB7IFdpZHRoID0gdmFsdWUuWDsgSGVpZ2h0ID0gdmFsdWUuWTsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdGFuZ2xlIEJvdW5kaW5nQm94KFZlY3RvcjIgYSwgVmVjdG9yMiBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMiBvcmlnaW4gPSBuZXcgVmVjdG9yMihNYXRoLk1pbihhLlgsIGIuWCksIE1hdGguTWluKGEuWSwgYi5ZKSk7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgYm90UmlnaHQgPSBuZXcgVmVjdG9yMihNYXRoLk1heChhLlgsIGIuWCksIE1hdGguTWF4KGEuWSwgYi5ZKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdGFuZ2xlKG9yaWdpbiwgYm90UmlnaHQgLSBvcmlnaW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ29udGFpbnMoVmVjdG9yMiBwb2ludClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBYIDw9IHBvaW50LlggJiYgWSA8PSBwb2ludC5ZICYmIFggKyBXaWR0aCA+IHBvaW50LlggJiYgWSArIEhlaWdodCA+IHBvaW50Llk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhWZWN0YW5nbGUgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gWCA8PSBvdGhlci5YXHJcbiAgICAgICAgICAgICAgICAmJiBZIDw9IG90aGVyLllcclxuICAgICAgICAgICAgICAgICYmIFggKyBXaWR0aCA+PSBvdGhlci5YICsgb3RoZXIuV2lkdGhcclxuICAgICAgICAgICAgICAgICYmIFkgKyBIZWlnaHQgPj0gb3RoZXIuWSArIG90aGVyLkhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEludGVyc2VjdHMoVmVjdGFuZ2xlIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFggPD0gb3RoZXIuWCArIG90aGVyLldpZHRoICYmIFkgPD0gb3RoZXIuWSArIG90aGVyLkhlaWdodCAmJlxyXG4gICAgICAgICAgICAgICAgWCArIFdpZHRoID49IG90aGVyLlggJiYgWSArIEhlaWdodCA+PSBvdGhlci5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RhbmdsZSBCbG9hdChmbG9hdCBhbW91bnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RhbmdsZShYIC0gYW1vdW50LCBZIC0gYW1vdW50LCBXaWR0aCArIGFtb3VudCAqIDIsIEhlaWdodCArIGFtb3VudCAqIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RhbmdsZSBCbG9hdChmbG9hdCBiWCwgZmxvYXQgYlkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RhbmdsZShYIC0gYlgsIFkgLSBiWSwgV2lkdGggKyBiWCAqIDIsIEhlaWdodCArIGJZICogMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdGFuZ2xlKGZsb2F0IGFYLCBmbG9hdCBhWSwgZmxvYXQgYVdpZHRoLCBmbG9hdCBhSGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCA9IGFYOyBZID0gYVk7IFdpZHRoID0gYVdpZHRoOyBIZWlnaHQgPSBhSGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RhbmdsZShWZWN0b3IyIG9yaWdpbiwgVmVjdG9yMiBzaXplKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCA9IG9yaWdpbi5YO1xyXG4gICAgICAgICAgICBZID0gb3JpZ2luLlk7XHJcbiAgICAgICAgICAgIFdpZHRoID0gc2l6ZS5YO1xyXG4gICAgICAgICAgICBIZWlnaHQgPSBzaXplLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTWF4WCB7IGdldCB7IHJldHVybiBYICsgV2lkdGg7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBNYXhZIHsgZ2V0IHsgcmV0dXJuIFkgKyBIZWlnaHQ7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBYWSB7IGdldCB7IHJldHVybiBuZXcgVmVjdG9yMihYLCBZKTsgfSB9XHJcbiAgICAgICAgcHVibGljIFZlY3RhbmdsZSBMZWZ0U2lkZSB7IGdldCB7IHJldHVybiBuZXcgVmVjdGFuZ2xlKFgsIFksIDAsIEhlaWdodCk7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBWZWN0YW5nbGUgUmlnaHRTaWRlIHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0YW5nbGUoWCtXaWR0aCwgWSwgMCwgSGVpZ2h0KTsgfSB9XHJcbiAgICAgICAgcHVibGljIFZlY3RhbmdsZSBUb3BTaWRlIHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0YW5nbGUoWCwgWSwgV2lkdGgsIDApOyB9IH1cclxuICAgICAgICBwdWJsaWMgVmVjdGFuZ2xlIEJvdHRvbVNpZGUgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RhbmdsZShYLCBZK0hlaWdodCwgV2lkdGgsIDApOyB9IH1cclxuICAgICAgICBwdWJsaWMgZmxvYXQgVG9wIHsgZ2V0IHsgcmV0dXJuIFk7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBCb3R0b20geyBnZXQgeyByZXR1cm4gWSArIEhlaWdodDsgfSB9XHJcbiAgICAgICAgcHVibGljIGZsb2F0IExlZnQgeyBnZXQgeyByZXR1cm4gWDsgfSB9XHJcbiAgICAgICAgcHVibGljIGZsb2F0IFJpZ2h0IHsgZ2V0IHsgcmV0dXJuIFggKyBXaWR0aDsgfSB9XHJcbiAgICAgICAgcHVibGljIGZsb2F0IENlbnRlclggeyBnZXQgeyByZXR1cm4gWCArIFdpZHRoIC8gMjsgfSB9XHJcbiAgICAgICAgcHVibGljIGZsb2F0IENlbnRlclkgeyBnZXQgeyByZXR1cm4gWSArIEhlaWdodCAvIDI7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIFRvcExlZnQgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIoTGVmdCwgVG9wKTsgfSB9XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgVG9wQ2VudGVyIHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0b3IyKENlbnRlclgsIFRvcCk7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIFRvcFJpZ2h0IHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0b3IyKFJpZ2h0LCBUb3ApOyB9IH1cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBDZW50ZXJMZWZ0IHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0b3IyKExlZnQsIENlbnRlclkpOyB9IH1cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBDZW50ZXIgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIoQ2VudGVyWCwgQ2VudGVyWSk7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIENlbnRlclJpZ2h0IHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0b3IyKFJpZ2h0LCBDZW50ZXJZKTsgfSB9XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgQm90dG9tTGVmdCB7IGdldCB7IHJldHVybiBuZXcgVmVjdG9yMihMZWZ0LCBCb3R0b20pOyB9IH1cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBCb3R0b21DZW50ZXIgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIoQ2VudGVyWCwgQm90dG9tKTsgfSB9XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgQm90dG9tUmlnaHQgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIoUmlnaHQsIEJvdHRvbSk7IH0gfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgRXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEcmF3KHRoaXMgU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFRleHR1cmUyRCB0ZXh0dXJlLCBWZWN0YW5nbGUgdmVjdCwgQ29sb3IgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIHZlY3QuT3JpZ2luLCBudWxsLCBjb2xvciwgMCwgVmVjdG9yMi5aZXJvLCBuZXcgVmVjdG9yMih2ZWN0LlNpemUuWCAvIHRleHR1cmUuV2lkdGgsIHZlY3QuU2l6ZS5ZIC8gdGV4dHVyZS5IZWlnaHQpLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIENvbnRhaW5zKHRoaXMgUmVjdGFuZ2xlIHJlY3QsIFZlY3RvcjIgcG9pbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjdC5YIDw9IHBvaW50LlggJiYgcmVjdC5ZIDw9IHBvaW50LlkgJiZcclxuICAgICAgICAgICAgICAgIHJlY3QuWCArIHJlY3QuV2lkdGggPiBwb2ludC5YICYmIHJlY3QuWSArIHJlY3QuSGVpZ2h0ID4gcG9pbnQuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJbnRlcnNlY3RzKHRoaXMgUmVjdGFuZ2xlIHJlY3QsIFZlY3RhbmdsZSBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWN0LlggPD0gb3RoZXIuWCArIG90aGVyLldpZHRoICYmIHJlY3QuWSA8PSBvdGhlci5ZICsgb3RoZXIuSGVpZ2h0ICYmXHJcbiAgICAgICAgICAgICAgICByZWN0LlggKyByZWN0LldpZHRoID49IG90aGVyLlggJiYgcmVjdC5ZICsgcmVjdC5IZWlnaHQgPj0gb3RoZXIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdGFuZ2xlIFZlY3RhbmdsZSh0aGlzIFJlY3RhbmdsZSByZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0YW5nbGUocmVjdC5YLCByZWN0LlksIHJlY3QuV2lkdGgsIHJlY3QuSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxuXHJcbm5hbWVzcGFjZSBMUkNFbmdpbmVcclxue1xyXG4gICAgcHVibGljIGVudW0gTW91c2VCdXR0b25cclxuICAgIHtcclxuICAgICAgICBMRUZULFxyXG4gICAgICAgIE1JRERMRSxcclxuICAgICAgICBSSUdIVFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNb3VzZUJ1dHRvblN0YXRlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIE1vdXNlQnV0dG9uIGJ1dHRvbjtcclxuICAgICAgICBwdWJsaWMgYm9vbCBpc0Rvd247XHJcbiAgICAgICAgcHVibGljIGJvb2wgZHJhZ2dlZDtcclxuICAgICAgICBwdWJsaWMgaW50IGR1cmF0aW9uRnJhbWVzO1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIGluaXRpYWxNb3VzZVBvcztcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEUkFHX1RIUkVTSE9MRCA9IDMuMGY7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBGUkFNRVJBVEUgPSAxIC8gMzAuMGY7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUJ1dHRvblN0YXRlKE1vdXNlQnV0dG9uIGJ1dHRvbiwgTW91c2VTdGF0ZSBpbml0aWFsU3RhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcclxuICAgICAgICAgICAgaXNEb3duID0gSXNCdXR0b25QcmVzc2VkKGluaXRpYWxTdGF0ZSk7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uRnJhbWVzID0gMTAwO1xyXG4gICAgICAgICAgICBpbml0aWFsTW91c2VQb3MgPSBuZXcgVmVjdG9yMihpbml0aWFsU3RhdGUuWCwgaW5pdGlhbFN0YXRlLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKE1vdXNlU3RhdGUgc3RhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBib29sIG5ld1ByZXNzZWQgPSBJc0J1dHRvblByZXNzZWQoc3RhdGUpO1xyXG4gICAgICAgICAgICBpZiggaXNEb3duICE9IG5ld1ByZXNzZWQgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpc0Rvd24gPSBuZXdQcmVzc2VkO1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb25GcmFtZXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgZHJhZ2dlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaW5pdGlhbE1vdXNlUG9zID0gbmV3IFZlY3RvcjIoc3RhdGUuWCwgc3RhdGUuWSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbkZyYW1lcysrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc0Rvd24gJiYgIWRyYWdnZWQgJiYgKGluaXRpYWxNb3VzZVBvcyAtIG5ldyBWZWN0b3IyKHN0YXRlLlgsIHN0YXRlLlkpKS5MZW5ndGhTcXVhcmVkKCkgPiBEUkFHX1RIUkVTSE9MRCAqIERSQUdfVEhSRVNIT0xEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib29sIElzQnV0dG9uUHJlc3NlZChNb3VzZVN0YXRlIHN0YXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoKGJ1dHRvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBNb3VzZUJ1dHRvbi5MRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZS5MZWZ0QnV0dG9uID09IEJ1dHRvblN0YXRlLlByZXNzZWQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE1vdXNlQnV0dG9uLk1JRERMRTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUuTWlkZGxlQnV0dG9uID09IEJ1dHRvblN0YXRlLlByZXNzZWQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE1vdXNlQnV0dG9uLlJJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZS5SaWdodEJ1dHRvbiA9PSBCdXR0b25TdGF0ZS5QcmVzc2VkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBkdXJhdGlvbiB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBkdXJhdGlvbkZyYW1lcyAqIEZSQU1FUkFURTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wganVzdFByZXNzZWQge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gaXNEb3duICYmIGR1cmF0aW9uRnJhbWVzID09IDA7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIGp1c3RSZWxlYXNlZCB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiAhaXNEb3duICYmIGR1cmF0aW9uRnJhbWVzID09IDA7IH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIElucHV0U3RhdGVcclxuICAgIHtcclxuICAgICAgICBNb3VzZVN0YXRlIG9sZE1vdXNlO1xyXG4gICAgICAgIHB1YmxpYyBNb3VzZVN0YXRlIG1vdXNlIHsgZ2V0OyBpbnRlcm5hbCBzZXQ7IH1cclxuICAgICAgICBLZXlib2FyZFN0YXRlIG9sZEtleWJvYXJkO1xyXG4gICAgICAgIHB1YmxpYyBLZXlib2FyZFN0YXRlIGtleWJvYXJkIHsgZ2V0OyBpbnRlcm5hbCBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgYm9vbCBwYXVzZU1vdXNlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIGJvb2wgcHJlRmlyc3RVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIGJvb2wgZmlyc3RVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIHB1YmxpYyBVSU1vdXNlUmVzcG9uZGVyIGhvdmVyaW5nRWxlbWVudDtcclxuICAgICAgICBwdWJsaWMgVUlNb3VzZVJlc3BvbmRlciBob3ZlcmluZ0VsZW1lbnRNb3VzZURvd247XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUJ1dHRvblN0YXRlIG1vdXNlTGVmdDtcclxuICAgICAgICBwdWJsaWMgTW91c2VCdXR0b25TdGF0ZSBtb3VzZU1pZGRsZTtcclxuICAgICAgICBwdWJsaWMgTW91c2VCdXR0b25TdGF0ZSBtb3VzZVJpZ2h0O1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGZpcnN0VXBkYXRlICYmICFwcmVGaXJzdFVwZGF0ZSlcclxuICAgICAgICAgICAgICAgIGZpcnN0VXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHByZUZpcnN0VXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG9sZEtleWJvYXJkID0ga2V5Ym9hcmQ7XHJcbiAgICAgICAgICAgIGtleWJvYXJkID0gS2V5Ym9hcmQuR2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgLyppZiAoV2FzS2V5SnVzdFByZXNzZWQoS2V5cy5TcGFjZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhdXNlTW91c2UgPSAhcGF1c2VNb3VzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChJc0tleURvd24oS2V5cy5TcGFjZSkgJiYgcGF1c2VNb3VzZSAmJiAoV2FzTW91c2VMZWZ0SnVzdFByZXNzZWQoKSB8fCBXYXNNb3VzZVJpZ2h0SnVzdFByZXNzZWQoKSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGZvcmNlIGFuIHVwZGF0ZSBpZiB0aGUgdXNlciBjbGlja3NcclxuICAgICAgICAgICAgICAgIG1vdXNlID0gTW91c2UuR2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgICAgICBpZiAocGF1c2VNb3VzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW91c2UgPSBvbGRNb3VzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9sZE1vdXNlID0gbW91c2U7XHJcbiAgICAgICAgICAgICAgICBtb3VzZSA9IE1vdXNlLkdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtb3VzZUxlZnQgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW91c2VMZWZ0LlVwZGF0ZShtb3VzZSk7XHJcbiAgICAgICAgICAgICAgICBtb3VzZU1pZGRsZS5VcGRhdGUobW91c2UpO1xyXG4gICAgICAgICAgICAgICAgbW91c2VSaWdodC5VcGRhdGUobW91c2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW91c2VMZWZ0ID0gbmV3IE1vdXNlQnV0dG9uU3RhdGUoTW91c2VCdXR0b24uTEVGVCwgbW91c2UpO1xyXG4gICAgICAgICAgICAgICAgbW91c2VNaWRkbGUgPSBuZXcgTW91c2VCdXR0b25TdGF0ZShNb3VzZUJ1dHRvbi5NSURETEUsIG1vdXNlKTtcclxuICAgICAgICAgICAgICAgIG1vdXNlUmlnaHQgPSBuZXcgTW91c2VCdXR0b25TdGF0ZShNb3VzZUJ1dHRvbi5SSUdIVCwgbW91c2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobW91c2VMZWZ0Lmp1c3RQcmVzc2VkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBob3ZlcmluZ0VsZW1lbnRNb3VzZURvd24gPSBob3ZlcmluZ0VsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhvdmVyaW5nRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBNb3VzZVBvcyB7IGdldCB7IHJldHVybiBuZXcgVmVjdG9yMihtb3VzZS5YLCBtb3VzZS5ZKTsgfSB9XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgT2xkTW91c2VQb3MgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIob2xkTW91c2UuWCwgb2xkTW91c2UuWSk7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIE1vdXNlRGVsdGEgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIobW91c2UuWC1vbGRNb3VzZS5YLCBtb3VzZS5ZLW9sZE1vdXNlLlkpOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlTW91c2VIb3ZlcihJUmVhZE9ubHlMaXN0PFVJTW91c2VSZXNwb25kZXI+IGxpc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoaG92ZXJpbmdFbGVtZW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBJZHggPSBsaXN0LkNvdW50IC0gMTsgSWR4ID49IDA7IC0tSWR4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBob3ZlcmluZ0VsZW1lbnQgPSBsaXN0W0lkeF0uR2V0TW91c2VIb3ZlcihNb3VzZVBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaG92ZXJpbmdFbGVtZW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFdhc01vdXNlTGVmdEp1c3RQcmVzc2VkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb3VzZUxlZnQuaXNEb3duICYmIG1vdXNlTGVmdC5kdXJhdGlvbiA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgV2FzTW91c2VMZWZ0SnVzdFJlbGVhc2VkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAhbW91c2VMZWZ0LmlzRG93biAmJiBtb3VzZUxlZnQuZHVyYXRpb24gPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFdhc01vdXNlUmlnaHRKdXN0UHJlc3NlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbW91c2VSaWdodC5pc0Rvd24gJiYgbW91c2VSaWdodC5kdXJhdGlvbiA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgV2FzTW91c2VSaWdodEp1c3RSZWxlYXNlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIW1vdXNlUmlnaHQuaXNEb3duICYmIG1vdXNlUmlnaHQuZHVyYXRpb24gPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFdhc0tleUp1c3RQcmVzc2VkKEtleXMga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGtleWJvYXJkLklzS2V5RG93bihrZXkpICYmICFvbGRLZXlib2FyZC5Jc0tleURvd24oa2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFdhc0tleUp1c3RSZWxlYXNlZChLZXlzIGtleSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAha2V5Ym9hcmQuSXNLZXlEb3duKGtleSkgJiYgb2xkS2V5Ym9hcmQuSXNLZXlEb3duKGtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0tleURvd24oS2V5cyBrZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4ga2V5Ym9hcmQuSXNLZXlEb3duKGtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0tleVVwKEtleXMga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGtleWJvYXJkLklzS2V5VXAoa2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIEdldFBzZXVkb0pveXN0aWNrKEtleXMgdXAsIEtleXMgZG93biwgS2V5cyBsZWZ0LCBLZXlzIHJpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdXBEb3duID0gMC4wZjtcclxuICAgICAgICAgICAgaWYoIGtleWJvYXJkLklzS2V5RG93bih1cCkgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1cERvd24gPSAtMS4wZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKCBrZXlib2FyZC5Jc0tleURvd24oZG93bikgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1cERvd24gPSAxLjBmO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmbG9hdCBsZWZ0UmlnaHQgPSAwLjBmO1xyXG4gICAgICAgICAgICBpZiAoa2V5Ym9hcmQuSXNLZXlEb3duKGxlZnQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UmlnaHQgPSAtMS4wZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChrZXlib2FyZC5Jc0tleURvd24ocmlnaHQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UmlnaHQgPSAxLjBmO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIobGVmdFJpZ2h0LCB1cERvd24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG5cclxubmFtZXNwYWNlIExSQ0VuZ2luZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSlNPTkFycmF5XHJcbiAgICB7XHJcbiAgICAgICAgU3lzdGVtLk9iamVjdFtdIGFycmF5O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEpTT05BcnJheSBlbXB0eSA9IG5ldyBKU09OQXJyYXkobmV3IFN5c3RlbS5PYmplY3RbXSB7IH0pO1xyXG5cclxuICAgICAgICBwdWJsaWMgSlNPTkFycmF5KFN5c3RlbS5PYmplY3RbXSBpbkFycmF5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXJyYXkgPSBpbkFycmF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEpTT05BcnJheShJRW51bWVyYWJsZSBpbkFycmF5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3lzdGVtLk9iamVjdCB1bnVzZWQgPSBudWxsO1xyXG4gICAgICAgICAgICBTeXN0ZW0uT2JqZWN0IHVudXNlZDIgPSBudWxsO1xyXG4gICAgICAgICAgICBpbnQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChTeXN0ZW0uT2JqZWN0IG9iaiBpbiBpbkFycmF5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1bnVzZWQgPSBvYmo7IC8vIHN1cHByZXNzIHdhcm5pbmdzIGFib3V0IHVudXNlZCBvYmpcclxuICAgICAgICAgICAgICAgICsrY291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdW51c2VkMiA9IHVudXNlZDtcclxuICAgICAgICAgICAgdW51c2VkID0gdW51c2VkMjtcclxuXHJcbiAgICAgICAgICAgIGFycmF5ID0gbmV3IFN5c3RlbS5PYmplY3RbY291bnRdO1xyXG4gICAgICAgICAgICBpbnQgaWR4ID0gMDtcclxuICAgICAgICAgICAgZm9yZWFjaCAoU3lzdGVtLk9iamVjdCBvYmogaW4gaW5BcnJheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYXJyYXlbaWR4XSA9IG9iajtcclxuICAgICAgICAgICAgICAgICsraWR4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3lzdGVtLk9iamVjdCB0aGlzW2ludCBrZXldXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gYXJyYXlba2V5XTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBMZW5ndGhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBhcnJheS5MZW5ndGg7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZFRvU2V0KFxyXG5cclxuI2lmIFdJTkRPV1NcclxuICAgICAgICAgICAgRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZW5kaWZcclxuICAgICAgICAgICAgPHN0cmluZywgYm9vbD4gdGhlU2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAoc3RyaW5nIHMgaW4gYXJyYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoZVNldFtzXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBKU09OQXJyYXlfSlNPTlRhYmxlcyBhc0pTT05UYWJsZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBKU09OQXJyYXlfSlNPTlRhYmxlcyhhcnJheS5HZXRFbnVtZXJhdG9yKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEpTT05BcnJheV9KU09OQXJyYXlzIGFzSlNPTkFycmF5cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEpTT05BcnJheV9KU09OQXJyYXlzKGFycmF5LkdldEVudW1lcmF0b3IoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSlNPTkFycmF5RW51bWVyYXRvcjxTdHJpbmc+IGFzU3RyaW5ncygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEpTT05BcnJheUVudW1lcmF0b3I8U3RyaW5nPihhcnJheS5HZXRFbnVtZXJhdG9yKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLlBvaW50IHRvUG9pbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5Qb2ludCh0aGlzLmdldEludCgwKSwgdGhpcy5nZXRJbnQoMSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLlZlY3RvcjIgdG9WZWN0b3IyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuVmVjdG9yMih0aGlzLmdldEZsb2F0KDApLCB0aGlzLmdldEZsb2F0KDEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5WZWN0b3IzIHRvVmVjdG9yMygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLlZlY3RvcjModGhpcy5nZXRGbG9hdCgwKSwgdGhpcy5nZXRGbG9hdCgxKSwgdGhpcy5nZXRGbG9hdCgyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3lzdGVtLk9iamVjdCBnZXRQcm9wZXJ0eShpbnQgaWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5W2lkeF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IGdldEludChpbnQgaWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpKGRvdWJsZSlhcnJheVtpZHhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IGdldEZsb2F0KGludCBpZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KShkb3VibGUpYXJyYXlbaWR4XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgZ2V0RG91YmxlKGludCBpZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGRvdWJsZSlhcnJheVtpZHhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBnZXRTdHJpbmcoaW50IGlkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoc3RyaW5nKWFycmF5W2lkeF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIGdldFN0cmluZyhpbnQgaWR4LCBzdHJpbmcgZGVmYXVsdFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5Lkxlbmd0aCA+IGlkeClcclxuICAgICAgICAgICAgICAgIHJldHVybiAoc3RyaW5nKWFycmF5W2lkeF07XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBnZXRCb29sKGludCBpZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGJvb2wpYXJyYXlbaWR4XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBKU09OQXJyYXkgZ2V0QXJyYXkoaW50IGlkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSlNPTkFycmF5KChTeXN0ZW0uT2JqZWN0W10pYXJyYXlbaWR4XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSlNPTlRhYmxlIGdldEpTT04oaW50IGlkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSlNPTlRhYmxlKChcclxuI2lmIFdJTkRPV1NcclxuICAgICAgICAgICAgRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZW5kaWZcclxuICAgICAgICAgICAgICAgIDxzdHJpbmcsIFN5c3RlbS5PYmplY3Q+KWFycmF5W2lkeF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIHRvU3RyaW5nQXJyYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nW10gcmVzdWx0ID0gbmV3IHN0cmluZ1thcnJheS5MZW5ndGhdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBJZHggPSAwOyBJZHggPCBhcnJheS5MZW5ndGg7ICsrSWR4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbSWR4XSA9IChzdHJpbmcpYXJyYXlbSWR4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nIHJlc3VsdCA9IFwiWyBcIjtcclxuICAgICAgICAgICAgZm9yZWFjaCAoU3lzdGVtLk9iamVjdCB2YWwgaW4gYXJyYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwuR2V0VHlwZSgpID09IHR5cGVvZihzdHJpbmcpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcXCJcIiArIHZhbCArIFwiXFxcIiwgXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXCIgKyB2YWwgKyBcIiwgXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0ICs9IFwiIF1cIjtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEpTT05BcnJheV9KU09OVGFibGVzIDogSlNPTkFycmF5RW51bWVyYXRvcjxKU09OVGFibGU+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEpTT05BcnJheV9KU09OVGFibGVzKElFbnVtZXJhdG9yIGFCYXNlRW51bWVyYXRvcikgOiBiYXNlKGFCYXNlRW51bWVyYXRvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgSlNPTlRhYmxlIEN1cnJlbnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBuZXcgSlNPTlRhYmxlKChcclxuI2lmIFdJTkRPV1NcclxuICAgICAgICAgICAgRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZW5kaWZcclxuICAgICAgICAgICAgICAgIDxzdHJpbmcsIFN5c3RlbS5PYmplY3Q+KWJhc2VFbnVtZXJhdG9yLkN1cnJlbnQpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBKU09OQXJyYXlfSlNPTkFycmF5cyA6IEpTT05BcnJheUVudW1lcmF0b3I8SlNPTkFycmF5PlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBKU09OQXJyYXlfSlNPTkFycmF5cyhJRW51bWVyYXRvciBhQmFzZUVudW1lcmF0b3IpIDogYmFzZShhQmFzZUVudW1lcmF0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIEpTT05BcnJheSBDdXJyZW50XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gbmV3IEpTT05BcnJheSgoU3lzdGVtLk9iamVjdFtdKWJhc2VFbnVtZXJhdG9yLkN1cnJlbnQpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBKU09OQXJyYXlFbnVtZXJhdG9yPFQ+IDogSUVudW1lcmF0b3I8VD5cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgSUVudW1lcmF0b3IgYmFzZUVudW1lcmF0b3I7XHJcblxyXG4gICAgICAgIHB1YmxpYyBKU09OQXJyYXlFbnVtZXJhdG9yKElFbnVtZXJhdG9yIGFCYXNlRW51bWVyYXRvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2VFbnVtZXJhdG9yID0gYUJhc2VFbnVtZXJhdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElFbnVtZXJhdG9yIEdldEVudW1lcmF0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBNb3ZlTmV4dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYmFzZUVudW1lcmF0b3IuTW92ZU5leHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2VFbnVtZXJhdG9yLlJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIElEaXNwb3NhYmxlLkRpc3Bvc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIFQgQ3VycmVudFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIChUKWJhc2VFbnVtZXJhdG9yLkN1cnJlbnQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9iamVjdCBJRW51bWVyYXRvci5DdXJyZW50IHsgZ2V0IHsgcmV0dXJuIEN1cnJlbnQ7IH0gfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBKU09OVGFibGVcclxuICAgIHtcclxuXHJcbiNpZiBXSU5ET1dTXHJcbiAgICAgICAgRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZW5kaWZcclxuICAgICAgICA8c3RyaW5nLCBTeXN0ZW0uT2JqZWN0PiBkaWN0aW9uYXJ5O1xyXG5cclxuICAgICAgICBwdWJsaWMgSlNPTlRhYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpY3Rpb25hcnkgPSBuZXdcclxuI2lmIFdJTkRPV1NcclxuICAgICAgICAgICAgRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZW5kaWZcclxuICAgICAgICAgICAgPHN0cmluZywgU3lzdGVtLk9iamVjdD4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBKU09OVGFibGUoXHJcbiNpZiBXSU5ET1dTXHJcbiAgICAgICAgICAgIERpY3Rpb25hcnlcclxuI2Vsc2VcclxuICAgICAgICAgICAgX0RpY3Rpb25hcnlcclxuI2VuZGlmXHJcbiAgICAgICAgICAgIDxzdHJpbmcsIFN5c3RlbS5PYmplY3Q+IGluRGljdGlvbmFyeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpY3Rpb25hcnkgPSBpbkRpY3Rpb25hcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSlNPTlRhYmxlKHN0cmluZyBmaWxlbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IEJyaWRnZS5IdG1sNS5YTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lk9wZW4oXCJHRVRcIiwgZmlsZW5hbWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmVxdWVzdC5TZW5kKChzdHJpbmcpbnVsbCk7XHJcbiAgICAgICAgICAgIGludCBpZHggPSAwO1xyXG4gICAgICAgICAgICBkaWN0aW9uYXJ5ID0gKF9EaWN0aW9uYXJ5PHN0cmluZywgU3lzdGVtLk9iamVjdD4pcGFyc2VWYWx1ZShyZXF1ZXN0LlJlc3BvbnNlVGV4dCwgcmVmIGlkeCk7XHJcbiAgICAgICAgfVxyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgQ1MwMTA4IC8vIE1lbWJlciBoaWRlcyBpbmhlcml0ZWQgbWVtYmVyOyBtaXNzaW5nIG5ldyBrZXl3b3JkXHJcbiAgICAgICAgcHVibGljIElDb2xsZWN0aW9uPHN0cmluZz4gS2V5c1xyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSBDUzAxMDggLy8gTWVtYmVyIGhpZGVzIGluaGVyaXRlZCBtZW1iZXI7IG1pc3NpbmcgbmV3IGtleXdvcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBkaWN0aW9uYXJ5LktleXM7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIGhhc0tleShzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN5c3RlbS5PYmplY3QgZ2V0UHJvcGVydHkoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeVtuYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTeXN0ZW0uT2JqZWN0IGdldFByb3BlcnR5KHN0cmluZyBuYW1lLCBTeXN0ZW0uT2JqZWN0IGRlZmF1bHRWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnlbbmFtZV07XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IGdldEludChzdHJpbmcgbmFtZSwgaW50IGRlZmF1bHRWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGludCkoZG91YmxlKWRpY3Rpb25hcnlbbmFtZV07IC8vIHZhbHVlcyBhcmUgc3RvcmVkIGluIHRoZSBkaWN0aW9uYXJ5IGFzIGRvdWJsZXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBnZXRGbG9hdChzdHJpbmcgbmFtZSwgZmxvYXQgZGVmYXVsdFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGRpY3Rpb25hcnkuQ29udGFpbnNLZXkobmFtZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZmxvYXQpKGRvdWJsZSlkaWN0aW9uYXJ5W25hbWVdOyAvLyB2YWx1ZXMgYXJlIHN0b3JlZCBpbiB0aGUgZGljdGlvbmFyeSBhcyBkb3VibGVzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlIGdldERvdWJsZShzdHJpbmcgbmFtZSwgZG91YmxlIGRlZmF1bHRWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGRvdWJsZSlkaWN0aW9uYXJ5W25hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBnZXRTdHJpbmcoc3RyaW5nIG5hbWUsIHN0cmluZyBkZWZhdWx0VmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZGljdGlvbmFyeS5Db250YWluc0tleShuYW1lKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChzdHJpbmcpZGljdGlvbmFyeVtuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIGdldEJvb2woc3RyaW5nIG5hbWUsIGJvb2wgZGVmYXVsdFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGRpY3Rpb25hcnkuQ29udGFpbnNLZXkobmFtZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYm9vbClkaWN0aW9uYXJ5W25hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEpTT05BcnJheSBnZXRBcnJheShzdHJpbmcgbmFtZSwgSlNPTkFycmF5IGRlZmF1bHRWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEpTT05BcnJheSgoU3lzdGVtLk9iamVjdFtdKWRpY3Rpb25hcnlbbmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEpTT05UYWJsZSBnZXRKU09OKHN0cmluZyBuYW1lLCBKU09OVGFibGUgZGVmYXVsdFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGRpY3Rpb25hcnkuQ29udGFpbnNLZXkobmFtZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSlNPTlRhYmxlKChfRGljdGlvbmFyeTxzdHJpbmcsIFN5c3RlbS5PYmplY3Q+KWRpY3Rpb25hcnlbbmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIExvZ0Vycm9yKHN0cmluZyBlcnJvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IGdldEludChzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGljdGlvbmFyeS5Db250YWluc0tleShuYW1lKSlcclxuICAgICAgICAgICAgICAgIExvZ0Vycm9yKFwiVGFibGUgaGFzIG5vIGludCBjYWxsZWQgXCIgKyBuYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpKGRvdWJsZSlkaWN0aW9uYXJ5W25hbWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IGdldEZsb2F0KHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpKVxyXG4gICAgICAgICAgICAgICAgTG9nRXJyb3IoXCJUYWJsZSBoYXMgbm8gZmxvYXQgY2FsbGVkIFwiICsgbmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpKGRvdWJsZSlkaWN0aW9uYXJ5W25hbWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBnZXREb3VibGUoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWRpY3Rpb25hcnkuQ29udGFpbnNLZXkobmFtZSkpXHJcbiAgICAgICAgICAgICAgICBMb2dFcnJvcihcIlRhYmxlIGhhcyBubyBkb3VibGUgY2FsbGVkIFwiICsgbmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZG91YmxlKWRpY3Rpb25hcnlbbmFtZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIGdldFN0cmluZyhzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGljdGlvbmFyeS5Db250YWluc0tleShuYW1lKSlcclxuICAgICAgICAgICAgICAgIExvZ0Vycm9yKFwiVGFibGUgaGFzIG5vIHN0cmluZyBjYWxsZWQgXCIgKyBuYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIChzdHJpbmcpZGljdGlvbmFyeVtuYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIGdldFZlY3RvcjIoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBKU09OQXJyYXkgYXJyYXkgPSBnZXRBcnJheShuYW1lKTtcclxuICAgICAgICAgICAgaWYgKGFycmF5Lkxlbmd0aCAhPSAyKVxyXG4gICAgICAgICAgICAgICAgTG9nRXJyb3IoXCJnZXRWZWN0b3IyIC0gYXJyYXkgbGVuZ3RoIGlzIFwiICsgYXJyYXkuTGVuZ3RoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5LnRvVmVjdG9yMigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgZ2V0Qm9vbChzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGljdGlvbmFyeS5Db250YWluc0tleShuYW1lKSlcclxuICAgICAgICAgICAgICAgIExvZ0Vycm9yKFwiVGFibGUgaGFzIG5vIGJvb2wgY2FsbGVkIFwiICsgbmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoYm9vbClkaWN0aW9uYXJ5W25hbWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEpTT05BcnJheSBnZXRBcnJheShzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGljdGlvbmFyeS5Db250YWluc0tleShuYW1lKSlcclxuICAgICAgICAgICAgICAgIExvZ0Vycm9yKFwiVGFibGUgaGFzIG5vIGFycmF5IGNhbGxlZCBcIiArIG5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEpTT05BcnJheSgoU3lzdGVtLk9iamVjdFtdKWRpY3Rpb25hcnlbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEpTT05UYWJsZSBnZXRKU09OKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpKVxyXG4gICAgICAgICAgICAgICAgTG9nRXJyb3IoXCJUYWJsZSBoYXMgbm8gc3VidGFibGUgY2FsbGVkIFwiICsgbmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSlNPTlRhYmxlKChfRGljdGlvbmFyeTxzdHJpbmcsIFN5c3RlbS5PYmplY3Q+KWRpY3Rpb25hcnlbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIFN5c3RlbS5PYmplY3QgcGFyc2VWYWx1ZShzdHJpbmcganNvbiwgcmVmIGludCBpZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTa2lwV2hpdGVzcGFjZShqc29uLCByZWYgaWR4KTtcclxuICAgICAgICAgICAgaWYgKGpzb25baWR4XSA9PSAneycpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9EaWN0aW9uYXJ5PHN0cmluZywgU3lzdGVtLk9iamVjdD4gcmVzdWx0ID0gbmV3IF9EaWN0aW9uYXJ5PHN0cmluZywgU3lzdGVtLk9iamVjdD4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgICAgICBTa2lwV2hpdGVzcGFjZShqc29uLCByZWYgaWR4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVybWl0IHRyYWlsaW5nIGNvbW1hcyAtIHtcImZvb1wiOlwiYmFyXCIgLCB9IGlzIGxlZ2FsXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb25baWR4XSA9PSAnfScpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBrZXkgPSAoc3RyaW5nKXBhcnNlVmFsdWUoanNvbiwgcmVmIGlkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgU2tpcFdoaXRlc3BhY2UoanNvbiwgcmVmIGlkeCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uW2lkeF0gIT0gJzonKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0RXJyb3IoanNvbiwgaWR4LCBcIkludmFsaWQga2V5dmFsdWUgc2VwYXJhdG9yOiBcIiArIGpzb25baWR4XSArIFwiIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgICAgICBTeXN0ZW0uT2JqZWN0IHZhbHVlID0gcGFyc2VWYWx1ZShqc29uLCByZWYgaWR4KTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBTa2lwV2hpdGVzcGFjZShqc29uLCByZWYgaWR4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb25baWR4XSA9PSAnfScpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoanNvbltpZHhdICE9ICcsJylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUmVwb3J0RXJyb3IoanNvbiwgaWR4LCBcIkV4cGVjdGVkIGEgY29tbWEsIGdvdDogXCIgKyBqc29uW2lkeF0gKyBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGVybWl0IG1pc3NpbmcgY29tbWFzIC0ge1wiZm9vXCI6MSBcImJhclwiOjEgfSBpcyBsZWdhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZHgtLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoanNvbltpZHhdID09ICdbJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTGlzdDxTeXN0ZW0uT2JqZWN0PiB2YWx1ZXMgPSBuZXcgTGlzdDxTeXN0ZW0uT2JqZWN0PigpO1xyXG4gICAgICAgICAgICAgICAgKytpZHg7XHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2tpcFdoaXRlc3BhY2UoanNvbiwgcmVmIGlkeCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uW2lkeF0gPT0gJ10nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytpZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXMuVG9BcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgU3lzdGVtLk9iamVjdCB2YWx1ZSA9IHBhcnNlVmFsdWUoanNvbiwgcmVmIGlkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgU2tpcFdoaXRlc3BhY2UoanNvbiwgcmVmIGlkeCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5BZGQodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBTa2lwV2hpdGVzcGFjZShqc29uLCByZWYgaWR4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb25baWR4XSA9PSAnLCcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoanNvbltpZHhdICE9ICddJylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlcG9ydEVycm9yKGpzb24sIGlkeCwgXCJFeHBlY3RlZCBhIGNvbW1hLCBnb3Q6IFwiICsganNvbltpZHhdICsgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChqc29uW2lkeF0gPT0gJ1wiJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgKytpZHg7XHJcbiAgICAgICAgICAgICAgICBTdHJpbmcgc3RyaW5nU29GYXIgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaW50IHN0YXJ0SWR4ID0gaWR4O1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGpzb25baWR4XSAhPSAnXCInKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uW2lkeF0gPT0gJ1xcXFwnKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nU29GYXIgKz0ganNvbi5TdWJzdHJpbmcoc3RhcnRJZHgsIGlkeCAtIHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWR4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqc29uW2lkeF0gPT0gJ24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdTb0ZhciArPSAnXFxuJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ1NvRmFyICs9IGpzb25baWR4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydElkeCA9IGlkeCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICsraWR4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKytpZHg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nU29GYXIgKyBqc29uLlN1YnN0cmluZyhzdGFydElkeCwgaWR4IC0gc3RhcnRJZHggLSAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChqc29uW2lkeF0gPT0gJy0nIHx8IGpzb25baWR4XSA+PSAnMCcgJiYganNvbltpZHhdIDw9ICc5JylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYm9vbCBuZWdhdGUgPSAoanNvbltpZHhdID09ICctJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmVnYXRlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICsraWR4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGludCBudW1iZXJTb0ZhciA9IDA7XHJcbiAgICAgICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlclNvRmFyID0gbnVtYmVyU29GYXIgKiAxMCArIGpzb25baWR4XSAtICcwJztcclxuICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdoaWxlIChqc29uW2lkeF0gPj0gJzAnICYmIGpzb25baWR4XSA8PSAnOScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvdWJsZSByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25baWR4XSA9PSAnLicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZmxvYXRpbmcgcG9pbnRcclxuICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW50IGZyYWN0aW9uU29GYXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdWJsZSBkaXZpc29yID0gMS4wZjtcclxuICAgICAgICAgICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhY3Rpb25Tb0ZhciA9IGZyYWN0aW9uU29GYXIgKiAxMCArIGpzb25baWR4XSAtICcwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2aXNvciAqPSAxMC4wZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytpZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChqc29uW2lkeF0gPj0gJzAnICYmIGpzb25baWR4XSA8PSAnOScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBudW1iZXJTb0ZhciArIGZyYWN0aW9uU29GYXIgLyBkaXZpc29yO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bWJlclNvRmFyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZWdhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChqc29uW2lkeF0gPj0gJ2EnICYmIGpzb25baWR4XSA8PSAneicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBzdGFydElkeCA9IGlkeDtcclxuICAgICAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgKytpZHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoanNvbltpZHhdID49ICdhJyAmJiBqc29uW2lkeF0gPD0gJ3onKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmcga2V5d29yZCA9IGpzb24uU3Vic3RyaW5nKHN0YXJ0SWR4LCBpZHggLSBzdGFydElkeCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5d29yZCA9PSBcImZhbHNlXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoa2V5d29yZCA9PSBcInRydWVcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSZXBvcnRFcnJvcihqc29uLCBpZHgsIFwiSW52YWxpZCBqc29uIGtleXdvcmQ6IFwiICsga2V5d29yZCArIFwiIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJlcG9ydEVycm9yKGpzb24sIGlkeCwgXCJJbnZhbGlkIHN5bWJvbDogJ1wiICsganNvbltpZHhdICsgXCInXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIFNraXBXaGl0ZXNwYWNlKHN0cmluZyB0ZXh0LCByZWYgaW50IGlkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0Lkxlbmd0aCA8PSBpZHgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2hhciBjID0gdGV4dFtpZHhdO1xyXG4gICAgICAgICAgICB3aGlsZSAoYyA9PSAnICcgfHwgYyA9PSAnXFx0JyB8fCBjID09ICdcXHInIHx8IGMgPT0gJ1xcbicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICsraWR4O1xyXG4gICAgICAgICAgICAgICAgYyA9IHRleHRbaWR4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGMgPT0gJy8nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtpZHggKyAxXSA9PSAnLycpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICsraWR4OyAvLyB0byB0aGUgL1xyXG4gICAgICAgICAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2lkeDsgLy8gdG8gdGhlIGNoYXJhY3RlciBhZnRlciB0aGUgL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gdGV4dFtpZHhdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaWR4IDwgdGV4dC5MZW5ndGggJiYgYyAhPSAnXFxuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0ZXh0W2lkeCArIDFdID09ICcqJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvKiBjb21tZW50ICovXHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHN0YXJ0SWR4ID0gaWR4O1xyXG4gICAgICAgICAgICAgICAgICAgICsraWR4OyAvLyB0byB0aGUgKlxyXG4gICAgICAgICAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2lkeDsgLy8gdG8gdGhlIGNoYXJhY3RlciBhZnRlciB0aGUgKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gdGV4dFtpZHhdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaWR4IDwgdGV4dC5MZW5ndGggJiYgKGMgIT0gJyonIHx8IHRleHRbaWR4ICsgMV0gIT0gJy8nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA9PSB0ZXh0Lkxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlcG9ydEVycm9yKHRleHQsIHN0YXJ0SWR4LCBcIlVudGVybWluYXRlZCAvKiBjb21tZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZHggKz0gMjsgLy8gdG8gdGhlIGNoYXJhY3RlciBhZnRlciB0aGUgKi9cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgU2tpcFdoaXRlc3BhY2UodGV4dCwgcmVmIGlkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgU3RyaW5nIHBhcnNlQ29tbWFuZFdvcmQoc3RyaW5nIHRleHQsIHJlZiBpbnQgaWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2tpcFdoaXRlc3BhY2UodGV4dCwgcmVmIGlkeCk7XHJcbiAgICAgICAgICAgIGlmICgodGV4dFtpZHhdID49ICdhJyAmJiB0ZXh0W2lkeF0gPD0gJ3onKSB8fCAodGV4dFtpZHhdID49ICdBJyAmJiB0ZXh0W2lkeF0gPD0gJ1onKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHN0YXJ0SWR4ID0gaWR4O1xyXG4gICAgICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdoaWxlIChpZHggPCB0ZXh0Lkxlbmd0aCAmJiAoKHRleHRbaWR4XSA+PSAnYScgJiYgdGV4dFtpZHhdIDw9ICd6JykgfHwgKHRleHRbaWR4XSA+PSAnQScgJiYgdGV4dFtpZHhdIDw9ICdaJykpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgd29yZCA9IHRleHQuU3Vic3RyaW5nKHN0YXJ0SWR4LCBpZHggLSBzdGFydElkeCk7XHJcbiAgICAgICAgICAgICAgICBpZiAod29yZCA9PSBcInRydWVcIiB8fCB3b3JkID09IFwiZmFsc2VcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDsgLy8gY2FuJ3QgaGFuZGxlIGtleXdvcmRzIGhlcmVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB3b3JkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIFJlcG9ydEVycm9yKHN0cmluZyBqc29uLCBpbnQgZXJyb3JBdCwgc3RyaW5nIG1lc3NhZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbGluZU51bWJlciA9IDE7XHJcbiAgICAgICAgICAgIGludCBsaW5lU3RhcnRJZHggPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpZHggPSAwOyBpZHggPD0gZXJyb3JBdDsgKytpZHgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uW2lkeF0gPT0gJ1xcbicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgKytsaW5lTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVTdGFydElkeCA9IGlkeCArIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0cmluZyBsaW5lVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGVuZElkeCA9IGVycm9yQXQgKyAxOyBlbmRJZHggPCBqc29uLkxlbmd0aDsgKytlbmRJZHgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uW2VuZElkeF0gPT0gJ1xcbicgfHwganNvbltlbmRJZHhdID09ICdcXHInKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVUZXh0ID0ganNvbi5TdWJzdHJpbmcobGluZVN0YXJ0SWR4LCBlbmRJZHggLSBsaW5lU3RhcnRJZHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBMb2dFcnJvcihcIkpTT04gZXJyb3IgYXQgbGluZSBcIiArIGxpbmVOdW1iZXIgKyBcIiAtIFwiICsgbGluZVRleHQgKyBcIlxcblwiICsgbWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cmluZyByZXN1bHQgPSBcInsgXCI7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHN0cmluZyBrZXkgaW4gZGljdGlvbmFyeS5LZXlzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTeXN0ZW0uT2JqZWN0IHZhbCA9IGRpY3Rpb25hcnlba2V5XTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwuR2V0VHlwZSgpID09IHR5cGVvZihzdHJpbmcpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcXCJcIiArIGtleSArIFwiXFxcIjpcXFwiXCIgKyB2YWwgKyBcIlxcXCIsXFxuXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxcIlwiICsga2V5ICsgXCJcXFwiOlwiICsgdmFsICsgXCIsXFxuXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0ICs9IFwifVwiO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKHN0cmluZyBrZXksIFN5c3RlbS5PYmplY3QgdmFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGljdGlvbmFyeVtrZXldID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIExSQ0VuZ2luZVxyXG57XHJcbiAgICBwdWJsaWMgZW51bSBSb3RhdGlvbjkwXHJcbiAgICB7XHJcbiAgICAgICAgTm9uZSxcclxuICAgICAgICBSb3Q5MCxcclxuICAgICAgICBSb3QxODAsXHJcbiAgICAgICAgUm90MjcwXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gVGV4dEFsaWdubWVudFxyXG4gICAge1xyXG4gICAgICAgIExFRlQsXHJcbiAgICAgICAgQ0VOVEVSLFxyXG4gICAgICAgIFJJR0hULFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgTFJDRW5naW5lRXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRG90UHJvZHVjdCh0aGlzIFZlY3RvcjIgYSwgVmVjdG9yMiBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuWCAqIGIuWCArIGEuWSAqIGIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgYSB2ZWN0b3IgdG8gYW4gYW5nbGUuIER1ZSByaWdodCAoVmVjdG9yMigxLDApKSBpcyBhdCAwLjBmLCBhbmQgdGhlIGFuZ2xlcyBjb250aW51ZSBjbG9ja3dpc2UuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBUb0FuZ2xlKHRoaXMgVmVjdG9yMiBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgbGVuID0gYS5MZW5ndGgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsZW4gPCAwLjAwMWYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMiBkaXIgPSBhIC8gbGVuO1xyXG5cclxuICAgICAgICAgICAgICAgIGZsb2F0IHJlc3VsdCA9IChmbG9hdClNYXRoLkFzaW4oZGlyLlkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGEuWCA8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gKGZsb2F0KShNYXRoLlBJLXJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgQ29udGFpbnModGhpcyBSZWN0YW5nbGUgcmVjdCwgVmVjdG9yMiBwb3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjdC5Db250YWlucyhuZXcgUG9pbnQoKGludClwb3MuWCwgKGludClwb3MuWSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyIFhZKHRoaXMgUmVjdGFuZ2xlIHJlY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIocmVjdC5YLCByZWN0LlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERyYXcodGhpcyBTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgUmljaEltYWdlIGltYWdlLCBSZWN0YW5nbGUgcmVjdCwgQ29sb3IgY29sKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW1hZ2UuRHJhdyhzcHJpdGVCYXRjaCwgcmVjdCwgY29sKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTXVsdGlwbHkodGhpcyBDb2xvciBjb2wxLCBDb2xvciBjb2wyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihjb2wxLlIgKiBjb2wyLlIgKiAoMSAvIDY1NTM2LjBmKSwgY29sMS5HICogY29sMi5HICogKDEgLyA2NTUzNi4wZiksIGNvbDEuQiAqIGNvbDIuQiAqICgxIC8gNjU1MzYuMGYpLCBjb2wxLkEgKiBjb2wyLkEgKiAoMSAvIDY1NTM2LjBmKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjIgU2l6ZSh0aGlzIFRleHR1cmUyRCB0ZXh0dXJlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHRleHR1cmUuV2lkdGgsIHRleHR1cmUuSGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IGhleFRvSW50KHRoaXMgU3RyaW5nIHN0cilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCByZXN1bHQgPSAwO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChjaGFyIGMgaW4gc3RyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYyA+PSAnYScgJiYgYyA8PSAnZicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gKGMgLSAnYScpICsgMTAgKyByZXN1bHQgKiAxNjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGMgPj0gJ0EnICYmIGMgPD0gJ0YnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IChjIC0gJ0EnKSArIDEwICsgcmVzdWx0ICogMTY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjID49ICcwJyAmJiBjIDw9ICc5JylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAoYyAtICcwJykgKyByZXN1bHQgKiAxNjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciB0b0NvbG9yKHRoaXMgU3RyaW5nIHN0cilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChzdHIuTGVuZ3RoID09IDYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3Ioc3RyLlN1YnN0cmluZygwLCAyKS5oZXhUb0ludCgpLCBzdHIuU3Vic3RyaW5nKDIsIDIpLmhleFRvSW50KCksIHN0ci5TdWJzdHJpbmcoNCwgMikuaGV4VG9JbnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc3RyLkxlbmd0aCA9PSA4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKHN0ci5TdWJzdHJpbmcoMCwgMikuaGV4VG9JbnQoKSwgc3RyLlN1YnN0cmluZygyLCAyKS5oZXhUb0ludCgpLCBzdHIuU3Vic3RyaW5nKDQsIDIpLmhleFRvSW50KCksIHN0ci5TdWJzdHJpbmcoNiwgMikuaGV4VG9JbnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIENvbG9yLldoaXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgdG9JbnQodGhpcyBSb3RhdGlvbjkwIHJvdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocm90KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFJvdGF0aW9uOTAuUm90OTA6IHJldHVybiA5MDtcclxuICAgICAgICAgICAgICAgIGNhc2UgUm90YXRpb245MC5Sb3QxODA6IHJldHVybiAxODA7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFJvdGF0aW9uOTAuUm90MjcwOiByZXR1cm4gMjcwO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUm90YXRpb245MCBnZXRSb3RhdGlvbih0aGlzIEpTT05UYWJsZSB0YWJsZSwgc3RyaW5nIG5hbWUsIFJvdGF0aW9uOTAgZGVmYXVsdFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGFuZ2xlID0gdGFibGUuZ2V0SW50KG5hbWUsIGRlZmF1bHRWYWx1ZS50b0ludCgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIChSb3RhdGlvbjkwKShhbmdsZSAvIDkwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUm90YXRpb245MCByb3RhdGVCeSh0aGlzIFJvdGF0aW9uOTAgcm90YXRpb24sIFJvdGF0aW9uOTAgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbmV3Um90YXRpb24gPSAocm90YXRpb24udG9JbnQoKSArIG90aGVyLnRvSW50KCkpICUgMzYwO1xyXG4gICAgICAgICAgICByZXR1cm4gKFJvdGF0aW9uOTApKG5ld1JvdGF0aW9uIC8gOTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBSb3RhdGlvbjkwIGludmVydCh0aGlzIFJvdGF0aW9uOTAgcm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbmV3Um90YXRpb24gPSAzNjAgLSByb3RhdGlvbi50b0ludCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gKFJvdGF0aW9uOTApKG5ld1JvdGF0aW9uIC8gOTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERyYXdTdHJpbmcodGhpcyBTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgU3ByaXRlRm9udCBmb250LCBzdHJpbmcgdGV4dCwgVmVjdG9yMiBwb3NpdGlvbiwgVGV4dEFsaWdubWVudCBhbGlnbm1lbnQsIENvbG9yIGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChhbGlnbm1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGV4dEFsaWdubWVudC5MRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXdTdHJpbmcoZm9udCwgdGV4dCwgcG9zaXRpb24sIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVGV4dEFsaWdubWVudC5SSUdIVDpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZlY3RvcjIgc2l6ZSA9IGZvbnQuTWVhc3VyZVN0cmluZyh0ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhd1N0cmluZyhmb250LCB0ZXh0LCBuZXcgVmVjdG9yMigoaW50KShwb3NpdGlvbi5YIC0gc2l6ZS5YKSwgcG9zaXRpb24uWSksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRleHRBbGlnbm1lbnQuQ0VOVEVSOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmVjdG9yMiBzaXplID0gZm9udC5NZWFzdXJlU3RyaW5nKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3U3RyaW5nKGZvbnQsIHRleHQsIG5ldyBWZWN0b3IyKChpbnQpKHBvc2l0aW9uLlggLSBzaXplLlggLyAyKSwgcG9zaXRpb24uWSksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEluc2VydExpbmVCcmVha3ModGhpcyBzdHJpbmcgcmF3VGV4dCwgU3ByaXRlRm9udCBmb250LCBpbnQgbGluZVdpZHRoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgc3BhY2VXaWR0aCA9IGZvbnQuTWVhc3VyZVN0cmluZyhcIiBcIikuWDtcclxuICAgICAgICAgICAgZmxvYXQgeCA9IDA7XHJcbiAgICAgICAgICAgIGludCB3b3JkU3RhcnRJZHggPSAwO1xyXG4gICAgICAgICAgICBzdHJpbmcgcmVzdWx0ID0gXCJcIjtcclxuICAgICAgICAgICAgc3RyaW5nIGxhc3RTcGxpdCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZsb2F0IGxhc3RTcGxpdFdpZHRoID0gMDtcclxuICAgICAgICAgICAgZm9yKGludCBJZHggPSAwOyBJZHggPD0gcmF3VGV4dC5MZW5ndGg7ICsrSWR4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihJZHggPT0gcmF3VGV4dC5MZW5ndGggfHwgcmF3VGV4dFtJZHhdID09ICcgJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgd29yZCA9IHJhd1RleHQuU3Vic3RyaW5nKHdvcmRTdGFydElkeCwgSWR4IC0gd29yZFN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCB3b3JkV2lkdGggPSBmb250Lk1lYXN1cmVTdHJpbmcod29yZCkuWDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCArIGxhc3RTcGxpdFdpZHRoICsgd29yZFdpZHRoID4gbGluZVdpZHRoKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gbGFzdFNwbGl0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ICs9IGxhc3RTcGxpdFdpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElkeCA8IHJhd1RleHQuTGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U3BsaXQgPSBcIlwiICsgcmF3VGV4dFtJZHhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNwbGl0V2lkdGggPSBmb250Lk1lYXN1cmVTdHJpbmcobGFzdFNwbGl0KS5YO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB3b3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIHggKz0gd29yZFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmRTdGFydElkeCA9IElkeCArIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyYXdUZXh0W0lkeF0gPT0gJ1xcbicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRHJhd0JlYW0odGhpcyBTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgVGV4dHVyZTJEIHRleHR1cmUsIFZlY3RvcjIgc3RhcnQsIFZlY3RvcjIgZW5kLCBpbnQgdGhpY2tuZXNzLCBDb2xvciBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgb2Zmc2V0ID0gZW5kIC0gc3RhcnQ7XHJcbiAgICAgICAgICAgIGZsb2F0IGJlYW1Sb3RhdGlvbiA9IG9mZnNldC5Ub0FuZ2xlKCk7XHJcbiAgICAgICAgICAgIFJlY3RhbmdsZSBiZWFtUmVjdCA9IG5ldyBSZWN0YW5nbGUoKGludClzdGFydC5YLCAoaW50KXN0YXJ0LlksIChpbnQpb2Zmc2V0Lkxlbmd0aCgpLCB0aGlja25lc3MpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIGJlYW1SZWN0LCBudWxsLCBjb2xvciwgYmVhbVJvdGF0aW9uLCBuZXcgVmVjdG9yMigwLCB0ZXh0dXJlLkhlaWdodC8yKSwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwLjBmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUmVjdGFuZ2xlIEdldFN0cmluZ0JvdW5kcyh0aGlzIFNwcml0ZUZvbnQgZm9udCwgc3RyaW5nIHRleHQsIFZlY3RvcjIgcG9zaXRpb24sIFRleHRBbGlnbm1lbnQgYWxpZ25tZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMiBzaXplID0gZm9udC5NZWFzdXJlU3RyaW5nKHRleHQpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGFsaWdubWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0QWxpZ25tZW50LkxFRlQ6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKChpbnQpcG9zaXRpb24uWCwgKGludClwb3NpdGlvbi5ZLCAoaW50KXNpemUuWCwgKGludClzaXplLlkpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0QWxpZ25tZW50LlJJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKChpbnQpKHBvc2l0aW9uLlggLSBzaXplLlgpLCAoaW50KXBvc2l0aW9uLlksIChpbnQpc2l6ZS5YLCAoaW50KXNpemUuWSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRleHRBbGlnbm1lbnQuQ0VOVEVSOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKChpbnQpKHBvc2l0aW9uLlggLSBzaXplLlgqMC41ZiksIChpbnQpcG9zaXRpb24uWSwgKGludClzaXplLlgsIChpbnQpc2l6ZS5ZKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBSZWN0YW5nbGUgQmxvYXQodGhpcyBSZWN0YW5nbGUgcmVjdCwgaW50IGFtb3VudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHJlY3QuWCAtIGFtb3VudCwgcmVjdC5ZIC0gYW1vdW50LCByZWN0LldpZHRoICsgYW1vdW50ICogMiwgcmVjdC5IZWlnaHQgKyBhbW91bnQgKiAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUmVjdGFuZ2xlIEZpeE5lZ2F0aXZlcyh0aGlzIFJlY3RhbmdsZSByZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICBNYXRoLk1pbihyZWN0LlgsIHJlY3QuWCArIHJlY3QuV2lkdGgpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5NaW4ocmVjdC5ZLCByZWN0LlkgKyByZWN0LkhlaWdodCksXHJcbiAgICAgICAgICAgICAgICBNYXRoLkFicyhyZWN0LldpZHRoKSxcclxuICAgICAgICAgICAgICAgIE1hdGguQWJzKHJlY3QuSGVpZ2h0KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuQ29udGVudDtcclxuXHJcbm5hbWVzcGFjZSBMUkNFbmdpbmVcclxue1xyXG4gICAgaW50ZXJmYWNlIElEcmF3TW9kZVxyXG4gICAge1xyXG4gICAgICAgIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgUmVjdGFuZ2xlIHJlY3QsIFRleHR1cmUyRCB0ZXh0dXJlLCBDb2xvciBjb2xvciwgUm90YXRpb245MCByb3RhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRHJhd01vZGVfRml4ZWQgOiBJRHJhd01vZGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBSZWN0YW5nbGUgcmVjdCwgVGV4dHVyZTJEIHRleHR1cmUsIENvbG9yIGNvbG9yLCBSb3RhdGlvbjkwIHJvdGF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgVmVjdG9yMihyZWN0LkxlZnQsIHJlY3QuVG9wKSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEcmF3TW9kZV9GaXR0ZWQgOiBJRHJhd01vZGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBSZWN0YW5nbGUgcmVjdCwgVGV4dHVyZTJEIHRleHR1cmUsIENvbG9yIGNvbG9yLCBSb3RhdGlvbjkwIHJvdGF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdGV4dHVyZUFzcGVjdCA9IHRleHR1cmUuV2lkdGggLyAoZmxvYXQpdGV4dHVyZS5IZWlnaHQ7XHJcbiAgICAgICAgICAgIGZsb2F0IHJlY3RBc3BlY3QgPSByZWN0LldpZHRoIC8gKGZsb2F0KXJlY3QuSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgZmxvYXQgc2NhbGU7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0dXJlQXNwZWN0ID4gcmVjdEFzcGVjdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gZml0IHdpZHRoXHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IHJlY3QuV2lkdGggLyAoZmxvYXQpdGV4dHVyZS5XaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gcmVjdC5IZWlnaHQgLyAoZmxvYXQpdGV4dHVyZS5IZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFJlY3RhbmdsZSBkcmF3UmVjdCA9IG5ldyBSZWN0YW5nbGUoKGludCkocmVjdC5YICsgMC41ZioocmVjdC5XaWR0aCAtIHRleHR1cmUuV2lkdGgqc2NhbGUpKSwgKGludCkocmVjdC5ZICsgMC41ZioocmVjdC5IZWlnaHQgLSB0ZXh0dXJlLkhlaWdodCpzY2FsZSkpLCAoaW50KSh0ZXh0dXJlLldpZHRoKnNjYWxlKSwgKGludCkodGV4dHVyZS5IZWlnaHQqc2NhbGUpKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBkcmF3UmVjdCwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEcmF3TW9kZV9TdHJldGNoZWQ6IElEcmF3TW9kZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFJlY3RhbmdsZSByZWN0LCBUZXh0dXJlMkQgdGV4dHVyZSwgQ29sb3IgY29sb3IsIFJvdGF0aW9uOTAgcm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCByb3QgPSAwLjBmO1xyXG4gICAgICAgICAgICBpbnQgcm90V2lkdGggPSByZWN0LldpZHRoO1xyXG4gICAgICAgICAgICBpbnQgcm90SGVpZ2h0ID0gcmVjdC5IZWlnaHQ7XHJcbiAgICAgICAgICAgIGlmIChyb3RhdGlvbiA9PSBSb3RhdGlvbjkwLk5vbmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgcmVjdCwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocm90YXRpb24gPT0gUm90YXRpb245MC5Sb3Q5MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm90ID0gKGZsb2F0KShNYXRoLlBJICogMC41KTtcclxuICAgICAgICAgICAgICAgIHJvdFdpZHRoID0gcmVjdC5IZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICByb3RIZWlnaHQgPSByZWN0LldpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJvdGF0aW9uID09IFJvdGF0aW9uOTAuUm90MTgwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3QgPSAoZmxvYXQpTWF0aC5QSTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChyb3RhdGlvbiA9PSBSb3RhdGlvbjkwLlJvdDI3MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm90ID0gKGZsb2F0KShNYXRoLlBJICogMS41KTtcclxuICAgICAgICAgICAgICAgIHJvdFdpZHRoID0gcmVjdC5IZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICByb3RIZWlnaHQgPSByZWN0LldpZHRoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnQgaGFsZldpZHRoID0gcmVjdC5XaWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGludCBoYWxmSGVpZ2h0ID0gcmVjdC5IZWlnaHQgLyAyO1xyXG5cclxuICAgICAgICAgICAgUmVjdGFuZ2xlIHJvdFJlY3QgPSBuZXcgUmVjdGFuZ2xlKChpbnQpKHJlY3QuWCArIGhhbGZXaWR0aCksIChpbnQpKHJlY3QuWSArIGhhbGZIZWlnaHQpLCByb3RXaWR0aCwgcm90SGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9yaWdpbiB3b3VsZCBiZSA8dGV4dHVyZS5XaWR0aC8yLCB0ZXh0dXJlLkhlaWdodC8yPiwgaWYgaGFsZldpZHRoIGFuZCBoYWxmSGVpZ2h0IHdlcmVuJ3Qgcm91bmRlZFxyXG4gICAgICAgICAgICBWZWN0b3IyIG9yaWdpbiA9IG5ldyBWZWN0b3IyKHRleHR1cmUuV2lkdGggKiAoaGFsZldpZHRoIC8gKGZsb2F0KXJlY3QuV2lkdGgpLCB0ZXh0dXJlLkhlaWdodCAqIChoYWxmSGVpZ2h0LyhmbG9hdClyZWN0LkhlaWdodCkpO1xyXG5cclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCByb3RSZWN0LCBudWxsLCBjb2xvciwgcm90LCBvcmlnaW4sIFNwcml0ZUVmZmVjdHMuTm9uZSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xhc3MgRHJhd01vZGVfVGlsZWQgOiBJRHJhd01vZGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBSZWN0YW5nbGUgcmVjdCwgVGV4dHVyZTJEIHRleHR1cmUsIENvbG9yIGNvbG9yLCBSb3RhdGlvbjkwIHJvdGF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgWCA9IHJlY3QuWDsgWCA8IHJlY3QuWCArIHJlY3QuV2lkdGg7IFggKz0gdGV4dHVyZS5XaWR0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgWSA9IHJlY3QuWTsgWSA8IHJlY3QuWSArIHJlY3QuSGVpZ2h0OyBZICs9IHRleHR1cmUuSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgbmV3IFZlY3RvcjIoWCwgWSksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xhc3MgRHJhd01vZGVfU3RyZXRjaDlHcmlkIDogSURyYXdNb2RlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgUmVjdGFuZ2xlIHJlY3QsIFRleHR1cmUyRCB0ZXh0dXJlLCBDb2xvciBjb2xvciwgUm90YXRpb245MCByb3RhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBub25TdHJldGNoV2lkdGggPSB0ZXh0dXJlLldpZHRoIC8gMjtcclxuICAgICAgICAgICAgaW50IG5vblN0cmV0Y2hIZWlnaHQgPSB0ZXh0dXJlLkhlaWdodCAvIDI7XHJcblxyXG4gICAgICAgICAgICBpbnQgdGV4TWlkZGxlV2lkdGggPSB0ZXh0dXJlLldpZHRoIC0gbm9uU3RyZXRjaFdpZHRoICogMjtcclxuICAgICAgICAgICAgaW50IHRleE1pZGRsZUhlaWdodCA9IHRleHR1cmUuSGVpZ2h0IC0gbm9uU3RyZXRjaEhlaWdodCAqIDI7XHJcbiAgICAgICAgICAgIGludCB0ZXhSaWdodEVkZ2VYID0gdGV4dHVyZS5XaWR0aCAtIG5vblN0cmV0Y2hXaWR0aDtcclxuICAgICAgICAgICAgaW50IHRleEJvdHRvbUVkZ2VZID0gdGV4dHVyZS5IZWlnaHQgLSBub25TdHJldGNoSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaW50IHNjcmVlbk1pZGRsZVdpZHRoID0gcmVjdC5XaWR0aCAtIG5vblN0cmV0Y2hXaWR0aCAqIDI7XHJcbiAgICAgICAgICAgIGludCBzY3JlZW5NaWRkbGVIZWlnaHQgPSByZWN0LkhlaWdodCAtIG5vblN0cmV0Y2hIZWlnaHQgKiAyO1xyXG4gICAgICAgICAgICBpbnQgcmlnaHRFZGdlWCA9IHJlY3QuWCArIHJlY3QuV2lkdGggLSBub25TdHJldGNoV2lkdGg7XHJcbiAgICAgICAgICAgIGludCBib3R0b21FZGdlWSA9IHJlY3QuWSArIHJlY3QuSGVpZ2h0IC0gbm9uU3RyZXRjaEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIC8vIFRMLCB0b3AsIFRSXHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUocmVjdC5YLCAgIHJlY3QuWSwgbm9uU3RyZXRjaFdpZHRoLCBub25TdHJldGNoSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUoMCwgICAgICAgIDAsICAgICAgbm9uU3RyZXRjaFdpZHRoLCBub25TdHJldGNoSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIGNvbG9yKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShyZWN0LlgrIG5vblN0cmV0Y2hXaWR0aCwgIHJlY3QuWSwgc2NyZWVuTWlkZGxlV2lkdGgsIG5vblN0cmV0Y2hIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShub25TdHJldGNoV2lkdGgsICAgICAgICAgIDAsICAgICAgdGV4TWlkZGxlV2lkdGgsIG5vblN0cmV0Y2hIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgY29sb3IpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKHJpZ2h0RWRnZVgsICAgICAgIHJlY3QuWSwgbm9uU3RyZXRjaFdpZHRoLCBub25TdHJldGNoSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUodGV4UmlnaHRFZGdlWCwgICAgMCwgICAgICBub25TdHJldGNoV2lkdGgsIG5vblN0cmV0Y2hIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgLy8gbGVmdCwgY2VudGVyLCByaWdodFxyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKHJlY3QuWCwgICByZWN0LlkrIG5vblN0cmV0Y2hIZWlnaHQsICAgbm9uU3RyZXRjaFdpZHRoLCBzY3JlZW5NaWRkbGVIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZSgwLCAgICAgICAgbm9uU3RyZXRjaEhlaWdodCwgICAgICAgICAgIG5vblN0cmV0Y2hXaWR0aCwgdGV4TWlkZGxlSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIGNvbG9yKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShyZWN0LlgrIG5vblN0cmV0Y2hXaWR0aCwgIHJlY3QuWSsgbm9uU3RyZXRjaEhlaWdodCwgICBzY3JlZW5NaWRkbGVXaWR0aCwgc2NyZWVuTWlkZGxlSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUobm9uU3RyZXRjaFdpZHRoLCAgICAgICAgICBub25TdHJldGNoSGVpZ2h0LCAgICAgICAgICAgdGV4TWlkZGxlV2lkdGgsIHRleE1pZGRsZUhlaWdodCksXHJcbiAgICAgICAgICAgICAgICBjb2xvcik7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUocmlnaHRFZGdlWCwgICAgICAgcmVjdC5ZKyBub25TdHJldGNoSGVpZ2h0LCAgIG5vblN0cmV0Y2hXaWR0aCwgc2NyZWVuTWlkZGxlSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUodGV4UmlnaHRFZGdlWCwgICAgbm9uU3RyZXRjaEhlaWdodCwgICAgICAgICAgIG5vblN0cmV0Y2hXaWR0aCwgdGV4TWlkZGxlSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJMLCBib3R0b20sIEJSXHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUocmVjdC5YLCAgIGJvdHRvbUVkZ2VZLCAgICBub25TdHJldGNoV2lkdGgsIG5vblN0cmV0Y2hIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZSgwLCAgICAgICAgdGV4Qm90dG9tRWRnZVksIG5vblN0cmV0Y2hXaWR0aCwgbm9uU3RyZXRjaEhlaWdodCksXHJcbiAgICAgICAgICAgICAgICBjb2xvcik7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUocmVjdC5YKyBub25TdHJldGNoV2lkdGgsICAgIGJvdHRvbUVkZ2VZLCAgICAgIHNjcmVlbk1pZGRsZVdpZHRoLCBub25TdHJldGNoSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUobm9uU3RyZXRjaFdpZHRoLCAgICAgICAgICAgIHRleEJvdHRvbUVkZ2VZLCAgIHRleE1pZGRsZVdpZHRoLCBub25TdHJldGNoSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIGNvbG9yKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShyaWdodEVkZ2VYLCAgICAgICBib3R0b21FZGdlWSwgICAgbm9uU3RyZXRjaFdpZHRoLCBub25TdHJldGNoSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUodGV4UmlnaHRFZGdlWCwgICAgdGV4Qm90dG9tRWRnZVksIG5vblN0cmV0Y2hXaWR0aCwgbm9uU3RyZXRjaEhlaWdodCksXHJcbiAgICAgICAgICAgICAgICBjb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERyYXdNb2RlX1RpbGVkOUdyaWQgOiBJRHJhd01vZGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBSZWN0YW5nbGUgcmVjdCwgVGV4dHVyZTJEIHRleHR1cmUsIENvbG9yIGNvbG9yLCBSb3RhdGlvbjkwIHJvdGF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gbWFuLCB0aGlzIGlzIGZpZGRseVxyXG4gICAgICAgICAgICBpbnQgZnJhZ21lbnRXID0gdGV4dHVyZS5XaWR0aCAvIDQ7XHJcbiAgICAgICAgICAgIGludCBmcmFnbWVudEggPSB0ZXh0dXJlLkhlaWdodCAvIDQ7XHJcbiAgICAgICAgICAgIGludCByaWdodEVkZ2VYID0gcmVjdC5YICsgcmVjdC5XaWR0aCAtIGZyYWdtZW50VztcclxuICAgICAgICAgICAgaW50IGJvdHRvbUVkZ2VZID0gcmVjdC5ZICsgcmVjdC5IZWlnaHQgLSBmcmFnbWVudEg7XHJcbiAgICAgICAgICAgIGludCBYO1xyXG4gICAgICAgICAgICBpbnQgWSA9IHJlY3QuWSArIGZyYWdtZW50SDtcclxuICAgICAgICAgICAgZm9yIChYID0gcmVjdC5YICsgZnJhZ21lbnRXOyBYIDw9IHJlY3QuWCArIHJlY3QuV2lkdGggLSBmcmFnbWVudFcgKiAzOyBYICs9IGZyYWdtZW50VyAqIDIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIHRvcFxyXG4gICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKFgsIHJlY3QuWSwgZnJhZ21lbnRXICogMiwgZnJhZ21lbnRIKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKGZyYWdtZW50VywgMCwgZnJhZ21lbnRXICogMiwgZnJhZ21lbnRIKSwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgLy8gbWlkZGxlc1xyXG4gICAgICAgICAgICAgICAgZm9yIChZID0gcmVjdC5ZICsgZnJhZ21lbnRIOyBZIDw9IHJlY3QuWSArIHJlY3QuSGVpZ2h0IC0gZnJhZ21lbnRIKjM7IFkgKz0gZnJhZ21lbnRIICogMilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUoWCxZLGZyYWdtZW50VyoyLCBmcmFnbWVudEgqMiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUoZnJhZ21lbnRXLCBmcmFnbWVudEgsIGZyYWdtZW50VyoyLCBmcmFnbWVudEgqMiksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGJvdHRvbSBnYXAtZmlsbFxyXG4gICAgICAgICAgICAgICAgaWYgKFkgPCBib3R0b21FZGdlWSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgZmlsbFkgPSBib3R0b21FZGdlWSAtIFk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKFgsIFksIGZyYWdtZW50VyAqIDIsIGZpbGxZKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShmcmFnbWVudFcsIGZyYWdtZW50SCwgZnJhZ21lbnRXICogMiwgZmlsbFkpLCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBib3R0b21cclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgbmV3IFJlY3RhbmdsZShYLCBib3R0b21FZGdlWSwgZnJhZ21lbnRXICogMiwgZnJhZ21lbnRIKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKGZyYWdtZW50VywgZnJhZ21lbnRIKjMsIGZyYWdtZW50VyAqIDIsIGZyYWdtZW50SCksIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW50IGZpbmFsWCA9IFg7XHJcbiAgICAgICAgICAgIGludCBmaW5hbFkgPSBZO1xyXG4gICAgICAgICAgICBpbnQgZmlsbFcgPSByaWdodEVkZ2VYIC0gZmluYWxYO1xyXG4gICAgICAgICAgICBpbnQgZmlsbEggPSBib3R0b21FZGdlWSAtIGZpbmFsWTtcclxuXHJcbiAgICAgICAgICAgIC8vIGJvdHRvbS1yaWdodCBjb3JuZXIgZ2FwIGZpbGxcclxuICAgICAgICAgICAgaWYgKGZpbGxXID4gMCAmJiBmaWxsSCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgbmV3IFJlY3RhbmdsZShmaW5hbFgsIGZpbmFsWSwgZmlsbFcsIGZpbGxIKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKGZyYWdtZW50VywgZnJhZ21lbnRILCBmaWxsVywgZmlsbEgpLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGVkZ2UgZ2FwIGZpbGxcclxuICAgICAgICAgICAgaWYgKGZpbGxXID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gdG9wXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUoZmluYWxYLCByZWN0LlksIGZpbGxXLCBmcmFnbWVudEgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUoZnJhZ21lbnRXLCAwLCBmaWxsVywgZnJhZ21lbnRIKSwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgLy8gYm90dG9tXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUoZmluYWxYLCBib3R0b21FZGdlWSwgZmlsbFcsIGZyYWdtZW50SCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShmcmFnbWVudFcsIGZyYWdtZW50SCAqIDMsIGZpbGxXLCBmcmFnbWVudEgpLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGZpbGxIID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gbGVmdFxyXG4gICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKHJlY3QuWCwgZmluYWxZLCBmcmFnbWVudFcsIGZpbGxIKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKDAsIGZyYWdtZW50SCwgZnJhZ21lbnRXLCBmaWxsSCksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0IFxyXG4gICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKHJpZ2h0RWRnZVgsIGZpbmFsWSwgZnJhZ21lbnRXLCBmaWxsSCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShmcmFnbWVudFcqMywgZnJhZ21lbnRILCBmcmFnbWVudFcsIGZpbGxIKSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKFkgPSByZWN0LlkgKyBmcmFnbWVudEg7IFkgPD0gcmVjdC5ZICsgcmVjdC5IZWlnaHQgLSBmcmFnbWVudEggKiAzOyBZICs9IGZyYWdtZW50SCAqIDIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGxlZnRcclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgbmV3IFJlY3RhbmdsZShyZWN0LlgsIFksIGZyYWdtZW50VywgZnJhZ21lbnRIICogMiksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZSgwLCBmcmFnbWVudEgsIGZyYWdtZW50VywgZnJhZ21lbnRIICogMiksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUocmlnaHRFZGdlWCwgWSwgZnJhZ21lbnRXLCBmcmFnbWVudEggKiAyKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKGZyYWdtZW50VyozLCBmcmFnbWVudEgsIGZyYWdtZW50VywgZnJhZ21lbnRIICogMiksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0IGdhcC1maWxsXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUoZmluYWxYLCBZLCBmaWxsVywgZnJhZ21lbnRIKjIpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUoZnJhZ21lbnRXLCBmcmFnbWVudEgsIGZpbGxXLCBmcmFnbWVudEgqMiksIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKHJlY3QuWCwgcmVjdC5ZLCBmcmFnbWVudFcsIGZyYWdtZW50SCksXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKDAsIDAsIGZyYWdtZW50VywgZnJhZ21lbnRIKSwgY29sb3IpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUocmlnaHRFZGdlWCwgYm90dG9tRWRnZVksIGZyYWdtZW50VywgZnJhZ21lbnRIKSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUoZnJhZ21lbnRXKjMsIGZyYWdtZW50SCozLCBmcmFnbWVudFcsIGZyYWdtZW50SCksIGNvbG9yKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKHJlY3QuWCwgYm90dG9tRWRnZVksIGZyYWdtZW50VywgZnJhZ21lbnRIKSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUoMCwgZnJhZ21lbnRIKjMsIGZyYWdtZW50VywgZnJhZ21lbnRIKSwgY29sb3IpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUocmlnaHRFZGdlWCwgcmVjdC5ZLCBmcmFnbWVudFcsIGZyYWdtZW50SCksXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKGZyYWdtZW50VyozLCAwLCBmcmFnbWVudFcsIGZyYWdtZW50SCksIGNvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRHJhd01vZGVfVGlsZWRQcm9ncmVzc0JhciA6IElEcmF3TW9kZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFJlY3RhbmdsZSByZWN0LCBUZXh0dXJlMkQgdGV4dHVyZSwgQ29sb3IgY29sb3IsIFJvdGF0aW9uOTAgcm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbGVmdEVuZFdpZHRoID0gdGV4dHVyZS5XaWR0aCAvIDQ7XHJcbiAgICAgICAgICAgIGludCB0aWxlU2l6ZSA9IHRleHR1cmUuV2lkdGgvMjtcclxuICAgICAgICAgICAgaW50IHJpZ2h0RW5kV2lkdGggPSB0ZXh0dXJlLldpZHRoIC0gdGlsZVNpemUgLSBsZWZ0RW5kV2lkdGg7XHJcbiAgICAgICAgICAgIGludCB0aWxlZEFyZWFXaWR0aCA9IHJlY3QuV2lkdGggLSBsZWZ0RW5kV2lkdGggLSByaWdodEVuZFdpZHRoO1xyXG4gICAgICAgICAgICBpbnQgdGlsZUNvdW50ID0gKGludClNYXRoLlJvdW5kKChmbG9hdCl0aWxlZEFyZWFXaWR0aCAvIHRpbGVTaXplKTtcclxuICAgICAgICAgICAgaW50IHRpbGVTcGFjaW5nID0gKGludClNYXRoLkNlaWxpbmcoKGZsb2F0KXRpbGVkQXJlYVdpZHRoIC8gdGlsZUNvdW50KTtcclxuXHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgbmV3IFJlY3RhbmdsZShyZWN0LlgsIHJlY3QuWSwgbGVmdEVuZFdpZHRoLCByZWN0LkhlaWdodCksIG5ldyBSZWN0YW5nbGUoMCwwLCBsZWZ0RW5kV2lkdGgsIHRleHR1cmUuSGVpZ2h0KSwgY29sb3IpO1xyXG4gICAgICAgICAgICBmb3IoaW50IFggPSAwOyBYIDwgdGlsZWRBcmVhV2lkdGg7IFgrPXRpbGVTcGFjaW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUocmVjdC5YICsgbGVmdEVuZFdpZHRoICsgWCwgcmVjdC5ZLCB0aWxlU3BhY2luZywgcmVjdC5IZWlnaHQpLCBuZXcgUmVjdGFuZ2xlKGxlZnRFbmRXaWR0aCwgMCwgdGlsZVNpemUsIHRleHR1cmUuSGVpZ2h0KSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgbmV3IFJlY3RhbmdsZShyZWN0LlggKyByZWN0LldpZHRoLSByaWdodEVuZFdpZHRoLCByZWN0LlksIHJpZ2h0RW5kV2lkdGgsIHJlY3QuSGVpZ2h0KSwgbmV3IFJlY3RhbmdsZSh0ZXh0dXJlLldpZHRoLSByaWdodEVuZFdpZHRoLCAwLCByaWdodEVuZFdpZHRoLCB0ZXh0dXJlLkhlaWdodCksIGNvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBSaWNoSW1hZ2VMYXllclxyXG4gICAge1xyXG4gICAgICAgIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgUmVjdGFuZ2xlIHJlY3QsIENvbG9yIGNvbCwgUm90YXRpb245MCByb3RhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gUmljaEltYWdlRHJhd01vZGVcclxuICAgIHtcclxuICAgICAgICBERUZBVUxULFxyXG4gICAgICAgIFNUUkVUQ0hFRCxcclxuICAgICAgICBGSVhFRCxcclxuICAgICAgICBGSVRURUQsXHJcbiAgICAgICAgVElMRUQsXHJcbiAgICAgICAgVElMRUQ5R1JJRCxcclxuICAgICAgICBTVFJFVENIRUQ5R1JJRCxcclxuICAgICAgICBUSUxFRFBST0dSRVNTQkFSLFxyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUmljaEltYWdlTGF5ZXJfVGV4dHVyZSA6IFJpY2hJbWFnZUxheWVyXHJcbiAgICB7XHJcbiAgICAgICAgVGV4dHVyZTJEIHRleHR1cmU7XHJcbiAgICAgICAgQ29sb3IgY29sb3I7XHJcbiAgICAgICAgSURyYXdNb2RlIGRyYXdNb2RlO1xyXG4gICAgICAgIGludCBwYWRkaW5nO1xyXG4gICAgICAgIFZlY3RvcjIgb2Zmc2V0O1xyXG4gICAgICAgIFJvdGF0aW9uOTAgcm90YXRpb247XHJcbiAgICAgICAgYm9vbCBtb2RpZmllc1JlY3Q7XHJcbiAgICAgICAgc3RhdGljXHJcbiNpZiBXSU5ET1dTXHJcbiAgICAgICAgICAgIERpY3Rpb25hcnlcclxuI2Vsc2VcclxuICAgICAgICAgICAgX0RpY3Rpb25hcnlcclxuI2VuZGlmXHJcbiAgICAgICAgICAgIDxTdHJpbmcsIElEcmF3TW9kZT4gZHJhd01vZGVzQnlOYW1lID0gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ld1xyXG4jaWYgV0lORE9XU1xyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5XHJcbiNlbHNlXHJcbiAgICAgICAgICAgIF9EaWN0aW9uYXJ5XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICA8c3RyaW5nLCBJRHJhd01vZGU+KCksKF9vNCk9PntfbzQuQWRkKFwiZGVmYXVsdFwiLG5ldyBEcmF3TW9kZV9TdHJldGNoZWQoKSk7X280LkFkZChcInN0cmV0Y2hlZFwiLG5ldyBEcmF3TW9kZV9TdHJldGNoZWQoKSk7X280LkFkZChcImZpeGVkXCIsbmV3IERyYXdNb2RlX0ZpeGVkKCkpO19vNC5BZGQoXCJmaXR0ZWRcIixuZXcgRHJhd01vZGVfRml0dGVkKCkpO19vNC5BZGQoXCJ0aWxlZFwiLG5ldyBEcmF3TW9kZV9UaWxlZCgpKTtfbzQuQWRkKFwidGlsZWQ5Z3JpZFwiLG5ldyBEcmF3TW9kZV9UaWxlZDlHcmlkKCkpO19vNC5BZGQoXCJzdHJldGNoZWQ5Z3JpZFwiLG5ldyBEcmF3TW9kZV9TdHJldGNoOUdyaWQoKSk7X280LkFkZChcInRpbGVkcHJvZ3Jlc3NiYXJcIixuZXcgRHJhd01vZGVfVGlsZWRQcm9ncmVzc0JhcigpKTtyZXR1cm4gX280O30pO1xyXG4gICAgICAgIHN0YXRpY1xyXG4jaWYgV0lORE9XU1xyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5XHJcbiNlbHNlXHJcbiAgICAgICAgICAgIF9EaWN0aW9uYXJ5XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICA8UmljaEltYWdlRHJhd01vZGUsIElEcmF3TW9kZT4gZHJhd01vZGVzID0gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ld1xyXG4jaWYgV0lORE9XU1xyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5XHJcbiNlbHNlXHJcbiAgICAgICAgICAgIF9EaWN0aW9uYXJ5XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICA8UmljaEltYWdlRHJhd01vZGUsIElEcmF3TW9kZT4oKSwoX281KT0+e19vNS5BZGQoUmljaEltYWdlRHJhd01vZGUuREVGQVVMVCxuZXcgRHJhd01vZGVfU3RyZXRjaGVkKCkpO19vNS5BZGQoUmljaEltYWdlRHJhd01vZGUuU1RSRVRDSEVELG5ldyBEcmF3TW9kZV9TdHJldGNoZWQoKSk7X281LkFkZChSaWNoSW1hZ2VEcmF3TW9kZS5GSVhFRCxuZXcgRHJhd01vZGVfRml4ZWQoKSk7X281LkFkZChSaWNoSW1hZ2VEcmF3TW9kZS5GSVRURUQsbmV3IERyYXdNb2RlX0ZpdHRlZCgpKTtfbzUuQWRkKFJpY2hJbWFnZURyYXdNb2RlLlRJTEVELG5ldyBEcmF3TW9kZV9UaWxlZCgpKTtfbzUuQWRkKFJpY2hJbWFnZURyYXdNb2RlLlRJTEVEOUdSSUQsbmV3IERyYXdNb2RlX1RpbGVkOUdyaWQoKSk7X281LkFkZChSaWNoSW1hZ2VEcmF3TW9kZS5TVFJFVENIRUQ5R1JJRCxuZXcgRHJhd01vZGVfU3RyZXRjaDlHcmlkKCkpO19vNS5BZGQoUmljaEltYWdlRHJhd01vZGUuVElMRURQUk9HUkVTU0JBUixuZXcgRHJhd01vZGVfVGlsZWRQcm9ncmVzc0JhcigpKTtyZXR1cm4gX281O30pO1xyXG5cclxuICAgICAgICBwdWJsaWMgUmljaEltYWdlTGF5ZXJfVGV4dHVyZShUZXh0dXJlMkQgYVRleHR1cmUsIENvbG9yIGFDb2xvciwgUmljaEltYWdlRHJhd01vZGUgYURyYXdNb2RlLCBpbnQgYVBhZGRpbmcsIFJvdGF0aW9uOTAgYVJvdGF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dHVyZSA9IGFUZXh0dXJlO1xyXG4gICAgICAgICAgICBjb2xvciA9IGFDb2xvcjtcclxuICAgICAgICAgICAgZHJhd01vZGUgPSBkcmF3TW9kZXNbYURyYXdNb2RlXTtcclxuICAgICAgICAgICAgcGFkZGluZyA9IGFQYWRkaW5nO1xyXG4gICAgICAgICAgICByb3RhdGlvbiA9IGFSb3RhdGlvbjtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gVmVjdG9yMi5aZXJvO1xyXG5cclxuICAgICAgICAgICAgbW9kaWZpZXNSZWN0ID0gKHBhZGRpbmcgIT0gMCB8fCBvZmZzZXQuWCAhPSAwIHx8IG9mZnNldC5ZICE9IDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFJpY2hJbWFnZUxheWVyX1RleHR1cmUoVGV4dHVyZTJEIGFUZXh0dXJlLCBDb2xvciBhQ29sb3IsIFN0cmluZyBhRHJhd01vZGUsIGludCBhUGFkZGluZywgUm90YXRpb245MCBhUm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0dXJlID0gYVRleHR1cmU7XHJcbiAgICAgICAgICAgIGNvbG9yID0gYUNvbG9yO1xyXG4gICAgICAgICAgICBkcmF3TW9kZSA9IGRyYXdNb2Rlc0J5TmFtZVthRHJhd01vZGVdO1xyXG4gICAgICAgICAgICBwYWRkaW5nID0gYVBhZGRpbmc7XHJcbiAgICAgICAgICAgIHJvdGF0aW9uID0gYVJvdGF0aW9uO1xyXG4gICAgICAgICAgICBvZmZzZXQgPSBWZWN0b3IyLlplcm87XHJcblxyXG4gICAgICAgICAgICBtb2RpZmllc1JlY3QgPSAocGFkZGluZyAhPSAwIHx8IG9mZnNldC5YICE9IDAgfHwgb2Zmc2V0LlkgIT0gMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmljaEltYWdlTGF5ZXJfVGV4dHVyZShKU09OVGFibGUgdGVtcGxhdGUsIENvbnRlbnRNYW5hZ2VyIGNvbnRlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0dXJlID0gY29udGVudC5Mb2FkPFRleHR1cmUyRD4odGVtcGxhdGUuZ2V0U3RyaW5nKFwidGV4dHVyZVwiLCBcIndoaXRlXCIpKTtcclxuICAgICAgICAgICAgY29sb3IgPSB0ZW1wbGF0ZS5nZXRTdHJpbmcoXCJjb2xvclwiLCBcIkZGRkZGRlwiKS50b0NvbG9yKCk7XHJcbiAgICAgICAgICAgIGRyYXdNb2RlID0gZHJhd01vZGVzQnlOYW1lW3RlbXBsYXRlLmdldFN0cmluZyhcImRyYXdcIiwgXCJkZWZhdWx0XCIpXTtcclxuICAgICAgICAgICAgcGFkZGluZyA9IHRlbXBsYXRlLmdldEludChcInBhZGRpbmdcIiwgMCk7XHJcblxyXG4gICAgICAgICAgICBKU09OQXJyYXkgb2Zmc2V0QXJyYXkgPSB0ZW1wbGF0ZS5nZXRBcnJheShcIm9mZnNldFwiLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKG9mZnNldEFycmF5ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBuZXcgVmVjdG9yMigwLCAwKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0QXJyYXkudG9WZWN0b3IyKCk7XHJcblxyXG4gICAgICAgICAgICByb3RhdGlvbiA9IHRlbXBsYXRlLmdldFJvdGF0aW9uKFwicm90YXRpb25cIiwgUm90YXRpb245MC5Ob25lKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGlmaWVzUmVjdCA9IChwYWRkaW5nICE9IDAgfHwgb2Zmc2V0LlggIT0gMCB8fCBvZmZzZXQuWSAhPSAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFJlY3RhbmdsZSByZWN0LCBDb2xvciBpbkNvbCwgUm90YXRpb245MCBhUm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb2xvciBmaW5hbENvbG9yID0gaW5Db2wuTXVsdGlwbHkoY29sb3IpO1xyXG4gICAgICAgICAgICBpZiAobW9kaWZpZXNSZWN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkcmF3TW9kZS5EcmF3KHNwcml0ZUJhdGNoLCBuZXcgUmVjdGFuZ2xlKHJlY3QuWCArIChpbnQpb2Zmc2V0LlggLSBwYWRkaW5nLCByZWN0LlkgKyAoaW50KW9mZnNldC5ZIC0gcGFkZGluZywgcmVjdC5XaWR0aCArIHBhZGRpbmcgKiAyLCByZWN0LkhlaWdodCArIHBhZGRpbmcgKiAyKSwgdGV4dHVyZSwgZmluYWxDb2xvciwgcm90YXRpb24ucm90YXRlQnkoYVJvdGF0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkcmF3TW9kZS5EcmF3KHNwcml0ZUJhdGNoLCByZWN0LCB0ZXh0dXJlLCBmaW5hbENvbG9yLCByb3RhdGlvbi5yb3RhdGVCeShhUm90YXRpb24pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUmljaEltYWdlTGF5ZXJfSW1hZ2UgOiBSaWNoSW1hZ2VMYXllclxyXG4gICAge1xyXG4gICAgICAgIFJpY2hJbWFnZSBpbWFnZTtcclxuICAgICAgICBSb3RhdGlvbjkwIHJvdGF0aW9uO1xyXG5cclxuICAgICAgICBwdWJsaWMgUmljaEltYWdlTGF5ZXJfSW1hZ2UoUmljaEltYWdlIGFJbWFnZSwgUm90YXRpb245MCBhUm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbWFnZSA9IGFJbWFnZTtcclxuICAgICAgICAgICAgcm90YXRpb24gPSBhUm90YXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBSZWN0YW5nbGUgcmVjdCwgQ29sb3IgY29sLCBSb3RhdGlvbjkwIGFSb3RhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGltYWdlLkRyYXcoc3ByaXRlQmF0Y2gsIHJlY3QsIGNvbCwgcm90YXRpb24ucm90YXRlQnkoYVJvdGF0aW9uKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUmljaEltYWdlXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxSaWNoSW1hZ2VMYXllcj4gbGF5ZXJzO1xyXG4gICAgICAgIHB1YmxpYyBSaWNoSW1hZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGF5ZXJzID0gbmV3IExpc3Q8UmljaEltYWdlTGF5ZXI+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmljaEltYWdlKFRleHR1cmUyRCB0ZXh0dXJlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGF5ZXJzID0gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PFJpY2hJbWFnZUxheWVyPigpLChfbzYpPT57X282LkFkZChuZXcgUmljaEltYWdlTGF5ZXJfVGV4dHVyZSh0ZXh0dXJlLCBDb2xvci5XaGl0ZSwgXCJkZWZhdWx0XCIsIDAsIFJvdGF0aW9uOTAuTm9uZSkpO3JldHVybiBfbzY7fSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmljaEltYWdlKFJpY2hJbWFnZUxheWVyIGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGF5ZXJzID0gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PFJpY2hJbWFnZUxheWVyPigpLChfbzcpPT57X283LkFkZChsYXllcik7cmV0dXJuIF9vNzt9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSaWNoSW1hZ2UoSlNPTlRhYmxlIHRlbXBsYXRlLCBDb250ZW50TWFuYWdlciBjb250ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGF5ZXJzID0gbmV3IExpc3Q8UmljaEltYWdlTGF5ZXI+KCk7XHJcblxyXG4gICAgICAgICAgICBKU09OQXJyYXkgbGF5ZXJUZW1wbGF0ZSA9IHRlbXBsYXRlLmdldEFycmF5KFwibGF5ZXJzXCIsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAobGF5ZXJUZW1wbGF0ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBJZHggPSAwOyBJZHggPCBsYXllclRlbXBsYXRlLkxlbmd0aDsgKytJZHgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJzLkFkZChuZXcgUmljaEltYWdlTGF5ZXJfVGV4dHVyZShsYXllclRlbXBsYXRlLmdldEpTT04oSWR4KSwgY29udGVudCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJzLkFkZChuZXcgUmljaEltYWdlTGF5ZXJfVGV4dHVyZSh0ZW1wbGF0ZSwgY29udGVudCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoUmljaEltYWdlTGF5ZXIgbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYXllcnMuQWRkKGxheWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChSaWNoSW1hZ2UgaW1hZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYXllcnMuQWRkKG5ldyBSaWNoSW1hZ2VMYXllcl9JbWFnZShpbWFnZSwgUm90YXRpb245MC5Ob25lKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBSZWN0YW5nbGUgcmVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXcoc3ByaXRlQmF0Y2gsIHJlY3QsIENvbG9yLldoaXRlLCBSb3RhdGlvbjkwLk5vbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgUmVjdGFuZ2xlIHJlY3QsIENvbG9yIGNvbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXcoc3ByaXRlQmF0Y2gsIHJlY3QsIGNvbCwgUm90YXRpb245MC5Ob25lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFJlY3RhbmdsZSByZWN0LCBDb2xvciBjb2wsIFJvdGF0aW9uOTAgcm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoKFJpY2hJbWFnZUxheWVyIGN1ckxheWVyIGluIGxheWVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyTGF5ZXIuRHJhdyhzcHJpdGVCYXRjaCwgcmVjdCwgY29sLCByb3RhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRvb2x0aXBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZW51bSBBbGlnblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTEVGVCxcclxuICAgICAgICAgICAgUklHSFQsXHJcbiAgICAgICAgICAgIENFTlRFUixcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEcmF3VG9vbHRpcChTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgU3ByaXRlRm9udCBmb250LCBSaWNoSW1hZ2UgYmcsIExpc3Q8c3RyaW5nPiB0ZXh0LCBWZWN0b3IyIG9yaWdpbiwgQWxpZ24gYWxpZ24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBsaW5lSGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgZmxvYXQgbWF4V2lkdGggPSAwO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChzdHJpbmcgcyBpbiB0ZXh0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIGxpbmVTaXplID0gZm9udC5NZWFzdXJlU3RyaW5nKHMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVTaXplLlggPiBtYXhXaWR0aClcclxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aCA9IGxpbmVTaXplLlg7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZVNpemUuWSA+IGxpbmVIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodCA9IGxpbmVTaXplLlk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjIgcGFkZGluZyA9IG5ldyBWZWN0b3IyKDQsIDIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFsaWduID09IEFsaWduLlJJR0hUKVxyXG4gICAgICAgICAgICAgICAgb3JpZ2luLlggLT0gKG1heFdpZHRoICsgcGFkZGluZy5YICogMik7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFsaWduID09IEFsaWduLkNFTlRFUilcclxuICAgICAgICAgICAgICAgIG9yaWdpbi5YIC09IChpbnQpKChtYXhXaWR0aCArIHBhZGRpbmcuWCAqIDIpLzIpO1xyXG5cclxuICAgICAgICAgICAgYmcuRHJhdyhzcHJpdGVCYXRjaCwgbmV3IFJlY3RhbmdsZSgoaW50KW9yaWdpbi5YLCAoaW50KW9yaWdpbi5ZLCAoaW50KShtYXhXaWR0aCArIHBhZGRpbmcuWCAqIDIpLCAoaW50KSh0ZXh0LkNvdW50ICogbGluZUhlaWdodCArIHBhZGRpbmcuWSAqIDIpKSk7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgc3RyaW5nUG9zID0gb3JpZ2luICsgbmV3IFZlY3RvcjIocGFkZGluZy5YLCBwYWRkaW5nLlkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChzdHJpbmcgcyBpbiB0ZXh0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3U3RyaW5nKGZvbnQsIHMsIHN0cmluZ1BvcywgQ29sb3IuQmxhY2spO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nUG9zID0gbmV3IFZlY3RvcjIoc3RyaW5nUG9zLlgsIHN0cmluZ1Bvcy5ZICsgbGluZUhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgTGlzdDxzdHJpbmc+IFN0cmluZ1RvTGluZXMoc3RyaW5nIHRleHQsIFNwcml0ZUZvbnQgZm9udCwgZmxvYXQgbWF4V2lkdGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmdbXSB3b3JkcyA9IHRleHQuU3BsaXQobmV3IGNoYXJbXSB7ICcgJyB9LCBTdHJpbmdTcGxpdE9wdGlvbnMuUmVtb3ZlRW1wdHlFbnRyaWVzKTtcclxuICAgICAgICAgICAgTGlzdDxzdHJpbmc+IHJlc3VsdCA9IG5ldyBMaXN0PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgc3RyaW5nIGN1cnJlbnRMaW5lID0gXCJcIjtcclxuICAgICAgICAgICAgZmxvYXQgc3BhY2VXaWR0aCA9IGZvbnQuTWVhc3VyZVN0cmluZyhcIiBcIikuWDtcclxuICAgICAgICAgICAgZmxvYXQgY3VycmVudFdpZHRoID0gMDtcclxuICAgICAgICAgICAgZm9yZWFjaCAoc3RyaW5nIHdvcmQgaW4gd29yZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgc3RyaW5nU2l6ZSA9IGZvbnQuTWVhc3VyZVN0cmluZyh3b3JkKTtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50V2lkdGggPiAwICYmIGN1cnJlbnRXaWR0aCArIHN0cmluZ1NpemUuWCA+IG1heFdpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5BZGQoY3VycmVudExpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudExpbmUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50V2lkdGggPiAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMaW5lICs9IFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRXaWR0aCArPSBzcGFjZVdpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRXaWR0aCArPSBzdHJpbmdTaXplLlg7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TGluZSArPSB3b3JkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdC5BZGQoY3VycmVudExpbmUpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBMUkNFbmdpbmVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNwbGFzaFxyXG4gICAge1xyXG4gICAgICAgIHN0cmluZyB0ZXh0O1xyXG4gICAgICAgIFRleHRBbGlnbm1lbnQgYWxpZ25tZW50O1xyXG4gICAgICAgIFNwcml0ZUZvbnQgZm9udDtcclxuICAgICAgICBUZXh0dXJlMkQgaWNvbjtcclxuICAgICAgICBWZWN0b3IyIHBvcztcclxuICAgICAgICBWZWN0b3IyIHZlbG9jaXR5O1xyXG4gICAgICAgIENvbG9yIGNvbG9yO1xyXG4gICAgICAgIGludCBsaWZldGltZTtcclxuICAgICAgICBmbG9hdCBkcmFnO1xyXG4gICAgICAgIGZsb2F0IGdyYXZpdHk7XHJcbiAgICAgICAgcHVibGljIGJvb2wgYWxpdmUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcGxhc2goc3RyaW5nIHRleHQsIFRleHRBbGlnbm1lbnQgYWxpZ25tZW50LCBTcHJpdGVGb250IGZvbnQsIENvbG9yIGNvbG9yLCBWZWN0b3IyIHBvcywgVmVjdG9yMiB2ZWxvY2l0eSwgZmxvYXQgZHJhZywgZmxvYXQgZ3Jhdml0eSwgZmxvYXQgbGlmZVNlY29uZHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICB0aGlzLmFsaWdubWVudCA9IGFsaWdubWVudDtcclxuICAgICAgICAgICAgdGhpcy5mb250ID0gZm9udDtcclxuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgICAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xyXG4gICAgICAgICAgICB0aGlzLmRyYWcgPSBkcmFnO1xyXG4gICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSBncmF2aXR5O1xyXG4gICAgICAgICAgICB0aGlzLmxpZmV0aW1lID0gKGludCkobGlmZVNlY29uZHMgKiAzMCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpZmV0aW1lLS07XHJcbiAgICAgICAgICAgIGlmIChsaWZldGltZSA8PSAwKVxyXG4gICAgICAgICAgICAgICAgYWxpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eS5ZICs9IGdyYXZpdHk7XHJcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eSAqPSBkcmFnO1xyXG4gICAgICAgICAgICAgICAgcG9zICs9IHZlbG9jaXR5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRleHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXdTdHJpbmcoZm9udCwgdGV4dCwgcG9zLCBhbGlnbm1lbnQsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpY29uICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KGljb24sIG5ldyBSZWN0YW5nbGUoKGludClwb3MuWCwgKGludClwb3MuWSwgaWNvbi5XaWR0aCwgaWNvbi5IZWlnaHQpLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTcGxhc2hNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxTcGxhc2g+IHNwbGFzaGVzID0gbmV3IExpc3Q8U3BsYXNoPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoU3BsYXNoIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcGxhc2hlcy5BZGQocyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IG51bURlYWQgPSAwO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChTcGxhc2ggcyBpbiBzcGxhc2hlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHMuYWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgcy5VcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBudW1EZWFkKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGludCBHQVJCQUdFX0NPTExFQ1RfVEhSRVNIT0xEID0gMztcclxuICAgICAgICAgICAgaWYgKG51bURlYWQgPT0gc3BsYXNoZXMuQ291bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNwbGFzaGVzLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihudW1EZWFkID4gR0FSQkFHRV9DT0xMRUNUX1RIUkVTSE9MRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTGlzdDxTcGxhc2g+IG5ld0xpc3QgPSBuZXcgTGlzdDxTcGxhc2g+KCk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoKFNwbGFzaCBzIGluIHNwbGFzaGVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0xpc3QuQWRkKHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3BsYXNoZXMgPSBuZXdMaXN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAoU3BsYXNoIHMgaW4gc3BsYXNoZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChzLmFsaXZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHMuRHJhdyhzcHJpdGVCYXRjaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIExSQ0VuZ2luZTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgTFJDRW5naW5lXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTcHJpdGVPYmplY3RcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBwb3M7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgc2l6ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9zaXplOyB9XHJcbiAgICAgICAgICAgIHNldCB7IF9zaXplID0gdmFsdWU7IF9zY2FsZSA9IG5ldyBWZWN0b3IyKHZhbHVlLlggLyB0ZXh0dXJlUmVnaW9uLldpZHRoLCB2YWx1ZS5ZIC8gdGV4dHVyZVJlZ2lvbi5IZWlnaHQpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFZlY3RvcjIgX3NpemU7XHJcbiAgICAgICAgVmVjdG9yMiBfc2NhbGU7XHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRCB0ZXh0dXJlO1xyXG4gICAgICAgIHB1YmxpYyBSZWN0YW5nbGUgdGV4dHVyZVJlZ2lvbjtcclxuICAgICAgICBDb2xvciBjb2xvciA9IENvbG9yLldoaXRlO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBsYXllckRlcHRoO1xyXG4gICAgICAgIC8vcHVibGljIFNwcml0ZUVmZmVjdHMgc3ByaXRlRWZmZWN0cyA9IFNwcml0ZUVmZmVjdHMuTm9uZTtcclxuXHJcbiAgICAgICAgcHVibGljIFNwcml0ZU9iamVjdChUZXh0dXJlMkQgdGV4dHVyZSwgVmVjdG9yMiBwb3MpOiB0aGlzKHRleHR1cmUsIHBvcywgdGV4dHVyZS5TaXplKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFNwcml0ZU9iamVjdChUZXh0dXJlMkQgdGV4dHVyZSwgVmVjdG9yMiBwb3MsIFZlY3RvcjIgc2l6ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgICAgIHRoaXMucG9zID0gcG9zO1xyXG4gICAgICAgICAgICB0aGlzLnRleHR1cmVSZWdpb24gPSBuZXcgUmVjdGFuZ2xlKDAsIDAsIHRleHR1cmUuV2lkdGgsIHRleHR1cmUuSGVpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcHJpdGVPYmplY3QoVGV4dHVyZTJEIHRleHR1cmUsIFZlY3RvcjIgcG9zLCBWZWN0b3IyIHNpemUsIENvbG9yIGNvbG9yKTogdGhpcyh0ZXh0dXJlLCBwb3MsIHNpemUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3ByaXRlT2JqZWN0KFRleHR1cmUyRCB0ZXh0dXJlLCBWZWN0b3IyIHBvcywgVmVjdG9yMiBzaXplLCBDb2xvciBjb2xvciwgUmVjdGFuZ2xlIHRleHR1cmVSZWdpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgICAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlUmVnaW9uID0gdGV4dHVyZVJlZ2lvbjtcclxuICAgICAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKHBvcy5Ub1BvaW50KCksIF9zY2FsZS5Ub1BvaW50KCkpLCBjb2xvcik7LyosIHRleHR1cmVSZWdpb24sIGNvbG9yLCAwLCBWZWN0b3IyLlplcm8sICovLypfc2NhbGUqLy8qLCovIC8qc3ByaXRlRWZmZWN0cyovLyosIGxheWVyRGVwdGgqLy8qKTsqL1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RhbmdsZSBib3VuZHMgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RhbmdsZShwb3MsIHNpemUpOyB9IH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuQ29udGVudDtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBMUkNFbmdpbmVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFVJQnV0dG9uU3R5bGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVUlCdXR0b25BcHBlYXJhbmNlIG5vcm1hbDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVUlCdXR0b25BcHBlYXJhbmNlIGhvdmVyO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBVSUJ1dHRvbkFwcGVhcmFuY2UgcHJlc3NlZDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVUlCdXR0b25BcHBlYXJhbmNlIGRpc2FibGVkO1xyXG5cclxuICAgICAgICBwdWJsaWMgVUlCdXR0b25TdHlsZShVSUJ1dHRvbkFwcGVhcmFuY2Ugbm9ybWFsLCBVSUJ1dHRvbkFwcGVhcmFuY2UgaG92ZXIsIFVJQnV0dG9uQXBwZWFyYW5jZSBwcmVzc2VkLCBVSUJ1dHRvbkFwcGVhcmFuY2UgZGlzYWJsZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vcm1hbCA9IG5vcm1hbDtcclxuICAgICAgICAgICAgdGhpcy5ob3ZlciA9IGhvdmVyO1xyXG4gICAgICAgICAgICB0aGlzLnByZXNzZWQgPSBwcmVzc2VkO1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBVSUJ1dHRvbkFwcGVhcmFuY2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgU3ByaXRlRm9udCBmb250O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBDb2xvciB0ZXh0Q29sb3I7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFJpY2hJbWFnZSBpbWFnZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVmVjdG9yMiB0ZXh0T2Zmc2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBDb2xvciBmaWxsQ29sb3I7XHJcblxyXG4gICAgICAgIHB1YmxpYyBVSUJ1dHRvbkFwcGVhcmFuY2UoU3ByaXRlRm9udCBmb250LCBDb2xvciB0ZXh0Q29sb3IsIFJpY2hJbWFnZSBpbWFnZSwgQ29sb3IgZmlsbENvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5mb250ID0gZm9udDtcclxuICAgICAgICAgICAgdGhpcy50ZXh0Q29sb3IgPSB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5maWxsQ29sb3IgPSBmaWxsQ29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVUlCdXR0b25BcHBlYXJhbmNlKFNwcml0ZUZvbnQgZm9udCwgQ29sb3IgdGV4dENvbG9yLCBSaWNoSW1hZ2UgaW1hZ2UsIENvbG9yIGZpbGxDb2xvciwgVmVjdG9yMiB0ZXh0T2Zmc2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5mb250ID0gZm9udDtcclxuICAgICAgICAgICAgdGhpcy50ZXh0Q29sb3IgPSB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5maWxsQ29sb3IgPSBmaWxsQ29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dE9mZnNldCA9IHRleHRPZmZzZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBzdHJpbmcgbGFiZWwsIFRleHR1cmUyRCBpY29uLCBSZWN0YW5nbGUgZnJhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbWFnZS5EcmF3KHNwcml0ZUJhdGNoLCBmcmFtZSwgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBNYWdpY1VJLkRyYXc5R3JpZChzcHJpdGVCYXRjaCwgdGV4dHVyZSwgZnJhbWUsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBmcmFtZSwgZmlsbENvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpY29uICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChmb250ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWNvbiBhbmQgdGV4dFxyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjIgbGFiZWxTaXplID0gZm9udC5NZWFzdXJlU3RyaW5nKGxhYmVsKTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCBpY29uU3BhY2luZyA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yMiBpY29uT3JpZ2luID0gZnJhbWUuQ2VudGVyLlRvVmVjdG9yMigpICsgdGV4dE9mZnNldCAtIG5ldyBWZWN0b3IyKGxhYmVsU2l6ZS5YICsgaWNvbi5XaWR0aCArIGljb25TcGFjaW5nLCBpY29uLkhlaWdodCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjIgdGV4dE9yaWdpbiA9IG5ldyBWZWN0b3IyKChpbnQpKGljb25PcmlnaW4uWCArIGljb24uV2lkdGggKyBpY29uU3BhY2luZyksIChpbnQpKGZyYW1lLkNlbnRlci5ZICsgdGV4dE9mZnNldC5ZIC0gbGFiZWxTaXplLlkvMikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoaWNvbiwgaWNvbk9yaWdpbiwgQ29sb3IuV2hpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXdTdHJpbmcoZm9udCwgbGFiZWwsIHRleHRPcmlnaW4sIHRleHRDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWNvbiBvbmx5XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyhpY29uLCBmcmFtZS5DZW50ZXIuVG9WZWN0b3IyKCkgKyB0ZXh0T2Zmc2V0IC0gaWNvbi5TaXplKCkgLyAyLCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZm9udCAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyB0ZXh0IG9ubHlcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgbGFiZWxTaXplID0gZm9udC5NZWFzdXJlU3RyaW5nKGxhYmVsKTtcclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXdTdHJpbmcoZm9udCwgbGFiZWwsIG5ldyBWZWN0b3IyKChmbG9hdClNYXRoLkZsb29yKGZyYW1lLkNlbnRlci5YICsgdGV4dE9mZnNldC5YIC0gbGFiZWxTaXplLlggLyAyKSwgKGZsb2F0KU1hdGguRmxvb3IoZnJhbWUuQ2VudGVyLlkgKyB0ZXh0T2Zmc2V0LlkgLSBsYWJlbFNpemUuWSAvIDIpKSwgdGV4dENvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVUlCdXR0b24gOiBVSUVsZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIGxhYmVsO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlMkQgaWNvbjtcclxuICAgICAgICBwdWJsaWMgUmVjdGFuZ2xlIGZyYW1lO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBVSUJ1dHRvblN0eWxlIHN0eWxlcztcclxuICAgICAgICBwdWJsaWMgT25QcmVzc0RlbGVnYXRlIG9uUHJlc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldDsgcHJvdGVjdGVkIHNldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGJvb2wgbW91c2VJbnNpZGU7XHJcbiAgICAgICAgcHVibGljIGJvb2wgcHJlc3NlZEluc2lkZTtcclxuICAgICAgICBwdWJsaWMgYm9vbCBlbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBwdWJsaWMgYm9vbCB2aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcHVibGljIGRlbGVnYXRlIHZvaWQgT25QcmVzc0RlbGVnYXRlKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVUlCdXR0b25TdHlsZSBHZXREZWZhdWx0U3R5bGUoQ29udGVudE1hbmFnZXIgQ29udGVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNwcml0ZUZvbnQgZm9udCA9IENvbnRlbnQuTG9hZDxTcHJpdGVGb250PihcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICBSaWNoSW1hZ2Ugbm9ybWFsSW1hZ2UgPSBuZXcgUmljaEltYWdlKG5ldyBSaWNoSW1hZ2VMYXllcl9UZXh0dXJlKENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiYnV0dG9uM2RcIiksIENvbG9yLldoaXRlLCBcInN0cmV0Y2hlZDlncmlkXCIsIDAsIFJvdGF0aW9uOTAuTm9uZSkpO1xyXG4gICAgICAgICAgICBSaWNoSW1hZ2UgaG92ZXJJbWFnZSA9IG5ldyBSaWNoSW1hZ2UobmV3IFJpY2hJbWFnZUxheWVyX1RleHR1cmUoQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJidXR0b24zZF9ob3ZlclwiKSwgQ29sb3IuV2hpdGUsIFwic3RyZXRjaGVkOWdyaWRcIiwgMCwgUm90YXRpb245MC5Ob25lKSk7XHJcbiAgICAgICAgICAgIFJpY2hJbWFnZSBwcmVzc2VkSW1hZ2UgPSBuZXcgUmljaEltYWdlKG5ldyBSaWNoSW1hZ2VMYXllcl9UZXh0dXJlKENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiYnV0dG9uM2RfcHJlc3NlZFwiKSwgQ29sb3IuV2hpdGUsIFwic3RyZXRjaGVkOWdyaWRcIiwgMCwgUm90YXRpb245MC5Ob25lKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFVJQnV0dG9uU3R5bGUoXHJcbiAgICAgICAgICAgICAgICBuZXcgVUlCdXR0b25BcHBlYXJhbmNlKGZvbnQsIENvbG9yLkJsYWNrLCBub3JtYWxJbWFnZSwgQ29sb3IuV2hpdGUpLFxyXG4gICAgICAgICAgICAgICAgbmV3IFVJQnV0dG9uQXBwZWFyYW5jZShmb250LCBDb2xvci5CbGFjaywgaG92ZXJJbWFnZSwgQ29sb3IuV2hpdGUpLFxyXG4gICAgICAgICAgICAgICAgbmV3IFVJQnV0dG9uQXBwZWFyYW5jZShmb250LCBDb2xvci5CbGFjaywgcHJlc3NlZEltYWdlLCBDb2xvci5XaGl0ZSwgbmV3IFZlY3RvcjIoMCwxKSksXHJcbiAgICAgICAgICAgICAgICBuZXcgVUlCdXR0b25BcHBlYXJhbmNlKGZvbnQsIENvbG9yLkJsYWNrLCBub3JtYWxJbWFnZSwgQ29sb3IuR3JheSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVSUJ1dHRvbihzdHJpbmcgbGFiZWwsIFJlY3RhbmdsZSBmcmFtZSwgVUlCdXR0b25TdHlsZSBzdHlsZXMsIE9uUHJlc3NEZWxlZ2F0ZSBvblByZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzID0gc3R5bGVzO1xyXG4gICAgICAgICAgICB0aGlzLm9uUHJlc3MgPSBvblByZXNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVJQnV0dG9uKHN0cmluZyBsYWJlbCwgVGV4dHVyZTJEIGljb24sIFJlY3RhbmdsZSBmcmFtZSwgVUlCdXR0b25TdHlsZSBzdHlsZXMsIE9uUHJlc3NEZWxlZ2F0ZSBvblByZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgICAgICB0aGlzLmljb24gPSBpY29uO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzID0gc3R5bGVzO1xyXG4gICAgICAgICAgICB0aGlzLm9uUHJlc3MgPSBvblByZXNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIFVJTW91c2VSZXNwb25kZXIgR2V0TW91c2VIb3ZlcihWZWN0b3IyIGxvY2FsTW91c2VQb3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZnJhbWUuQ29udGFpbnMobG9jYWxNb3VzZVBvcykgPyB0aGlzIDogbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShJbnB1dFN0YXRlIGlucHV0U3RhdGUsIFZlY3RvcjIgb3JpZ2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFlbmFibGVkIHx8ICF2aXNpYmxlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtb3VzZUluc2lkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcHJlc3NlZEluc2lkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtb3VzZUluc2lkZSA9IGlucHV0U3RhdGUuaG92ZXJpbmdFbGVtZW50ID09IHRoaXM7Ly8gZnJhbWUuQ29udGFpbnMoaW5wdXRTdGF0ZS5Nb3VzZVBvcyAtIG9yaWdpbik7XHJcbiAgICAgICAgICAgIGlmIChtb3VzZUluc2lkZSAmJiBpbnB1dFN0YXRlLldhc01vdXNlTGVmdEp1c3RQcmVzc2VkKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByZXNzZWRJbnNpZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlucHV0U3RhdGUubW91c2VMZWZ0LmlzRG93bilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vdXNlSW5zaWRlICYmIHByZXNzZWRJbnNpZGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJlc3NlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHJlc3NlZEluc2lkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIFByZXNzZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYob25QcmVzcyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgb25QcmVzcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgVmVjdG9yMiBvcmlnaW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXZpc2libGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBVSUJ1dHRvbkFwcGVhcmFuY2UgY3VycmVudFN0eWxlO1xyXG4gICAgICAgICAgICBpZiAoIWVuYWJsZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdHlsZSA9IHN0eWxlcy5kaXNhYmxlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChtb3VzZUluc2lkZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXNzZWRJbnNpZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0eWxlID0gc3R5bGVzLnByZXNzZWQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0eWxlID0gc3R5bGVzLmhvdmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFN0eWxlID0gc3R5bGVzLm5vcm1hbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3VycmVudFN0eWxlLkRyYXcoc3ByaXRlQmF0Y2gsIGxhYmVsLCBpY29uLCBuZXcgUmVjdGFuZ2xlKGZyYW1lLlggKyAoaW50KW9yaWdpbi5YLCBmcmFtZS5ZICsgKGludClvcmlnaW4uWSwgZnJhbWUuV2lkdGgsIGZyYW1lLkhlaWdodCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0RW5hYmxlZChib29sIGVuYWJsZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBlbmFibGVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0VmlzaWJsZShib29sIHZpc2libGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVUlSYWRpb0J1dHRvbkdyb3VwPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFVJUmFkaW9CdXR0b248VD4gc2VsZWN0ZWRCdXR0b247XHJcbiAgICAgICAgcHVibGljIFQgc2VsZWN0ZWRWYWx1ZSB7IGdldCB7IHJldHVybiBzZWxlY3RlZEJ1dHRvbi52YWx1ZTsgfSB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFVJUmFkaW9CdXR0b248VD46IFVJQnV0dG9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFVJUmFkaW9CdXR0b25Hcm91cDxUPiBncm91cDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVCB2YWx1ZTtcclxuICAgICAgICBVSUJ1dHRvbkFwcGVhcmFuY2UgYWN0aXZlQXBwZWFyYW5jZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgT25SYWRpb1ByZXNzRGVsZWdhdGUgb25SYWRpb1ByZXNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgZGVsZWdhdGUgdm9pZCBPblJhZGlvUHJlc3NEZWxlZ2F0ZShUIHZhbHVlKTtcclxuXHJcbiAgICAgICAgcHVibGljIFVJUmFkaW9CdXR0b24oc3RyaW5nIGxhYmVsLCBUIHZhbHVlLCBVSVJhZGlvQnV0dG9uR3JvdXA8VD4gZ3JvdXAsIFJlY3RhbmdsZSBmcmFtZSwgVUlCdXR0b25TdHlsZSBzdHlsZXMsIFVJQnV0dG9uQXBwZWFyYW5jZSBhY3RpdmVBcHBlYXJhbmNlLCBPblByZXNzRGVsZWdhdGUgb25QcmVzcykgOlxyXG4gICAgICAgICAgICBiYXNlKGxhYmVsLCBmcmFtZSwgc3R5bGVzLCBvblByZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cCA9IGdyb3VwO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQXBwZWFyYW5jZSA9IGFjdGl2ZUFwcGVhcmFuY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVUlSYWRpb0J1dHRvbihzdHJpbmcgbGFiZWwsIFQgdmFsdWUsIFVJUmFkaW9CdXR0b25Hcm91cDxUPiBncm91cCwgUmVjdGFuZ2xlIGZyYW1lLCBVSUJ1dHRvblN0eWxlIHN0eWxlcywgVUlCdXR0b25BcHBlYXJhbmNlIGFjdGl2ZUFwcGVhcmFuY2UsIE9uUmFkaW9QcmVzc0RlbGVnYXRlIG9uUmFkaW9QcmVzcykgOlxyXG4gICAgICAgICAgICBiYXNlKGxhYmVsLCBmcmFtZSwgc3R5bGVzLCBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cCA9IGdyb3VwO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQXBwZWFyYW5jZSA9IGFjdGl2ZUFwcGVhcmFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMub25SYWRpb1ByZXNzID0gb25SYWRpb1ByZXNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgUHJlc3NlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBncm91cC5zZWxlY3RlZEJ1dHRvbiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZihvblJhZGlvUHJlc3MgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG9uUmFkaW9QcmVzcyh2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBiYXNlLlByZXNzZWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFZlY3RvcjIgb3JpZ2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGdyb3VwLnNlbGVjdGVkQnV0dG9uID09IHRoaXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUFwcGVhcmFuY2UuRHJhdyhzcHJpdGVCYXRjaCwgbGFiZWwsIGljb24sIG5ldyBSZWN0YW5nbGUoZnJhbWUuWCArIChpbnQpb3JpZ2luLlgsIGZyYW1lLlkgKyAoaW50KW9yaWdpbi5ZLCBmcmFtZS5XaWR0aCwgZnJhbWUuSGVpZ2h0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXNlLkRyYXcoc3ByaXRlQmF0Y2gsIG9yaWdpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIFN5c3RlbS5Db2xsZWN0aW9uc1xyXG57XHJcbiAgICBpbnRlcm5hbCBzdGF0aWMgY2xhc3MgX0hhc2hIZWxwZXJzXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBJbnQzMiBIYXNoUHJpbWUgPSAxMDE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaW50W10gcHJpbWVzID0ge1xyXG4gICAgICAgICAgICAzLCA3LCAxMSwgMTcsIDIzLCAyOSwgMzcsIDQ3LCA1OSwgNzEsIDg5LCAxMDcsIDEzMSwgMTYzLCAxOTcsIDIzOSwgMjkzLCAzNTMsIDQzMSwgNTIxLCA2MzEsIDc2MSwgOTE5LFxyXG4gICAgICAgICAgICAxMTAzLCAxMzI3LCAxNTk3LCAxOTMxLCAyMzMzLCAyODAxLCAzMzcxLCA0MDQ5LCA0ODYxLCA1ODM5LCA3MDEzLCA4NDE5LCAxMDEwMywgMTIxNDMsIDE0NTkxLFxyXG4gICAgICAgICAgICAxNzUxOSwgMjEwMjMsIDI1MjI5LCAzMDI5MywgMzYzNTMsIDQzNjI3LCA1MjM2MSwgNjI4NTEsIDc1NDMxLCA5MDUyMywgMTA4NjMxLCAxMzAzNjMsIDE1NjQzNyxcclxuICAgICAgICAgICAgMTg3NzUxLCAyMjUzMDcsIDI3MDM3MSwgMzI0NDQ5LCAzODkzNTcsIDQ2NzIzNywgNTYwNjg5LCA2NzI4MjcsIDgwNzQwMywgOTY4ODk3LCAxMTYyNjg3LCAxMzk1MjYzLFxyXG4gICAgICAgICAgICAxNjc0MzE5LCAyMDA5MTkxLCAyNDExMDMzLCAyODkzMjQ5LCAzNDcxODk5LCA0MTY2Mjg3LCA0OTk5NTU5LCA1OTk5NDcxLCA3MTk5MzY5IH07XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJc1ByaW1lKGludCBjYW5kaWRhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoKGNhbmRpZGF0ZSAmIDEpICE9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBsaW1pdCA9IChpbnQpTWF0aC5TcXJ0KGNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBkaXZpc29yID0gMzsgZGl2aXNvciA8PSBsaW1pdDsgZGl2aXNvciArPSAyKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoY2FuZGlkYXRlICUgZGl2aXNvcikgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChjYW5kaWRhdGUgPT0gMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBHZXRQcmltZShpbnQgbWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1pbiA8IDApXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oXCJIYXNodGFibGUncyBjYXBhY2l0eSBvdmVyZmxvd2VkIGFuZCB3ZW50IG5lZ2F0aXZlLiBDaGVjayBsb2FkIGZhY3RvciwgY2FwYWNpdHkgYW5kIHRoZSBjdXJyZW50IHNpemUgb2YgdGhlIHRhYmxlLlwiKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcmltZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBwcmltZSA9IHByaW1lc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChwcmltZSA+PSBtaW4pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAobWluIHwgMSk7IGkgPCBJbnQzMi5NYXhWYWx1ZTsgaSArPSAyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSXNQcmltZShpKSAmJiAoKGkgLSAxKSAlIEhhc2hQcmltZSAhPSAwKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWluO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgR2V0TWluUHJpbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByaW1lc1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEV4cGFuZFByaW1lKGludCBvbGRTaXplKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IG5ld1NpemUgPSAyICogb2xkU2l6ZTtcclxuICAgICAgICAgICAgaWYgKCh1aW50KW5ld1NpemUgPiBNYXhQcmltZUFycmF5TGVuZ3RoICYmIE1heFByaW1lQXJyYXlMZW5ndGggPiBvbGRTaXplKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF4UHJpbWVBcnJheUxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gR2V0UHJpbWUobmV3U2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IE1heFByaW1lQXJyYXlMZW5ndGggPSAweDdGRUZGRkZEO1xyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBSVBsYXllciA6IFBsYXllclxyXG4gICAge1xyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSBDUzE5OTggLy8gQXN5bmMgbWV0aG9kIGxhY2tzICdhd2FpdCcgb3BlcmF0b3JzIGFuZCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XHJcbiAgICAgICAgcHVibGljIGFzeW5jIG92ZXJyaWRlIFRhc2s8VGV4dHVyZTJEPiBUYXJnZXRDYXJkKClcclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgQ1MxOTk4IC8vIEFzeW5jIG1ldGhvZCBsYWNrcyAnYXdhaXQnIG9wZXJhdG9ycyBhbmQgd2lsbCBydW4gc3luY2hyb25vdXNseVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuY2FyZEltYWdlc1szXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIEFJUGxheWVyKEhhbmRHYW1lIEdhbWUpIDogYmFzZShHYW1lKSB7IH1cclxuXHJcbiNwcmFnbWEgd2FybmluZyBkaXNhYmxlIENTMTk5OCAvLyBBc3luYyBtZXRob2QgbGFja3MgJ2F3YWl0JyBvcGVyYXRvcnMgYW5kIHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBMb29rQXRDYXJkcyhSZWFsQ2FyZFBvb2wgY2FyZFBvb2wpIHsgfVxyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSBDUzE5OTggLy8gQXN5bmMgbWV0aG9kIGxhY2tzICdhd2FpdCcgb3BlcmF0b3JzIGFuZCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyB2b2lkIE9uVHVyblN0YXJ0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuT25UdXJuU3RhcnQoKTtcclxuICAgICAgICAgICAgYXdhaXQgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5PcmRlckJ5PGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQsaW50PihIYW5kLmNhcmRzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQsIGludD4pKHYgPT4gKChDYXJkcy5Mb3ZlTGV0dGVyQ2FyZCl2KS5WYWx1ZSkpLkZpcnN0KCkuUGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzazxQbGF5ZXI+IFRhcmdldFBsYXllcigpIHtyZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5PcmRlckJ5PGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllcixib29sPiggICAgICAgICAgICBHYW1lLnBsYXllcnMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuUGxheWVyLCBib29sPikodiA9PiB2LklzSGFuZG1haWRlZCkpLlRoZW5CeTxib29sPigoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkhhbmRHYW1lcy5QbGF5ZXIsIGJvb2w+KSh2ID0+IHYgaXMgQUlQbGF5ZXIpKS5GaXJzdCgpO31cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzLkNhcmRzXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBMb3ZlTGV0dGVyQ2FyZCA6IENhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgaW50IFZhbHVlIHsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrIFBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9ICgoSGFuZClAaW4pLnBsYXllcjtcclxuICAgICAgICAgICAgYXdhaXQgYmFzZS5QbGF5KCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHBsYXllci5FbmRUdXJuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFJlYWxDYXJkUG9vbCA6IENhcmRQb29sXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8Q2FyZD4gY2FyZHMgPSBuZXcgTGlzdDxDYXJkPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgUmVhbENhcmRQb29sKEhhbmRHYW1lIGdhbWUpIDogYmFzZShnYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEFkZChDYXJkIGNhcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXJkLkBpbiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNhcmRzLkFkZChjYXJkKTtcclxuICAgICAgICAgICAgYmFzZS5BZGQoY2FyZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFJlbW92ZShDYXJkIGNhcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXJkLkBpbiA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICghY2FyZHMuUmVtb3ZlKGNhcmQpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiezB9IGlzIG5vdCBpbiBjb2xsZWN0aW9uLlwiLGNhcmQpKTtcclxuICAgICAgICAgICAgYmFzZS5SZW1vdmUoY2FyZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIENvbnRhaW5zKENhcmQgY2FyZCkge3JldHVybiBjYXJkcy5Db250YWlucyhjYXJkKTt9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTG9jYWxQbGF5ZXIgOiBQbGF5ZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBPblR1cm5TdGFydCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk9uVHVyblN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFtGbGFnc11cclxuICAgICAgICBwcml2YXRlIGVudW0gQWxlcnRTY3JlZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENob29zZUFQbGF5ZXIgPSAxLFxyXG4gICAgICAgICAgICBOYW1lQUNhcmQgPSAyLFxyXG4gICAgICAgICAgICBWaWV3Q2FyZHMgPSA2XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFsZXJ0U2NyZWVuPyBDdXJyZW50QWxlcnRTY3JlZW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBMb2NhbFBsYXllcihIYW5kR2FtZSBHYW1lKSA6IGJhc2UoR2FtZSkgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrPFBsYXllcj4gVGFyZ2V0UGxheWVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEN1cnJlbnRBbGVydFNjcmVlbiA9IEFsZXJ0U2NyZWVuLkNob29zZUFQbGF5ZXI7XHJcbiAgICAgICAgICAgIFBsYXllciByID0gYXdhaXQgKHRhcmdldFBsYXllciA9IG5ldyBUYXNrQ29tcGxldGlvblNvdXJjZTxQbGF5ZXI+KCkpLlRhc2s7XHJcbiAgICAgICAgICAgIHRhcmdldFBsYXllciA9IG51bGw7XHJcbiAgICAgICAgICAgIEN1cnJlbnRBbGVydFNjcmVlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGFza0NvbXBsZXRpb25Tb3VyY2U8UGxheWVyPiB0YXJnZXRQbGF5ZXI7XHJcbiAgICAgICAgVGFza0NvbXBsZXRpb25Tb3VyY2U8VGV4dHVyZTJEPiB0YXJnZXRDYXJkO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSBEaWN0aW9uYXJ5PEFsZXJ0U2NyZWVuLCBzdHJpbmc+IG1lc3NhZ2VzID0gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PEFsZXJ0U2NyZWVuLCBzdHJpbmc+KCksKF9vMSk9PntfbzEuQWRkKEFsZXJ0U2NyZWVuLk5hbWVBQ2FyZCxcIkNob29zZSBhIGNhcmRcIik7X28xLkFkZChBbGVydFNjcmVlbi5DaG9vc2VBUGxheWVyLFwiQ2hvb3NlIGEgcGxheWVyXCIpO19vMS5BZGQoQWxlcnRTY3JlZW4uVmlld0NhcmRzLFwiWW91IGhhdmUgMiBzZWNvbmRzIHRvIGxvb2sgYXQgdGhlc2UgY2FyZHMuXCIpO3JldHVybiBfbzE7fSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBvdmVycmlkZSBUYXNrPFRleHR1cmUyRD4gVGFyZ2V0Q2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDdXJyZW50QWxlcnRTY3JlZW4gPSBBbGVydFNjcmVlbi5OYW1lQUNhcmQ7XHJcbiAgICAgICAgICAgIGNhcmRzVG9EcmF3ID0gR2FtZS5jYXJkSW1hZ2VzO1xyXG4gICAgICAgICAgICB2YXIgciA9IGF3YWl0ICh0YXJnZXRDYXJkID0gbmV3IFRhc2tDb21wbGV0aW9uU291cmNlPFRleHR1cmUyRD4oKSkuVGFzaztcclxuICAgICAgICAgICAgdGFyZ2V0Q2FyZCA9IG51bGw7XHJcbiAgICAgICAgICAgIEN1cnJlbnRBbGVydFNjcmVlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIGNhcmRzVG9EcmF3ID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgdm9pZCBVcGRhdGUgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lLnBsYXllcnNbR2FtZS50dXJuSWR4XSAhPSB0aGlzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoQ3VycmVudEFsZXJ0U2NyZWVuID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb3VzZVN0YXRlID0gTW91c2UuR2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjYXJkIGluIEhhbmQuY2FyZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEhhbmQuR2V0RHJhd2luZ1Bvc2l0aW9uKGNhcmQpLkRyYXdQb3NpdGlvbi5Db250YWlucyhtb3VzZVN0YXRlLlBvc2l0aW9uKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb3VzZVN0YXRlLkxlZnRCdXR0b24gIT0gQnV0dG9uU3RhdGUuUHJlc3NlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQuSGlnaGxpZ2h0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBjYXJkLlBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkLkhpZ2hsaWdodGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBNb3VzZS5HZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChDdXJyZW50QWxlcnRTY3JlZW4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBbGVydFNjcmVlbi5DaG9vc2VBUGxheWVyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuTGVmdEJ1dHRvbiA9PSBCdXR0b25TdGF0ZS5QcmVzc2VkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHBsYXllciBpbiBHYW1lLnBsYXllcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllci5Jc0hhbmRtYWlkZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHZXRMb2NhdGlvbk9mKHBsYXllcikuQ29udGFpbnMoc3RhdGUuWCwgc3RhdGUuWSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyICE9IG51bGwgJiYgIXRhcmdldFBsYXllci5UYXNrLklzQ29tcGxldGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGxheWVyLlNldFJlc3VsdChwbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQWxlcnRTY3JlZW4uTmFtZUFDYXJkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBuID0gMDsgbiA8IEdhbWUuY2FyZEltYWdlcy5Db3VudDsgbisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9nZXRDYXJkUG9zaXRpb24obikuQ29udGFpbnMoc3RhdGUuWCwgc3RhdGUuWSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLkxlZnRCdXR0b24gPT0gQnV0dG9uU3RhdGUuUHJlc3NlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHYW1lLmNhcmRJbWFnZXNbbl0gIT0gbnVsbCAmJiAhdGFyZ2V0Q2FyZC5UYXNrLklzQ29tcGxldGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2FyZC5TZXRSZXN1bHQoR2FtZS5jYXJkSW1hZ2VzW25dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IERpY3Rpb25hcnk8QWxlcnRTY3JlZW4sIEFjdGlvbjxMb2NhbFBsYXllcj4+IGhpZ2hsaWdodHMgPSBCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8QWxlcnRTY3JlZW4sIEFjdGlvbjxMb2NhbFBsYXllcj4+KCksKF9vMik9PntfbzIuQWRkKEFsZXJ0U2NyZWVuLkNob29zZUFQbGF5ZXIsQHRoaXMgPT4gQHRoaXMuRHJhd1BsYXllcnMoKSk7X28yLkFkZChBbGVydFNjcmVlbi5OYW1lQUNhcmQsQHRoaXMgPT4gQHRoaXMuRHJhd0NhcmRzKCkpO3JldHVybiBfbzI7fSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLmNhcmRiYWNrLCBuZXcgUmVjdGFuZ2xlKEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuV2lkdGggLSAxNTAgLSBEZWNrLmNhcmRXaWR0aCAtIDIwLCBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAtIERlY2suY2FyZEhlaWdodCwgRGVjay5jYXJkV2lkdGgsIERlY2suY2FyZEhlaWdodCksIENvbG9yLldoZWF0KTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNhcmQgaW4gR2FtZS5kaXNjYXJkUGlsZS5jYXJkcylcclxuICAgICAgICAgICAgICAgIGNhcmQuRHJhdygpO1xyXG4gICAgICAgICAgICBEcmF3SGFuZHMoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHJ1biBpbiBoaWdobGlnaHRzKVxyXG4gICAgICAgICAgICAgICAgaWYgKChydW4uS2V5IHwgQ3VycmVudEFsZXJ0U2NyZWVuKSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bi5WYWx1ZSh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChDdXJyZW50QWxlcnRTY3JlZW4gIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nIGRpc3BsYXllZFRleHQgPSBtZXNzYWdlc1soQWxlcnRTY3JlZW4pQ3VycmVudEFsZXJ0U2NyZWVuXTtcclxuICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLnJlY3RhbmdsZSwgR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5Cb3VuZHMsIG5ldyBDb2xvcihDb2xvci5CbGFjaywgLjlmKSk7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIHRleHRNZXRyaWNzID0gR2FtZS5jaG9pY2VGb250Lk1lYXN1cmVTdHJpbmcoZGlzcGxheWVkVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIHRleHRMb2MgPSAtIHRleHRNZXRyaWNzIC8gMjtcclxuICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLnJlY3RhbmdsZSwgbmV3IFJlY3RhbmdsZSh0ZXh0TG9jLlRvUG9pbnQoKSArIChHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkJvdW5kcy5TaXplLlRvVmVjdG9yMigpIC8gMikuVG9Qb2ludCgpLCB0ZXh0TWV0cmljcy5Ub1BvaW50KCkpLCBDb2xvci5CbHVlVmlvbGV0KTtcclxuICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhd1N0cmluZyhHYW1lLmNob2ljZUZvbnQsIGRpc3BsYXllZFRleHQsIHRleHRMb2MgKyBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkJvdW5kcy5TaXplLlRvVmVjdG9yMigpIC8gMiwgQ29sb3IuQmxhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBydW4gaW4gaGlnaGxpZ2h0cylcclxuICAgICAgICAgICAgICAgIGlmICgocnVuLktleSB8IEN1cnJlbnRBbGVydFNjcmVlbikgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICBydW4uVmFsdWUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIERyYXdIYW5kcyAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgbiA9IDA7IG4gPCBHYW1lLnBsYXllcnMuQ291bnQ7IG4rKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllciA9IEdhbWUucGxheWVyc1tuXTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjYXJkIGluIHBsYXllci5IYW5kLmNhcmRzKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhcmQuRHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIERyYXdQbGF5ZXJzICgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBuID0gMDsgbiA8IEdhbWUucGxheWVycy5Db3VudDsgbisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gR2FtZS5wbGF5ZXJzW25dO1xyXG4gICAgICAgICAgICAgICAgdWludCBjb2xvciA9ICh1aW50KSgweGZmIDw8IChuIDw8IDMpKSArIDB4ZmYwMDAwMDA7XHJcbiAgICAgICAgICAgICAgICBSZWN0YW5nbGUgciA9IEdldExvY2F0aW9uT2YocGxheWVyKTtcclxuICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLnJlY3RhbmdsZSwgciwgbmV3IENvbG9yKGNvbG9yKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmxvc3QpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEdhbWUucmVjdGFuZ2xlLCByLCBuZXcgQ29sb3IoQ29sb3IuQmxhY2ssIC41ZikpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLnJlY3RhbmdsZSwgbmV3IFJlY3RhbmdsZShyLkxvY2F0aW9uICsgbmV3IFBvaW50KDM1KSwgbmV3IFBvaW50KDMwKSksIENvbG9yLlJlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwbGF5ZXIuSXNIYW5kbWFpZGVkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLnJlY3RhbmdsZSwgbmV3IFJlY3RhbmdsZShyLkxvY2F0aW9uICsgbmV3IFBvaW50KDM1KSwgbmV3IFBvaW50KDMwKSksIENvbG9yLkJsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoR2FtZS5wbGF5ZXJzW0dhbWUudHVybklkeF0gIT0gcGxheWVyKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLnJlY3RhbmdsZSwgciwgbmV3IENvbG9yKENvbG9yLldoaXRlLCAuMjVmKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFJlY3RhbmdsZSBfZ2V0Q2FyZFBvc2l0aW9uKGludCBpbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGludCBjYXJkV2lkdGggPSBIYW5kLmNhcmRXaWR0aCwgY2FyZEhlaWdodCA9IEhhbmQuY2FyZEhlaWdodDtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5XaWR0aCAvIDIgLSBjYXJkc1RvRHJhdy5Db3VudCAqIGNhcmRXaWR0aCAvIDIgKyBpbmRleCAqIGNhcmRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAtIGNhcmRIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTGlzdDxUZXh0dXJlMkQ+IGNhcmRzVG9EcmF3O1xyXG5cclxuICAgICAgICB2b2lkIERyYXdDYXJkcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQ3VycmVudEFsZXJ0U2NyZWVuID09IEFsZXJ0U2NyZWVuLk5hbWVBQ2FyZCB8fCBDdXJyZW50QWxlcnRTY3JlZW4gPT0gQWxlcnRTY3JlZW4uVmlld0NhcmRzKVxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgbiA9IDA7IG4gPCBjYXJkc1RvRHJhdy5Db3VudDsgbisrKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhjYXJkc1RvRHJhd1tuXSwgX2dldENhcmRQb3NpdGlvbihuKSwgQ29sb3IuV2hpdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUmVjdGFuZ2xlIEdldExvY2F0aW9uT2YgKFBsYXllciBwbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgaW5kZXggPSAoKEdhbWUucGxheWVycy5JbmRleE9mKHBsYXllcikgKiA0IC8gR2FtZS5wbGF5ZXJzLkNvdW50ICsgKDIgLyBHYW1lLnBsYXllcnMuQ291bnQpKSArIDIpICUgNDtcclxuICAgICAgICAgICAgdmFyIHNpemUgPSBuZXcgUG9pbnQoMTAwLCAxMDApO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBuZXcgUG9pbnQoXHJcbiAgICAgICAgICAgICAgICAoR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5XaWR0aCAgLSBzaXplLlgpICogKGluZGV4ICUgMiksXHJcbiAgICAgICAgICAgICAgICAoR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLSBzaXplLlkpICogKGluZGV4IC8gMikpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShwb3NpdGlvbiwgc2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBMb29rQXRDYXJkcyhSZWFsQ2FyZFBvb2wgY2FyZFBvb2wpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXJkc1RvRHJhdyA9IGNhcmRQb29sLmNhcmRzLkNvbnZlcnRBbGw8Z2xvYmFsOjpNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcy5UZXh0dXJlMkQ+KChnbG9iYWw6OlN5c3RlbS5Db252ZXJ0ZXI8Z2xvYmFsOjpIYW5kR2FtZXMuQ2FyZCwgZ2xvYmFsOjpNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcy5UZXh0dXJlMkQ+KSh2ID0+IHYuaW1hZ2UpKTtcclxuICAgICAgICAgICAgQ3VycmVudEFsZXJ0U2NyZWVuID0gQWxlcnRTY3JlZW4uVmlld0NhcmRzO1xyXG4gICAgICAgICAgICBhd2FpdCBUYXNrLkRlbGF5KDIwMDApO1xyXG4gICAgICAgICAgICBDdXJyZW50QWxlcnRTY3JlZW4gPSBudWxsO1xyXG4gICAgICAgICAgICBjYXJkc1RvRHJhdyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIEEgZ2FtZSBvZiBsb3ZlIGxldHRlci5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgTG92ZUxldHRlckdhbWUgOiBIYW5kR2FtZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgQ29udGVudEZvbGRlck5hbWUge2dldHtyZXR1cm4gXCJMb3ZlIExldHRlclwiO319XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlXHJcbiNpZiBXSU5ET1dTXHJcbiAgICAgICAgICAgIERpY3Rpb25hcnlcclxuI2Vsc2VcclxuICAgICAgICAgICAgX0RpY3Rpb25hcnlcclxuI2VuZGlmXHJcbiAgICAgICAgICAgIDxzdHJpbmcsIGludD4gY2FyZHMge2dldHtyZXR1cm4gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ld1xyXG4jaWYgV0lORE9XU1xyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5XHJcbiNlbHNlXHJcbiAgICAgICAgICAgIF9EaWN0aW9uYXJ5XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICA8c3RyaW5nLCBpbnQ+KCksKF9vMyk9PntfbzMuQWRkKFwiR3VhcmRcIiw1KTtfbzMuQWRkKFwiUHJpZXN0XCIsMik7X28zLkFkZChcIkJhcm9uXCIsMik7X28zLkFkZChcIkhhbmRtYWlkXCIsMik7X28zLkFkZChcIlByaW5jZVwiLDIpO19vMy5BZGQoXCJLaW5nXCIsMSk7X28zLkFkZChcIkNvdW50ZXNzXCIsMSk7X28zLkFkZChcIlByaW5jZXNzXCIsMSk7cmV0dXJuIF9vMzt9KTt9fVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIExSQ0VuZ2luZTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgTFJDRW5naW5lXHJcbntcclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgVUlNb3VzZVJlc3BvbmRlclxyXG4gICAge1xyXG4gICAgICAgIFVJTW91c2VSZXNwb25kZXIgR2V0TW91c2VIb3ZlcihWZWN0b3IyIGxvY2FsTW91c2VQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBVSUVsZW1lbnQ6IFVJTW91c2VSZXNwb25kZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVUlDb250YWluZXIgcGFyZW50O1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBVSU1vdXNlUmVzcG9uZGVyIEdldE1vdXNlSG92ZXIoVmVjdG9yMiBsb2NhbE1vdXNlUG9zKTtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgdm9pZCBVcGRhdGUoSW5wdXRTdGF0ZSBpbnB1dFN0YXRlLCBWZWN0b3IyIG9yaWdpbik7XHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKElucHV0U3RhdGUgaW5wdXRTdGF0ZSkgeyBVcGRhdGUoaW5wdXRTdGF0ZSwgVmVjdG9yMi5aZXJvKTsgIH1cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBWZWN0b3IyIG9yaWdpbik7XHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCkgeyBEcmF3KHNwcml0ZUJhdGNoLCBWZWN0b3IyLlplcm8pOyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFVJQ29udGFpbmVyIDpVSUVsZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBvcmlnaW47XHJcbiAgICAgICAgcHVibGljIExpc3Q8VUlFbGVtZW50PiBlbGVtZW50cyA9IG5ldyBMaXN0PFVJRWxlbWVudD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIFVJQ29udGFpbmVyKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVJQ29udGFpbmVyKFZlY3RvcjIgb3JpZ2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVUlNb3VzZVJlc3BvbmRlciBHZXRNb3VzZUhvdmVyKFZlY3RvcjIgbG9jYWxNb3VzZVBvcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgY2hpbGRNb3VzZVBvcyA9IGxvY2FsTW91c2VQb3MgLSBvcmlnaW47XHJcbiAgICAgICAgICAgIGZvcihpbnQgSWR4ID0gZWxlbWVudHMuQ291bnQtMTsgSWR4ID49IDA7IC0tSWR4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVSU1vdXNlUmVzcG9uZGVyIHNlbGVjdGVkID0gZWxlbWVudHNbSWR4XS5HZXRNb3VzZUhvdmVyKGNoaWxkTW91c2VQb3MpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShJbnB1dFN0YXRlIGlucHV0U3RhdGUsIFZlY3RvcjIgb3JpZ2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMiBuZXdPcmlnaW4gPSBvcmlnaW4gKyB0aGlzLm9yaWdpbjtcclxuICAgICAgICAgICAgZm9yZWFjaCAoVUlFbGVtZW50IGVsZW1lbnQgaW4gZWxlbWVudHMpXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LlVwZGF0ZShpbnB1dFN0YXRlLCBuZXdPcmlnaW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgVmVjdG9yMiBvcmlnaW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWZWN0b3IyIG5ld09yaWdpbiA9IG9yaWdpbiArIHRoaXMub3JpZ2luO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChVSUVsZW1lbnQgZWxlbWVudCBpbiBlbGVtZW50cylcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuRHJhdyhzcHJpdGVCYXRjaCwgbmV3T3JpZ2luKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChVSUVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLkFkZChlbGVtZW50KTtcclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnQgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlKFVJRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWxlbWVudHMuUmVtb3ZlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBlbGVtZW50LnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDbGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoKFVJRWxlbWVudCBlbGVtZW50IGluIGVsZW1lbnRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxlbWVudHMuQ2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lcy5DYXJkc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmFyb25DYXJkIDogTG92ZUxldHRlckNhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IFZhbHVlIHtnZXR7cmV0dXJuIDM7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgT25QbGF5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllclxyXG4gICAgICAgICAgICAgICAgbWUgPSAoKEhhbmQpQGluKS5wbGF5ZXI7XHJcbiAgICAgICAgICAgIHZhciBvdGhlciA9IGF3YWl0ICgoSGFuZClAaW4pLnBsYXllci5UYXJnZXRQbGF5ZXIoKTsgLy9Xb3JrYXJvdW5kIGZvciAjMjkzMVxyXG4gICAgICAgICAgICB2YXIgYUNvbXBhcmUgPSAoKExvdmVMZXR0ZXJDYXJkKShvdGhlci5IYW5kLmNhcmRzWzBdKSkuVmFsdWU7XHJcbiAgICAgICAgICAgIHZhciBiQ29tcGFyZSA9ICgoTG92ZUxldHRlckNhcmQpKG1lLkhhbmQuY2FyZHNbMF0pKS5WYWx1ZTsgLy9Xb3JrYXJvdW5kIGZvciAjMjkxOC5cclxuICAgICAgICAgICAgc3dpdGNoIChhQ29tcGFyZS5Db21wYXJlVG8oYkNvbXBhcmUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIC0xOiAvLyBHb29kIGZvciBtZVxyXG4gICAgICAgICAgICAgICAgICAgIG90aGVyLkxvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTogLy8gQmFkIGZvciBtZVxyXG4gICAgICAgICAgICAgICAgICAgIG1lLkxvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzLkNhcmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDb3VudGVzc0NhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gNzt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lcy5DYXJkc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR3VhcmRDYXJkIDogTG92ZUxldHRlckNhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IFZhbHVlIHtnZXR7cmV0dXJuIDE7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgT25QbGF5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBhd2FpdCAoKEhhbmQpQGluKS5wbGF5ZXIuVGFyZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXR0ZWRDYXJkID0gYXdhaXQgKChIYW5kKUBpbikucGxheWVyLlRhcmdldENhcmQoKTsgLy9Xb3JrYXJvdW5kIGZvciAjMjkxOC5cclxuICAgICAgICAgICAgaWYgKHBsYXllci5IYW5kLmNhcmRzWzBdLmltYWdlID09IHRhcmdldHRlZENhcmQpXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuTG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzLkNhcmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIYW5kbWFpZENhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gNDt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgKChIYW5kKUBpbikucGxheWVyLklzSGFuZG1haWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXMuQ2FyZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEtpbmdDYXJkIDogTG92ZUxldHRlckNhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IFZhbHVlIHtnZXR7cmV0dXJuIDY7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgT25QbGF5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9ICgoSGFuZClAaW4pLnBsYXllcjtcclxuICAgICAgICAgICAgdmFyIG90aGVyID0gYXdhaXQgbWUuVGFyZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IG1lLkhhbmQuY2FyZHNbMF0uTW92ZUNhcmRUbyhvdGhlci5IYW5kKTtcclxuICAgICAgICAgICAgYXdhaXQgb3RoZXIuSGFuZC5jYXJkc1swXS5Nb3ZlQ2FyZFRvKG1lLkhhbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lcy5DYXJkc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJpZXN0Q2FyZCA6IExvdmVMZXR0ZXJDYXJkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBWYWx1ZSB7Z2V0e3JldHVybiAyO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrIE9uUGxheSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhd2FpdCAoKEhhbmQpQGluKS5wbGF5ZXIuTG9va0F0Q2FyZHMoKGF3YWl0ICgoSGFuZClAaW4pLnBsYXllci5UYXJnZXRQbGF5ZXIoKSkuSGFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXMuQ2FyZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFByaW5jZUNhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gNTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIEBpbiA9IChhd2FpdCAoKEhhbmQpdGhpcy5AaW4pLnBsYXllci5UYXJnZXRQbGF5ZXIoKSkuSGFuZDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHYgaW4gKChIYW5kKUBpbikuY2FyZHMpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB2Lk1vdmVDYXJkVG8oQGluLkdhbWUuZGlzY2FyZFBpbGUpO1xyXG4gICAgICAgICAgICBhd2FpdCBAaW4uR2FtZS5Ub3BDYXJkKCkuTW92ZUNhcmRUbyhAaW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzLkNhcmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcmluY2Vzc0NhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gODt9fVxyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgQ1MxOTk4IC8vIEFzeW5jIG1ldGhvZCBsYWNrcyAnYXdhaXQnIG9wZXJhdG9ycyBhbmQgd2lsbCBydW4gc3luY2hyb25vdXNseVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrIE9uRGlzY2FyZCgpXHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIENTMTk5OCAvLyBBc3luYyBtZXRob2QgbGFja3MgJ2F3YWl0JyBvcGVyYXRvcnMgYW5kIHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICgoSGFuZClAaW4pLnBsYXllci5Mb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERlY2sgOiBSZWFsQ2FyZFBvb2xcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRXaWR0aCA9IDE1MDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRIZWlnaHQgPSAyMDk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEZWNrKEhhbmRHYW1lIGdhbWUpIDogYmFzZShnYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBEcmF3SW5mbyBHZXREcmF3aW5nUG9zaXRpb24oQ2FyZCBjYXJkKSB7cmV0dXJuIG5ldyBEcmF3SW5mb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1Bvc2l0aW9uID0gbmV3IFJlY3RhbmdsZShHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC0gMTUwIC0gY2FyZFdpZHRoIC0gMjAsIEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC0gY2FyZEhlaWdodCwgY2FyZFdpZHRoLCBjYXJkSGVpZ2h0KSxcclxuICAgICAgICAgICAgUGVybWlzc2lvbnMgPSBEcmF3SW5mby5EcmF3UGVybWlzc2lvbi5BbmltYXRhYmxlXHJcbiAgICAgICAgfTt9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERpc2NhcmRQaWxlIDogUmVhbENhcmRQb29sXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIERpc2NhcmRQaWxlKEhhbmRHYW1lIGdhbWUpIDogYmFzZShnYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgY2FyZFdpZHRoID0gSGFuZC5jYXJkV2lkdGggLyAyO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgY2FyZEhlaWdodCA9IEhhbmQuY2FyZEhlaWdodCAvIDI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBEcmF3SW5mbyBHZXREcmF3aW5nUG9zaXRpb24oQ2FyZCBjYXJkKSB7cmV0dXJuIG5ldyBEcmF3SW5mb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3UG9zaXRpb24gPSBuZXcgUmVjdGFuZ2xlKEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuV2lkdGggLSAxMDAgLSBjYXJkV2lkdGggLSAxMCwgKEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC0gY2FyZEhlaWdodCkgLyAyLCBjYXJkV2lkdGgsIGNhcmRIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgUGVybWlzc2lvbnMgPSBjYXJkc1tjYXJkcy5Db3VudCAtIDFdID09IGNhcmQgPyBEcmF3SW5mby5EcmF3UGVybWlzc2lvbi5EcmF3YWJsZSA6IERyYXdJbmZvLkRyYXdQZXJtaXNzaW9uLkFuaW1hdGFibGVcclxuICAgICAgICAgICAgfTt9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhhbmQgOiBSZWFsQ2FyZFBvb2xcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRXaWR0aCA9IDE1MDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRIZWlnaHQgPSAyMDk7XHJcbiAgICAgICAgcHVibGljIFBsYXllciBwbGF5ZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYW5kKEhhbmRHYW1lIGdhbWUsIFBsYXllciBwbGF5ZXIpIDogYmFzZShnYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgRHJhd0luZm8gR2V0RHJhd2luZ1Bvc2l0aW9uKENhcmQgY2FyZCkge3JldHVybiBuZXcgRHJhd0luZm9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd1Bvc2l0aW9uID0gbmV3IFJlY3RhbmdsZShcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC8gMiAtIGNhcmRzLkNvdW50ICogY2FyZFdpZHRoIC8gMiArIGNhcmRzLkluZGV4T2YoY2FyZCkgKiBjYXJkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgKEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC0gY2FyZEhlaWdodCkgKiAoKCgoR2FtZS5wbGF5ZXJzLkluZGV4T2YocGxheWVyKSAqIDQgLyBHYW1lLnBsYXllcnMuQ291bnQgKyAoMiAvIEdhbWUucGxheWVycy5Db3VudCkpICsgMikgJSA0KSAvIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBjYXJkSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIFBlcm1pc3Npb25zID0gRHJhd0luZm8uRHJhd1Blcm1pc3Npb24uRHJhd2FibGUsXHJcbiAgICAgICAgICAgICAgICBTaG93Q2FyZEJhY2sgPSBHYW1lLnVpICE9IHBsYXllclxyXG4gICAgICAgICAgICB9O31cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
