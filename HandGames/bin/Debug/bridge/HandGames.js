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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJIYW5kR2FtZXMuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIlBsYXllci5jcyIsIkNhcmQuY3MiLCJDYXJkUG9vbC5jcyIsIkhhbmRHYW1lLmNzIiwiUG9pbnRlci5jcyIsIlByb2dyYW0uY3MiLCJMUkNFbmdpbmUvVmVjdGFuZ2xlLmNzIiwiTFJDRW5naW5lL0lucHV0U3RhdGUuY3MiLCJMUkNFbmdpbmUvSlNPTlRhYmxlLmNzIiwiTFJDRW5naW5lL0xSQ0VuZ2luZS5jcyIsIkxSQ0VuZ2luZS9SaWNoSW1hZ2UuY3MiLCJMUkNFbmdpbmUvU3BsYXNoU3lzdGVtLmNzIiwiTFJDRW5naW5lL1Nwcml0ZU9iamVjdC5jcyIsIkxSQ0VuZ2luZS9VSUJ1dHRvbi5jcyIsIk5ldyBCcmlkZ2UgU3R1ZmYvSGFzaEhlbHBlcnMuY3MiLCJBSVBsYXllci5jcyIsIkNhcmRzL0xvdmVMZXR0ZXJDYXJkLmNzIiwiUmVhbENhcmRQb29sLmNzIiwiTG9jYWxQbGF5ZXIuY3MiLCJMb3ZlTGV0dGVyR2FtZS5jcyIsIkxSQ0VuZ2luZS9VSUNvbnRhaW5lci5jcyIsIkNhcmRzL0Jhcm9uQ2FyZC5jcyIsIkNhcmRzL0NvdW50ZXNzQ2FyZC5jcyIsIkNhcmRzL0d1YXJkQ2FyZC5jcyIsIkNhcmRzL0hhbmRtYWlkQ2FyZC5jcyIsIkNhcmRzL0tpbmdDYXJkLmNzIiwiQ2FyZHMvUHJpZXN0Q2FyZC5jcyIsIkNhcmRzL1ByaW5jZUNhcmQuY3MiLCJDYXJkcy9QcmluY2Vzc0NhcmQuY3MiLCJEZWNrLmNzIiwiRGlzY2FyZFBpbGUuY3MiLCJIYW5kLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OzRCQTZDdUJBOztnQkFFWEEsWUFBT0EsSUFBSUEsZUFBS0EsYUFBWUEsT0FBTUE7Ozs7O2dCQTdCbENBLHFCQUFxQkEsNEJBQXVEQSx5QkFBYUEsQUFBc0RBO2dCQUMvSUEsSUFBSUE7b0JBQ0FBLGdCQUFXQTs7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bnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFBsYXllclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBIYW5kIEhhbmQ7XHJcbiAgICAgICAgcHVibGljIEhhbmRHYW1lIEdhbWU7XHJcbiAgICAgICAgcHVibGljIGJvb2wgbG9zdDtcclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0hhbmRtYWlkZWQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIExvc2UgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub3RMb3N0UGxheWVycyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8Z2xvYmFsOjpIYW5kR2FtZXMuUGxheWVyPihHYW1lLnBsYXllcnMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuUGxheWVyLCBib29sPikodiA9PiAhdi5sb3N0KSk7XHJcbiAgICAgICAgICAgIGlmIChub3RMb3N0UGxheWVycy5Db3VudCgpID09IDEpXHJcbiAgICAgICAgICAgICAgICBHYW1lLndvbiA9IG5vdExvc3RQbGF5ZXJzLkZpcnN0KCk7XHJcbiAgICAgICAgICAgIGxvc3QgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiNwcmFnbWEgd2FybmluZyBkaXNhYmxlIENTMTk5OCAvLyBBc3luYyBtZXRob2QgbGFja3MgJ2F3YWl0JyBvcGVyYXRvcnMgYW5kIHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBFbmRUdXJuKClcclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgQ1MxOTk4IC8vIEFzeW5jIG1ldGhvZCBsYWNrcyAnYXdhaXQnIG9wZXJhdG9ycyBhbmQgd2lsbCBydW4gc3luY2hyb25vdXNseVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGxheWVyIHBsYXllcjtcclxuICAgICAgICAgICAgaWYgKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQWxsPGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllcj4oR2FtZS5wbGF5ZXJzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllciwgYm9vbD4pKHYgPT4gdi5sb3N0KSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEJyaWRnZS5IdG1sNS5HbG9iYWwuQWxlcnQoXCJBbGwgcGxheWVycyBsb3N0LlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIgPSBHYW1lLnBsYXllcnNbR2FtZS50dXJuSWR4ID0gKEdhbWUudHVybklkeCArIDEpICUgR2FtZS5wbGF5ZXJzLkNvdW50XTtcclxuICAgICAgICAgICAgfSB3aGlsZSAocGxheWVyLmxvc3QpO1xyXG4gICAgICAgICAgICBwbGF5ZXIuT25UdXJuU3RhcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBUYXNrPFRleHR1cmUyRD4gVGFyZ2V0Q2FyZCgpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBUYXNrPFBsYXllcj4gVGFyZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFRhc2sgTG9va0F0Q2FyZHMoUmVhbENhcmRQb29sIGNhcmRQb29sKTtcclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgUGxheWVyIChIYW5kR2FtZSBHYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSGFuZCA9IG5ldyBIYW5kKHRoaXMuR2FtZSA9IEdhbWUsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgYXN5bmMgdm9pZCBPblR1cm5TdGFydCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJc0hhbmRtYWlkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKEdhbWUgaXMgTG92ZUxldHRlckdhbWUpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBHYW1lLlRvcENhcmQoKS5Nb3ZlQ2FyZFRvKEhhbmQpO1xyXG4gICAgICAgICAgICB2YXIgY291bnRlc3MgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQ+KEhhbmQuY2FyZHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuQ2FyZCwgYm9vbD4pKHYgPT4gdiBpcyBDYXJkcy5Db3VudGVzc0NhcmQpKTtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXNzICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBraW5nT3JQcmluY2UgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQ+KEhhbmQuY2FyZHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuQ2FyZCwgYm9vbD4pKHYgPT4gdiBpcyBDYXJkcy5LaW5nQ2FyZCB8fCB2IGlzIENhcmRzLlByaW5jZUNhcmQpKTtcclxuICAgICAgICAgICAgICAgIGlmIChraW5nT3JQcmluY2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBraW5nT3JQcmluY2UuUGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lc1xyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBDYXJkUG9vbCBAaW47XHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRCBpbWFnZTtcclxuICAgICAgICBwdWJsaWMgYm9vbCBIaWdobGlnaHRlZDtcclxuICAgICAgICBwdWJsaWMgUmVjdGFuZ2xlPyBvbGRMb2M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBUYXNrIE9uUGxheSgpO1xyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGFzeW5jIFRhc2sgT25EaXNjYXJkICgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICgoRGF0ZVRpbWUuTm93IC0gb3JnRGF0ZSkgPiBnbGlkZVRpbWUpXHJcbiAgICAgICAgICAgICAgICBpZiAoIWFuaW1hdGlvbkRvbmUuVGFzay5Jc0NvbXBsZXRlZClcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25Eb25lLlNldFJlc3VsdChudWxsKTtcclxuICAgICAgICAgICAgRHJhd0luZm8gZHJhd0luZm8gPSBAaW4uR2V0RHJhd2luZ1Bvc2l0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICBSZWN0YW5nbGU/IG5ld0xvYyA9IGRyYXdJbmZvLkRyYXdQb3NpdGlvbjtcclxuICAgICAgICAgICAgaWYgKG5ld0xvYyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBSZWN0YW5nbGUgcmVjdCA9IChSZWN0YW5nbGUpbmV3TG9jO1xyXG4gICAgICAgICAgICBpZiAob2xkTG9jICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJlY3RhbmdsZSBvbGRMb2NSZWFsID0gKFJlY3RhbmdsZSlvbGRMb2M7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCBnbGlkZU4gPSAoKGZsb2F0KShEYXRlVGltZS5Ob3cgLSAoRGF0ZVRpbWUpb3JnRGF0ZSkuVGlja3MgLyBnbGlkZVRpbWUuVGlja3MpO1xyXG4gICAgICAgICAgICAgICAgcmVjdCA9IG5ldyBSZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yMi5MZXJwKG9sZExvY1JlYWwuTG9jYXRpb24uVG9WZWN0b3IyKCksIHJlY3QuTG9jYXRpb24uVG9WZWN0b3IyKCksIGdsaWRlTikuVG9Qb2ludCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjIuTGVycChvbGRMb2NSZWFsLlNpemUuVG9WZWN0b3IyKCksIHJlY3QuU2l6ZS5Ub1ZlY3RvcjIoKSwgZ2xpZGVOKS5Ub1BvaW50KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChIaWdobGlnaHRlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUmVjdGFuZ2xlIGhpZ2hsaWdodFJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUocmVjdC5YIC0gMSwgcmVjdC5ZIC0gMSwgcmVjdC5XaWR0aCArIDEsIHJlY3QuSGVpZ2h0ICsgMSk7XHJcbiAgICAgICAgICAgICAgICBAaW4uR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEBpbi5HYW1lLnJlY3RhbmdsZSwgbmV3IFJlY3RhbmdsZShoaWdobGlnaHRSZWN0YW5nbGUuTG9jYXRpb24sIG5ldyBQb2ludCgxLCByZWN0LkhlaWdodCkpLCBDb2xvci5ZZWxsb3cpO1xyXG4gICAgICAgICAgICAgICAgQGluLkdhbWUuc3ByaXRlQmF0Y2guRHJhdyhAaW4uR2FtZS5yZWN0YW5nbGUsIG5ldyBSZWN0YW5nbGUobmV3IFBvaW50KGhpZ2hsaWdodFJlY3RhbmdsZS5SaWdodCwgaGlnaGxpZ2h0UmVjdGFuZ2xlLlkpLCBuZXcgUG9pbnQoMSwgcmVjdC5IZWlnaHQpKSwgQ29sb3IuWWVsbG93KTtcclxuICAgICAgICAgICAgICAgIEBpbi5HYW1lLnNwcml0ZUJhdGNoLkRyYXcoQGluLkdhbWUucmVjdGFuZ2xlLCBuZXcgUmVjdGFuZ2xlKHJlY3QuWCwgaGlnaGxpZ2h0UmVjdGFuZ2xlLlksIHJlY3QuV2lkdGgsIDEpLCBDb2xvci5ZZWxsb3cpO1xyXG4gICAgICAgICAgICAgICAgQGluLkdhbWUuc3ByaXRlQmF0Y2guRHJhdyhAaW4uR2FtZS5yZWN0YW5nbGUsIG5ldyBSZWN0YW5nbGUocmVjdC5YLCBoaWdobGlnaHRSZWN0YW5nbGUuQm90dG9tLCByZWN0LldpZHRoLCAxKSwgQ29sb3IuWWVsbG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBAaW4uR2FtZS5zcHJpdGVCYXRjaC5EcmF3KGRyYXdJbmZvLlNob3dDYXJkQmFjayA/IEBpbi5HYW1lLmNhcmRiYWNrIDogaW1hZ2UsIHJlY3QsIENvbG9yLldoaXRlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFRpbWVTcGFuIGdsaWRlVGltZSA9IFRpbWVTcGFuLkZyb21TZWNvbmRzKC42NSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGFzeW5jIFRhc2sgUGxheSAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXdhaXQgT25QbGF5KCk7XHJcbiAgICAgICAgICAgIGF3YWl0IE1vdmVDYXJkVG8oQGluLkdhbWUuZGlzY2FyZFBpbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgTW92ZUNhcmRUbyAoQ2FyZFBvb2wgdG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIaWdobGlnaHRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgb2xkUG9zID0gQGluLkdldERyYXdpbmdQb3NpdGlvbih0aGlzKTtcclxuICAgICAgICAgICAgQGluLlJlbW92ZSh0aGlzKTtcclxuICAgICAgICAgICAgdG8uQWRkKHRoaXMpO1xyXG4gICAgICAgICAgICBpZiAoIShvbGRQb3MuUGVybWlzc2lvbnMgPT0gRHJhd0luZm8uRHJhd1Blcm1pc3Npb24uVW5kcmF3YWJsZSB8fCB0by5HZXREcmF3aW5nUG9zaXRpb24odGhpcykuUGVybWlzc2lvbnMgPT0gRHJhd0luZm8uRHJhd1Blcm1pc3Npb24uVW5kcmF3YWJsZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9sZExvYyA9IG9sZFBvcy5EcmF3UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBvcmdEYXRlID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgICAgICAgICAgZnJvbSA9IEBpbjtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkRvbmUgPSBuZXcgVGFza0NvbXBsZXRpb25Tb3VyY2U8b2JqZWN0PigpO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgYW5pbWF0aW9uRG9uZS5UYXNrO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRG9uZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBvcmdEYXRlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGZyb20gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgb2xkTG9jID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoQGluIGlzIEhhbmQgJiYgdG8gaXMgRGlzY2FyZFBpbGUpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBPbkRpc2NhcmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRhc2tDb21wbGV0aW9uU291cmNlPG9iamVjdD4gYW5pbWF0aW9uRG9uZTtcclxuICAgICAgICBEYXRlVGltZT8gb3JnRGF0ZTtcclxuICAgICAgICBDYXJkUG9vbCBmcm9tO1xyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBDYXJkUG9vbFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBDYXJkUG9vbCAoSGFuZEdhbWUgZ2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWUgPSBnYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEFkZChDYXJkIGNhcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXJkLkBpbiA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgUmVtb3ZlKENhcmQgY2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkLkBpbiA9PSB0aGlzKVxyXG4gICAgICAgICAgICAgICAgY2FyZC5AaW4gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgYm9vbCBDb250YWlucyhDYXJkIGNhcmQpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBEcmF3SW5mbyBHZXREcmF3aW5nUG9zaXRpb24oQ2FyZCBjYXJkKTtcclxuICAgICAgICBwdWJsaWMgSGFuZEdhbWUgR2FtZTtcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFRoaXMgaXMgdGhlIG1haW4gdHlwZSBmb3IgeW91ciBnYW1lLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBIYW5kR2FtZSA6IEdhbWVcclxuICAgIHtcclxuICAgICAgICBHcmFwaGljc0RldmljZU1hbmFnZXIgZ3JhcGhpY3M7XHJcbiAgICAgICAgcHVibGljIFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PFBsYXllcj4gcGxheWVycyA9IG5ldyBMaXN0PFBsYXllcj4oKTtcclxuICAgICAgICBwdWJsaWMgUGxheWVyIHdvbjtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgc3RyaW5nIENvbnRlbnRGb2xkZXJOYW1lIHsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0XHJcbiNpZiAhV0lORE9XU1xyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICA8c3RyaW5nLCBpbnQ+IGNhcmRzIHsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIExpc3Q8VGV4dHVyZTJEPiBjYXJkSW1hZ2VzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBIYW5kR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBncmFwaGljcyA9IG5ldyBHcmFwaGljc0RldmljZU1hbmFnZXIodGhpcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSXNGdWxsU2NyZWVuID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgIFByZWZlcnJlZEJhY2tCdWZmZXJXaWR0aCA9IDEzNjYsXHJcbiAgICAgICAgICAgICAgICBQcmVmZXJyZWRCYWNrQnVmZmVySGVpZ2h0ID0gNzY4XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIENvbnRlbnQuUm9vdERpcmVjdG9yeSA9IFwiQ29udGVudFwiO1xyXG4gICAgICAgICAgICBJc01vdXNlVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBwZXJmb3JtIGFueSBpbml0aWFsaXphdGlvbiBpdCBuZWVkcyB0byBiZWZvcmUgc3RhcnRpbmcgdG8gcnVuLlxyXG4gICAgICAgIC8vLyBUaGlzIGlzIHdoZXJlIGl0IGNhbiBxdWVyeSBmb3IgYW55IHJlcXVpcmVkIHNlcnZpY2VzIGFuZCBsb2FkIGFueSBub24tZ3JhcGhpY1xyXG4gICAgICAgIC8vLyByZWxhdGVkIGNvbnRlbnQuICBDYWxsaW5nIGJhc2UuSW5pdGlhbGl6ZSB3aWxsIGVudW1lcmF0ZSB0aHJvdWdoIGFueSBjb21wb25lbnRzXHJcbiAgICAgICAgLy8vIGFuZCBpbml0aWFsaXplIHRoZW0gYXMgd2VsbC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogQWRkIHlvdXIgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxyXG5cclxuICAgICAgICAgICAgYmFzZS5Jbml0aWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEIGNhcmRiYWNrO1xyXG4gICAgICAgIHB1YmxpYyBEaXNjYXJkUGlsZSBkaXNjYXJkUGlsZTtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkQ29udGVudCB3aWxsIGJlIGNhbGxlZCBvbmNlIHBlciBnYW1lIGFuZCBpcyB0aGUgcGxhY2UgdG8gbG9hZFxyXG4gICAgICAgIC8vLyBhbGwgb2YgeW91ciBjb250ZW50LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgTG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IFNwcml0ZUJhdGNoLCB3aGljaCBjYW4gYmUgdXNlZCB0byBkcmF3IHRleHR1cmVzLlxyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaCA9IG5ldyBTcHJpdGVCYXRjaChHcmFwaGljc0RldmljZSk7XHJcbiAgICAgICAgICAgIGNhcmRJbWFnZXMgPSBuZXcgTGlzdDxUZXh0dXJlMkQ+KCk7XHJcbiAgICAgICAgICAgIGRlY2sgPSBuZXcgRGVjayh0aGlzKTtcclxuICAgICAgICAgICAgZGlzY2FyZFBpbGUgPSBuZXcgRGlzY2FyZFBpbGUodGhpcyk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IHVzZSB0aGlzLkNvbnRlbnQgdG8gbG9hZCB5b3VyIGdhbWUgY29udGVudCBoZXJlXHJcbiAgICAgICAgICAgIGZvbnQgPSBDb250ZW50LkxvYWQ8U3ByaXRlRm9udD4oXCJBcmlhbFwiKTtcclxuICAgICAgICAgICAgY2hvaWNlRm9udCA9IENvbnRlbnQuTG9hZDxTcHJpdGVGb250PihcIkNob2ljZSBUZXh0XCIpO1xyXG4gICAgICAgICAgICByZWN0YW5nbGUgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICBjYXJkYmFjayA9IENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KHN0cmluZy5Gb3JtYXQoXCJ7MH0vY2FyZGJhY2tcIixDb250ZW50Rm9sZGVyTmFtZSkpO1xyXG4gICAgICAgICAgICBwbGF5ZXJzLkFkZCh1aSA9IG5ldyBMb2NhbFBsYXllcih0aGlzKSk7XHJcbiAgICAgICAgICAgIHBsYXllcnMuQWRkKG5ldyBBSVBsYXllcih0aGlzKSk7XHJcbiAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBuID0gMDtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjYXJkS2V5UGFpciBpbiBjYXJkcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihzdHJpbmcuRm9ybWF0KFwiezB9L3sxfXsyfVwiLENvbnRlbnRGb2xkZXJOYW1lLG4gKyAxLGNhcmRLZXlQYWlyLktleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRJbWFnZXMuQWRkKGltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpZHggPSAwOyBpZHggPCBjYXJkS2V5UGFpci5WYWx1ZTsgaWR4KyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDYXJkIGNhcmQgPSAoQ2FyZClBc3NlbWJseS5HZXRFeGVjdXRpbmdBc3NlbWJseSgpLkdldFR5cGUoc3RyaW5nLkZvcm1hdChcIkhhbmRHYW1lcy5DYXJkcy57MH1DYXJkXCIsY2FyZEtleVBhaXIuS2V5KSkuR2V0Q29uc3RydWN0b3IobmV3IFR5cGVbXSB7IH0pLkludm9rZShuZXcgb2JqZWN0WzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZC5pbWFnZSA9IGltYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNrLkFkZChjYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdoaWxlIChmYWxzZSk7XHJcbiAgICAgICAgICAgIFNodWZmbGVEZWNrKCk7XHJcbiAgICAgICAgICAgIHBsYXllcnMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllcj4pKHBsYXllciA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IDE7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9wQ2FyZCA9IFRvcENhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWNrLlJlbW92ZSh0b3BDYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuSGFuZC5BZGQodG9wQ2FyZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcGxheWVyc1t0dXJuSWR4XS5PblR1cm5TdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIENhcmQgVG9wQ2FyZCgpIHtyZXR1cm4gZGVjay5jYXJkc1swXTt9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgdHVybklkeDtcclxuICAgICAgICBSYW5kb20gcm5kID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZvaWQgU2h1ZmZsZURlY2sgKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBpbnQgbiA9IGRlY2suY2FyZHMuQ291bnQ7XHJcbiAgICAgICAgICAgIHdoaWxlIChuID4gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbi0tO1xyXG4gICAgICAgICAgICAgICAgaW50IGsgPSBybmQuTmV4dChuICsgMSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBkZWNrLmNhcmRzW2tdO1xyXG4gICAgICAgICAgICAgICAgZGVjay5jYXJkc1trXSA9IGRlY2suY2FyZHNbbl07XHJcbiAgICAgICAgICAgICAgICBkZWNrLmNhcmRzW25dID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlMkQgcmVjdGFuZ2xlO1xyXG4gICAgICAgIHB1YmxpYyBEZWNrIGRlY2s7XHJcbiAgICAgICAgcHVibGljIExvY2FsUGxheWVyIHVpO1xyXG4gICAgICAgIHB1YmxpYyBTcHJpdGVGb250IGZvbnQsIGNob2ljZUZvbnQ7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVW5sb2FkQ29udGVudCB3aWxsIGJlIGNhbGxlZCBvbmNlIHBlciBnYW1lIGFuZCBpcyB0aGUgcGxhY2UgdG8gdW5sb2FkXHJcbiAgICAgICAgLy8vIGdhbWUtc3BlY2lmaWMgY29udGVudC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFVubG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogVW5sb2FkIGFueSBub24gQ29udGVudE1hbmFnZXIgY29udGVudCBoZXJlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBydW4gbG9naWMgc3VjaCBhcyB1cGRhdGluZyB0aGUgd29ybGQsXHJcbiAgICAgICAgLy8vIGNoZWNraW5nIGZvciBjb2xsaXNpb25zLCBnYXRoZXJpbmcgaW5wdXQsIGFuZCBwbGF5aW5nIGF1ZGlvLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZ2FtZVRpbWVcIj5Qcm92aWRlcyBhIHNuYXBzaG90IG9mIHRpbWluZyB2YWx1ZXMuPC9wYXJhbT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBBZGQgeW91ciB1cGRhdGUgbG9naWMgaGVyZVxyXG4gICAgICAgICAgICB1aS5VcGRhdGUoKTtcclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGlzIGlzIGNhbGxlZCB3aGVuIHRoZSBnYW1lIHNob3VsZCBkcmF3IGl0c2VsZi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImdhbWVUaW1lXCI+UHJvdmlkZXMgYSBzbmFwc2hvdCBvZiB0aW1pbmcgdmFsdWVzLjwvcGFyYW0+XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgRHJhdyhHYW1lVGltZSBnYW1lVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdyYXBoaWNzRGV2aWNlLkNsZWFyKENvbG9yLkNvcm5mbG93ZXJCbHVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IEFkZCB5b3VyIGRyYXdpbmcgY29kZSBoZXJlXHJcblxyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5CZWdpbigpO1xyXG4gICAgICAgICAgICBpZiAod29uID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB1aS5EcmF3KCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXdTdHJpbmcoZm9udCwgc3RyaW5nLkZvcm1hdChcInswfSBoYXMgd29uLlwiLHdvbi5HZXRUeXBlKCkuTmFtZSksIG5ldyBWZWN0b3IyKDAsIDApLCBDb2xvci5SZWQpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5FbmQoKTtcclxuXHJcbiAgICAgICAgICAgIGJhc2UuRHJhdyhnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFBvaW50ZXI8VD5cclxuICAgIHtcclxuICAgICAgICBUIHZhbHVlO1xyXG4gICAgICAgIHB1YmxpYyBQb2ludGVyIChUIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0VmFsdWUoVCB2YWx1ZSkgeyB0aGlzLnZhbHVlID0gdmFsdWU7fVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGltcGxpY2l0IG9wZXJhdG9yIFQgKFBvaW50ZXI8VD4gdmFsdWUpIHtyZXR1cm4gdmFsdWUudmFsdWU7fVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBvcGVyYXRvciB+IChQb2ludGVyPFQ+IHZhbHVlKSB7cmV0dXJuIHZhbHVlLnZhbHVlO31cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcm9ncmFtXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdXNpbmcgKHZhciBnYW1lID0gbmV3IExvdmVMZXR0ZXJHYW1lKCkpXHJcbiAgICAgICAgICAgICAgICBnYW1lLlJ1bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG5cclxubmFtZXNwYWNlIExSQ0VuZ2luZVxyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IFZlY3RhbmdsZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBYO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBZO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBXaWR0aDtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgSGVpZ2h0O1xyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBPcmlnaW4geyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIoWCwgWSk7IH0gc2V0IHsgWCA9IHZhbHVlLlg7IFkgPSB2YWx1ZS5ZOyB9IH1cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBTaXplIHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0b3IyKFdpZHRoLCBIZWlnaHQpOyB9IHNldCB7IFdpZHRoID0gdmFsdWUuWDsgSGVpZ2h0ID0gdmFsdWUuWTsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdGFuZ2xlIEJvdW5kaW5nQm94KFZlY3RvcjIgYSwgVmVjdG9yMiBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMiBvcmlnaW4gPSBuZXcgVmVjdG9yMihNYXRoLk1pbihhLlgsIGIuWCksIE1hdGguTWluKGEuWSwgYi5ZKSk7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgYm90UmlnaHQgPSBuZXcgVmVjdG9yMihNYXRoLk1heChhLlgsIGIuWCksIE1hdGguTWF4KGEuWSwgYi5ZKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdGFuZ2xlKG9yaWdpbiwgYm90UmlnaHQgLSBvcmlnaW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ29udGFpbnMoVmVjdG9yMiBwb2ludClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBYIDw9IHBvaW50LlggJiYgWSA8PSBwb2ludC5ZICYmIFggKyBXaWR0aCA+IHBvaW50LlggJiYgWSArIEhlaWdodCA+IHBvaW50Llk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhWZWN0YW5nbGUgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gWCA8PSBvdGhlci5YXHJcbiAgICAgICAgICAgICAgICAmJiBZIDw9IG90aGVyLllcclxuICAgICAgICAgICAgICAgICYmIFggKyBXaWR0aCA+PSBvdGhlci5YICsgb3RoZXIuV2lkdGhcclxuICAgICAgICAgICAgICAgICYmIFkgKyBIZWlnaHQgPj0gb3RoZXIuWSArIG90aGVyLkhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEludGVyc2VjdHMoVmVjdGFuZ2xlIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFggPD0gb3RoZXIuWCArIG90aGVyLldpZHRoICYmIFkgPD0gb3RoZXIuWSArIG90aGVyLkhlaWdodCAmJlxyXG4gICAgICAgICAgICAgICAgWCArIFdpZHRoID49IG90aGVyLlggJiYgWSArIEhlaWdodCA+PSBvdGhlci5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RhbmdsZSBCbG9hdChmbG9hdCBhbW91bnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RhbmdsZShYIC0gYW1vdW50LCBZIC0gYW1vdW50LCBXaWR0aCArIGFtb3VudCAqIDIsIEhlaWdodCArIGFtb3VudCAqIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RhbmdsZSBCbG9hdChmbG9hdCBiWCwgZmxvYXQgYlkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RhbmdsZShYIC0gYlgsIFkgLSBiWSwgV2lkdGggKyBiWCAqIDIsIEhlaWdodCArIGJZICogMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdGFuZ2xlKGZsb2F0IGFYLCBmbG9hdCBhWSwgZmxvYXQgYVdpZHRoLCBmbG9hdCBhSGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCA9IGFYOyBZID0gYVk7IFdpZHRoID0gYVdpZHRoOyBIZWlnaHQgPSBhSGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RhbmdsZShWZWN0b3IyIG9yaWdpbiwgVmVjdG9yMiBzaXplKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCA9IG9yaWdpbi5YO1xyXG4gICAgICAgICAgICBZID0gb3JpZ2luLlk7XHJcbiAgICAgICAgICAgIFdpZHRoID0gc2l6ZS5YO1xyXG4gICAgICAgICAgICBIZWlnaHQgPSBzaXplLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTWF4WCB7IGdldCB7IHJldHVybiBYICsgV2lkdGg7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBNYXhZIHsgZ2V0IHsgcmV0dXJuIFkgKyBIZWlnaHQ7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBYWSB7IGdldCB7IHJldHVybiBuZXcgVmVjdG9yMihYLCBZKTsgfSB9XHJcbiAgICAgICAgcHVibGljIFZlY3RhbmdsZSBMZWZ0U2lkZSB7IGdldCB7IHJldHVybiBuZXcgVmVjdGFuZ2xlKFgsIFksIDAsIEhlaWdodCk7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBWZWN0YW5nbGUgUmlnaHRTaWRlIHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0YW5nbGUoWCtXaWR0aCwgWSwgMCwgSGVpZ2h0KTsgfSB9XHJcbiAgICAgICAgcHVibGljIFZlY3RhbmdsZSBUb3BTaWRlIHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0YW5nbGUoWCwgWSwgV2lkdGgsIDApOyB9IH1cclxuICAgICAgICBwdWJsaWMgVmVjdGFuZ2xlIEJvdHRvbVNpZGUgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RhbmdsZShYLCBZK0hlaWdodCwgV2lkdGgsIDApOyB9IH1cclxuICAgICAgICBwdWJsaWMgZmxvYXQgVG9wIHsgZ2V0IHsgcmV0dXJuIFk7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBCb3R0b20geyBnZXQgeyByZXR1cm4gWSArIEhlaWdodDsgfSB9XHJcbiAgICAgICAgcHVibGljIGZsb2F0IExlZnQgeyBnZXQgeyByZXR1cm4gWDsgfSB9XHJcbiAgICAgICAgcHVibGljIGZsb2F0IFJpZ2h0IHsgZ2V0IHsgcmV0dXJuIFggKyBXaWR0aDsgfSB9XHJcbiAgICAgICAgcHVibGljIGZsb2F0IENlbnRlclggeyBnZXQgeyByZXR1cm4gWCArIFdpZHRoIC8gMjsgfSB9XHJcbiAgICAgICAgcHVibGljIGZsb2F0IENlbnRlclkgeyBnZXQgeyByZXR1cm4gWSArIEhlaWdodCAvIDI7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIFRvcExlZnQgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIoTGVmdCwgVG9wKTsgfSB9XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgVG9wQ2VudGVyIHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0b3IyKENlbnRlclgsIFRvcCk7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIFRvcFJpZ2h0IHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0b3IyKFJpZ2h0LCBUb3ApOyB9IH1cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBDZW50ZXJMZWZ0IHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0b3IyKExlZnQsIENlbnRlclkpOyB9IH1cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBDZW50ZXIgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIoQ2VudGVyWCwgQ2VudGVyWSk7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIENlbnRlclJpZ2h0IHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0b3IyKFJpZ2h0LCBDZW50ZXJZKTsgfSB9XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgQm90dG9tTGVmdCB7IGdldCB7IHJldHVybiBuZXcgVmVjdG9yMihMZWZ0LCBCb3R0b20pOyB9IH1cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBCb3R0b21DZW50ZXIgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIoQ2VudGVyWCwgQm90dG9tKTsgfSB9XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgQm90dG9tUmlnaHQgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIoUmlnaHQsIEJvdHRvbSk7IH0gfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgRXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEcmF3KHRoaXMgU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFRleHR1cmUyRCB0ZXh0dXJlLCBWZWN0YW5nbGUgdmVjdCwgQ29sb3IgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIHZlY3QuT3JpZ2luLCBudWxsLCBjb2xvciwgMCwgVmVjdG9yMi5aZXJvLCBuZXcgVmVjdG9yMih2ZWN0LlNpemUuWCAvIHRleHR1cmUuV2lkdGgsIHZlY3QuU2l6ZS5ZIC8gdGV4dHVyZS5IZWlnaHQpLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIENvbnRhaW5zKHRoaXMgUmVjdGFuZ2xlIHJlY3QsIFZlY3RvcjIgcG9pbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjdC5YIDw9IHBvaW50LlggJiYgcmVjdC5ZIDw9IHBvaW50LlkgJiZcclxuICAgICAgICAgICAgICAgIHJlY3QuWCArIHJlY3QuV2lkdGggPiBwb2ludC5YICYmIHJlY3QuWSArIHJlY3QuSGVpZ2h0ID4gcG9pbnQuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJbnRlcnNlY3RzKHRoaXMgUmVjdGFuZ2xlIHJlY3QsIFZlY3RhbmdsZSBvdGhlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWN0LlggPD0gb3RoZXIuWCArIG90aGVyLldpZHRoICYmIHJlY3QuWSA8PSBvdGhlci5ZICsgb3RoZXIuSGVpZ2h0ICYmXHJcbiAgICAgICAgICAgICAgICByZWN0LlggKyByZWN0LldpZHRoID49IG90aGVyLlggJiYgcmVjdC5ZICsgcmVjdC5IZWlnaHQgPj0gb3RoZXIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdGFuZ2xlIFZlY3RhbmdsZSh0aGlzIFJlY3RhbmdsZSByZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0YW5nbGUocmVjdC5YLCByZWN0LlksIHJlY3QuV2lkdGgsIHJlY3QuSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxuXHJcbm5hbWVzcGFjZSBMUkNFbmdpbmVcclxue1xyXG4gICAgcHVibGljIGVudW0gTW91c2VCdXR0b25cclxuICAgIHtcclxuICAgICAgICBMRUZULFxyXG4gICAgICAgIE1JRERMRSxcclxuICAgICAgICBSSUdIVFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBNb3VzZUJ1dHRvblN0YXRlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIE1vdXNlQnV0dG9uIGJ1dHRvbjtcclxuICAgICAgICBwdWJsaWMgYm9vbCBpc0Rvd247XHJcbiAgICAgICAgcHVibGljIGJvb2wgZHJhZ2dlZDtcclxuICAgICAgICBwdWJsaWMgaW50IGR1cmF0aW9uRnJhbWVzO1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIGluaXRpYWxNb3VzZVBvcztcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEUkFHX1RIUkVTSE9MRCA9IDMuMGY7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBGUkFNRVJBVEUgPSAxIC8gMzAuMGY7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUJ1dHRvblN0YXRlKE1vdXNlQnV0dG9uIGJ1dHRvbiwgTW91c2VTdGF0ZSBpbml0aWFsU3RhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcclxuICAgICAgICAgICAgaXNEb3duID0gSXNCdXR0b25QcmVzc2VkKGluaXRpYWxTdGF0ZSk7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uRnJhbWVzID0gMTAwO1xyXG4gICAgICAgICAgICBpbml0aWFsTW91c2VQb3MgPSBuZXcgVmVjdG9yMihpbml0aWFsU3RhdGUuWCwgaW5pdGlhbFN0YXRlLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKE1vdXNlU3RhdGUgc3RhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBib29sIG5ld1ByZXNzZWQgPSBJc0J1dHRvblByZXNzZWQoc3RhdGUpO1xyXG4gICAgICAgICAgICBpZiggaXNEb3duICE9IG5ld1ByZXNzZWQgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpc0Rvd24gPSBuZXdQcmVzc2VkO1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb25GcmFtZXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgZHJhZ2dlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaW5pdGlhbE1vdXNlUG9zID0gbmV3IFZlY3RvcjIoc3RhdGUuWCwgc3RhdGUuWSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbkZyYW1lcysrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc0Rvd24gJiYgIWRyYWdnZWQgJiYgKGluaXRpYWxNb3VzZVBvcyAtIG5ldyBWZWN0b3IyKHN0YXRlLlgsIHN0YXRlLlkpKS5MZW5ndGhTcXVhcmVkKCkgPiBEUkFHX1RIUkVTSE9MRCAqIERSQUdfVEhSRVNIT0xEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib29sIElzQnV0dG9uUHJlc3NlZChNb3VzZVN0YXRlIHN0YXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoKGJ1dHRvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBNb3VzZUJ1dHRvbi5MRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZS5MZWZ0QnV0dG9uID09IEJ1dHRvblN0YXRlLlByZXNzZWQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE1vdXNlQnV0dG9uLk1JRERMRTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUuTWlkZGxlQnV0dG9uID09IEJ1dHRvblN0YXRlLlByZXNzZWQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE1vdXNlQnV0dG9uLlJJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZS5SaWdodEJ1dHRvbiA9PSBCdXR0b25TdGF0ZS5QcmVzc2VkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBkdXJhdGlvbiB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBkdXJhdGlvbkZyYW1lcyAqIEZSQU1FUkFURTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wganVzdFByZXNzZWQge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gaXNEb3duICYmIGR1cmF0aW9uRnJhbWVzID09IDA7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIGp1c3RSZWxlYXNlZCB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiAhaXNEb3duICYmIGR1cmF0aW9uRnJhbWVzID09IDA7IH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIElucHV0U3RhdGVcclxuICAgIHtcclxuICAgICAgICBNb3VzZVN0YXRlIG9sZE1vdXNlO1xyXG4gICAgICAgIHB1YmxpYyBNb3VzZVN0YXRlIG1vdXNlIHsgZ2V0OyBpbnRlcm5hbCBzZXQ7IH1cclxuICAgICAgICBLZXlib2FyZFN0YXRlIG9sZEtleWJvYXJkO1xyXG4gICAgICAgIHB1YmxpYyBLZXlib2FyZFN0YXRlIGtleWJvYXJkIHsgZ2V0OyBpbnRlcm5hbCBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgYm9vbCBwYXVzZU1vdXNlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIGJvb2wgcHJlRmlyc3RVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIGJvb2wgZmlyc3RVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIHB1YmxpYyBVSU1vdXNlUmVzcG9uZGVyIGhvdmVyaW5nRWxlbWVudDtcclxuICAgICAgICBwdWJsaWMgVUlNb3VzZVJlc3BvbmRlciBob3ZlcmluZ0VsZW1lbnRNb3VzZURvd247XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb3VzZUJ1dHRvblN0YXRlIG1vdXNlTGVmdDtcclxuICAgICAgICBwdWJsaWMgTW91c2VCdXR0b25TdGF0ZSBtb3VzZU1pZGRsZTtcclxuICAgICAgICBwdWJsaWMgTW91c2VCdXR0b25TdGF0ZSBtb3VzZVJpZ2h0O1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGZpcnN0VXBkYXRlICYmICFwcmVGaXJzdFVwZGF0ZSlcclxuICAgICAgICAgICAgICAgIGZpcnN0VXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHByZUZpcnN0VXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG9sZEtleWJvYXJkID0ga2V5Ym9hcmQ7XHJcbiAgICAgICAgICAgIGtleWJvYXJkID0gS2V5Ym9hcmQuR2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgLyppZiAoV2FzS2V5SnVzdFByZXNzZWQoS2V5cy5TcGFjZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhdXNlTW91c2UgPSAhcGF1c2VNb3VzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChJc0tleURvd24oS2V5cy5TcGFjZSkgJiYgcGF1c2VNb3VzZSAmJiAoV2FzTW91c2VMZWZ0SnVzdFByZXNzZWQoKSB8fCBXYXNNb3VzZVJpZ2h0SnVzdFByZXNzZWQoKSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGZvcmNlIGFuIHVwZGF0ZSBpZiB0aGUgdXNlciBjbGlja3NcclxuICAgICAgICAgICAgICAgIG1vdXNlID0gTW91c2UuR2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgICAgICBpZiAocGF1c2VNb3VzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW91c2UgPSBvbGRNb3VzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9sZE1vdXNlID0gbW91c2U7XHJcbiAgICAgICAgICAgICAgICBtb3VzZSA9IE1vdXNlLkdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtb3VzZUxlZnQgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW91c2VMZWZ0LlVwZGF0ZShtb3VzZSk7XHJcbiAgICAgICAgICAgICAgICBtb3VzZU1pZGRsZS5VcGRhdGUobW91c2UpO1xyXG4gICAgICAgICAgICAgICAgbW91c2VSaWdodC5VcGRhdGUobW91c2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW91c2VMZWZ0ID0gbmV3IE1vdXNlQnV0dG9uU3RhdGUoTW91c2VCdXR0b24uTEVGVCwgbW91c2UpO1xyXG4gICAgICAgICAgICAgICAgbW91c2VNaWRkbGUgPSBuZXcgTW91c2VCdXR0b25TdGF0ZShNb3VzZUJ1dHRvbi5NSURETEUsIG1vdXNlKTtcclxuICAgICAgICAgICAgICAgIG1vdXNlUmlnaHQgPSBuZXcgTW91c2VCdXR0b25TdGF0ZShNb3VzZUJ1dHRvbi5SSUdIVCwgbW91c2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobW91c2VMZWZ0Lmp1c3RQcmVzc2VkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBob3ZlcmluZ0VsZW1lbnRNb3VzZURvd24gPSBob3ZlcmluZ0VsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhvdmVyaW5nRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBNb3VzZVBvcyB7IGdldCB7IHJldHVybiBuZXcgVmVjdG9yMihtb3VzZS5YLCBtb3VzZS5ZKTsgfSB9XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgT2xkTW91c2VQb3MgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIob2xkTW91c2UuWCwgb2xkTW91c2UuWSk7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIE1vdXNlRGVsdGEgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RvcjIobW91c2UuWC1vbGRNb3VzZS5YLCBtb3VzZS5ZLW9sZE1vdXNlLlkpOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlTW91c2VIb3ZlcihJUmVhZE9ubHlMaXN0PFVJTW91c2VSZXNwb25kZXI+IGxpc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoaG92ZXJpbmdFbGVtZW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBJZHggPSBsaXN0LkNvdW50IC0gMTsgSWR4ID49IDA7IC0tSWR4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBob3ZlcmluZ0VsZW1lbnQgPSBsaXN0W0lkeF0uR2V0TW91c2VIb3ZlcihNb3VzZVBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaG92ZXJpbmdFbGVtZW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFdhc01vdXNlTGVmdEp1c3RQcmVzc2VkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb3VzZUxlZnQuaXNEb3duICYmIG1vdXNlTGVmdC5kdXJhdGlvbiA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgV2FzTW91c2VMZWZ0SnVzdFJlbGVhc2VkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAhbW91c2VMZWZ0LmlzRG93biAmJiBtb3VzZUxlZnQuZHVyYXRpb24gPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFdhc01vdXNlUmlnaHRKdXN0UHJlc3NlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbW91c2VSaWdodC5pc0Rvd24gJiYgbW91c2VSaWdodC5kdXJhdGlvbiA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgV2FzTW91c2VSaWdodEp1c3RSZWxlYXNlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIW1vdXNlUmlnaHQuaXNEb3duICYmIG1vdXNlUmlnaHQuZHVyYXRpb24gPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFdhc0tleUp1c3RQcmVzc2VkKEtleXMga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGtleWJvYXJkLklzS2V5RG93bihrZXkpICYmICFvbGRLZXlib2FyZC5Jc0tleURvd24oa2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFdhc0tleUp1c3RSZWxlYXNlZChLZXlzIGtleSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAha2V5Ym9hcmQuSXNLZXlEb3duKGtleSkgJiYgb2xkS2V5Ym9hcmQuSXNLZXlEb3duKGtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0tleURvd24oS2V5cyBrZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4ga2V5Ym9hcmQuSXNLZXlEb3duKGtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0tleVVwKEtleXMga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGtleWJvYXJkLklzS2V5VXAoa2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIEdldFBzZXVkb0pveXN0aWNrKEtleXMgdXAsIEtleXMgZG93biwgS2V5cyBsZWZ0LCBLZXlzIHJpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdXBEb3duID0gMC4wZjtcclxuICAgICAgICAgICAgaWYoIGtleWJvYXJkLklzS2V5RG93bih1cCkgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1cERvd24gPSAtMS4wZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKCBrZXlib2FyZC5Jc0tleURvd24oZG93bikgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1cERvd24gPSAxLjBmO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmbG9hdCBsZWZ0UmlnaHQgPSAwLjBmO1xyXG4gICAgICAgICAgICBpZiAoa2V5Ym9hcmQuSXNLZXlEb3duKGxlZnQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UmlnaHQgPSAtMS4wZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChrZXlib2FyZC5Jc0tleURvd24ocmlnaHQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UmlnaHQgPSAxLjBmO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIobGVmdFJpZ2h0LCB1cERvd24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG5cclxubmFtZXNwYWNlIExSQ0VuZ2luZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSlNPTkFycmF5XHJcbiAgICB7XHJcbiAgICAgICAgU3lzdGVtLk9iamVjdFtdIGFycmF5O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEpTT05BcnJheSBlbXB0eSA9IG5ldyBKU09OQXJyYXkobmV3IFN5c3RlbS5PYmplY3RbXSB7IH0pO1xyXG5cclxuICAgICAgICBwdWJsaWMgSlNPTkFycmF5KFN5c3RlbS5PYmplY3RbXSBpbkFycmF5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXJyYXkgPSBpbkFycmF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEpTT05BcnJheShJRW51bWVyYWJsZSBpbkFycmF5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3lzdGVtLk9iamVjdCB1bnVzZWQgPSBudWxsO1xyXG4gICAgICAgICAgICBTeXN0ZW0uT2JqZWN0IHVudXNlZDIgPSBudWxsO1xyXG4gICAgICAgICAgICBpbnQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChTeXN0ZW0uT2JqZWN0IG9iaiBpbiBpbkFycmF5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1bnVzZWQgPSBvYmo7IC8vIHN1cHByZXNzIHdhcm5pbmdzIGFib3V0IHVudXNlZCBvYmpcclxuICAgICAgICAgICAgICAgICsrY291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdW51c2VkMiA9IHVudXNlZDtcclxuICAgICAgICAgICAgdW51c2VkID0gdW51c2VkMjtcclxuXHJcbiAgICAgICAgICAgIGFycmF5ID0gbmV3IFN5c3RlbS5PYmplY3RbY291bnRdO1xyXG4gICAgICAgICAgICBpbnQgaWR4ID0gMDtcclxuICAgICAgICAgICAgZm9yZWFjaCAoU3lzdGVtLk9iamVjdCBvYmogaW4gaW5BcnJheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYXJyYXlbaWR4XSA9IG9iajtcclxuICAgICAgICAgICAgICAgICsraWR4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3lzdGVtLk9iamVjdCB0aGlzW2ludCBrZXldXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gYXJyYXlba2V5XTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBMZW5ndGhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBhcnJheS5MZW5ndGg7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZFRvU2V0KFxyXG5cclxuI2lmIFdJTkRPV1NcclxuICAgICAgICAgICAgRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZW5kaWZcclxuICAgICAgICAgICAgPHN0cmluZywgYm9vbD4gdGhlU2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAoc3RyaW5nIHMgaW4gYXJyYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoZVNldFtzXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBKU09OQXJyYXlfSlNPTlRhYmxlcyBhc0pTT05UYWJsZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBKU09OQXJyYXlfSlNPTlRhYmxlcyhhcnJheS5HZXRFbnVtZXJhdG9yKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEpTT05BcnJheV9KU09OQXJyYXlzIGFzSlNPTkFycmF5cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEpTT05BcnJheV9KU09OQXJyYXlzKGFycmF5LkdldEVudW1lcmF0b3IoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSlNPTkFycmF5RW51bWVyYXRvcjxTdHJpbmc+IGFzU3RyaW5ncygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEpTT05BcnJheUVudW1lcmF0b3I8U3RyaW5nPihhcnJheS5HZXRFbnVtZXJhdG9yKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLlBvaW50IHRvUG9pbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5Qb2ludCh0aGlzLmdldEludCgwKSwgdGhpcy5nZXRJbnQoMSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLlZlY3RvcjIgdG9WZWN0b3IyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuVmVjdG9yMih0aGlzLmdldEZsb2F0KDApLCB0aGlzLmdldEZsb2F0KDEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5WZWN0b3IzIHRvVmVjdG9yMygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLlZlY3RvcjModGhpcy5nZXRGbG9hdCgwKSwgdGhpcy5nZXRGbG9hdCgxKSwgdGhpcy5nZXRGbG9hdCgyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3lzdGVtLk9iamVjdCBnZXRQcm9wZXJ0eShpbnQgaWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5W2lkeF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IGdldEludChpbnQgaWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpKGRvdWJsZSlhcnJheVtpZHhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IGdldEZsb2F0KGludCBpZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KShkb3VibGUpYXJyYXlbaWR4XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgZ2V0RG91YmxlKGludCBpZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGRvdWJsZSlhcnJheVtpZHhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBnZXRTdHJpbmcoaW50IGlkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoc3RyaW5nKWFycmF5W2lkeF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIGdldFN0cmluZyhpbnQgaWR4LCBzdHJpbmcgZGVmYXVsdFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5Lkxlbmd0aCA+IGlkeClcclxuICAgICAgICAgICAgICAgIHJldHVybiAoc3RyaW5nKWFycmF5W2lkeF07XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBnZXRCb29sKGludCBpZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGJvb2wpYXJyYXlbaWR4XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBKU09OQXJyYXkgZ2V0QXJyYXkoaW50IGlkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSlNPTkFycmF5KChTeXN0ZW0uT2JqZWN0W10pYXJyYXlbaWR4XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSlNPTlRhYmxlIGdldEpTT04oaW50IGlkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSlNPTlRhYmxlKChcclxuI2lmIFdJTkRPV1NcclxuICAgICAgICAgICAgRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZW5kaWZcclxuICAgICAgICAgICAgICAgIDxzdHJpbmcsIFN5c3RlbS5PYmplY3Q+KWFycmF5W2lkeF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIHRvU3RyaW5nQXJyYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nW10gcmVzdWx0ID0gbmV3IHN0cmluZ1thcnJheS5MZW5ndGhdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBJZHggPSAwOyBJZHggPCBhcnJheS5MZW5ndGg7ICsrSWR4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbSWR4XSA9IChzdHJpbmcpYXJyYXlbSWR4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nIHJlc3VsdCA9IFwiWyBcIjtcclxuICAgICAgICAgICAgZm9yZWFjaCAoU3lzdGVtLk9iamVjdCB2YWwgaW4gYXJyYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwuR2V0VHlwZSgpID09IHR5cGVvZihzdHJpbmcpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcXCJcIiArIHZhbCArIFwiXFxcIiwgXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXCIgKyB2YWwgKyBcIiwgXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0ICs9IFwiIF1cIjtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEpTT05BcnJheV9KU09OVGFibGVzIDogSlNPTkFycmF5RW51bWVyYXRvcjxKU09OVGFibGU+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEpTT05BcnJheV9KU09OVGFibGVzKElFbnVtZXJhdG9yIGFCYXNlRW51bWVyYXRvcikgOiBiYXNlKGFCYXNlRW51bWVyYXRvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgSlNPTlRhYmxlIEN1cnJlbnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBuZXcgSlNPTlRhYmxlKChcclxuI2lmIFdJTkRPV1NcclxuICAgICAgICAgICAgRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZW5kaWZcclxuICAgICAgICAgICAgICAgIDxzdHJpbmcsIFN5c3RlbS5PYmplY3Q+KWJhc2VFbnVtZXJhdG9yLkN1cnJlbnQpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBKU09OQXJyYXlfSlNPTkFycmF5cyA6IEpTT05BcnJheUVudW1lcmF0b3I8SlNPTkFycmF5PlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBKU09OQXJyYXlfSlNPTkFycmF5cyhJRW51bWVyYXRvciBhQmFzZUVudW1lcmF0b3IpIDogYmFzZShhQmFzZUVudW1lcmF0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIEpTT05BcnJheSBDdXJyZW50XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gbmV3IEpTT05BcnJheSgoU3lzdGVtLk9iamVjdFtdKWJhc2VFbnVtZXJhdG9yLkN1cnJlbnQpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBKU09OQXJyYXlFbnVtZXJhdG9yPFQ+IDogSUVudW1lcmF0b3I8VD5cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgSUVudW1lcmF0b3IgYmFzZUVudW1lcmF0b3I7XHJcblxyXG4gICAgICAgIHB1YmxpYyBKU09OQXJyYXlFbnVtZXJhdG9yKElFbnVtZXJhdG9yIGFCYXNlRW51bWVyYXRvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2VFbnVtZXJhdG9yID0gYUJhc2VFbnVtZXJhdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElFbnVtZXJhdG9yIEdldEVudW1lcmF0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBNb3ZlTmV4dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYmFzZUVudW1lcmF0b3IuTW92ZU5leHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2VFbnVtZXJhdG9yLlJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIElEaXNwb3NhYmxlLkRpc3Bvc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIFQgQ3VycmVudFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIChUKWJhc2VFbnVtZXJhdG9yLkN1cnJlbnQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9iamVjdCBJRW51bWVyYXRvci5DdXJyZW50IHsgZ2V0IHsgcmV0dXJuIEN1cnJlbnQ7IH0gfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBKU09OVGFibGVcclxuICAgIHtcclxuXHJcbiNpZiBXSU5ET1dTXHJcbiAgICAgICAgRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZW5kaWZcclxuICAgICAgICA8c3RyaW5nLCBTeXN0ZW0uT2JqZWN0PiBkaWN0aW9uYXJ5O1xyXG5cclxuICAgICAgICBwdWJsaWMgSlNPTlRhYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpY3Rpb25hcnkgPSBuZXdcclxuI2lmIFdJTkRPV1NcclxuICAgICAgICAgICAgRGljdGlvbmFyeVxyXG4jZWxzZVxyXG4gICAgICAgICAgICBfRGljdGlvbmFyeVxyXG4jZW5kaWZcclxuICAgICAgICAgICAgPHN0cmluZywgU3lzdGVtLk9iamVjdD4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBKU09OVGFibGUoXHJcbiNpZiBXSU5ET1dTXHJcbiAgICAgICAgICAgIERpY3Rpb25hcnlcclxuI2Vsc2VcclxuICAgICAgICAgICAgX0RpY3Rpb25hcnlcclxuI2VuZGlmXHJcbiAgICAgICAgICAgIDxzdHJpbmcsIFN5c3RlbS5PYmplY3Q+IGluRGljdGlvbmFyeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpY3Rpb25hcnkgPSBpbkRpY3Rpb25hcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSlNPTlRhYmxlKHN0cmluZyBmaWxlbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IEJyaWRnZS5IdG1sNS5YTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lk9wZW4oXCJHRVRcIiwgZmlsZW5hbWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmVxdWVzdC5TZW5kKChzdHJpbmcpbnVsbCk7XHJcbiAgICAgICAgICAgIGludCBpZHggPSAwO1xyXG4gICAgICAgICAgICBkaWN0aW9uYXJ5ID0gKF9EaWN0aW9uYXJ5PHN0cmluZywgU3lzdGVtLk9iamVjdD4pcGFyc2VWYWx1ZShyZXF1ZXN0LlJlc3BvbnNlVGV4dCwgcmVmIGlkeCk7XHJcbiAgICAgICAgfVxyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgQ1MwMTA4IC8vIE1lbWJlciBoaWRlcyBpbmhlcml0ZWQgbWVtYmVyOyBtaXNzaW5nIG5ldyBrZXl3b3JkXHJcbiAgICAgICAgcHVibGljIElDb2xsZWN0aW9uPHN0cmluZz4gS2V5c1xyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSBDUzAxMDggLy8gTWVtYmVyIGhpZGVzIGluaGVyaXRlZCBtZW1iZXI7IG1pc3NpbmcgbmV3IGtleXdvcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBkaWN0aW9uYXJ5LktleXM7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIGhhc0tleShzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN5c3RlbS5PYmplY3QgZ2V0UHJvcGVydHkoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeVtuYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTeXN0ZW0uT2JqZWN0IGdldFByb3BlcnR5KHN0cmluZyBuYW1lLCBTeXN0ZW0uT2JqZWN0IGRlZmF1bHRWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnlbbmFtZV07XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IGdldEludChzdHJpbmcgbmFtZSwgaW50IGRlZmF1bHRWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGludCkoZG91YmxlKWRpY3Rpb25hcnlbbmFtZV07IC8vIHZhbHVlcyBhcmUgc3RvcmVkIGluIHRoZSBkaWN0aW9uYXJ5IGFzIGRvdWJsZXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBnZXRGbG9hdChzdHJpbmcgbmFtZSwgZmxvYXQgZGVmYXVsdFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGRpY3Rpb25hcnkuQ29udGFpbnNLZXkobmFtZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZmxvYXQpKGRvdWJsZSlkaWN0aW9uYXJ5W25hbWVdOyAvLyB2YWx1ZXMgYXJlIHN0b3JlZCBpbiB0aGUgZGljdGlvbmFyeSBhcyBkb3VibGVzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlIGdldERvdWJsZShzdHJpbmcgbmFtZSwgZG91YmxlIGRlZmF1bHRWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGRvdWJsZSlkaWN0aW9uYXJ5W25hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBnZXRTdHJpbmcoc3RyaW5nIG5hbWUsIHN0cmluZyBkZWZhdWx0VmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZGljdGlvbmFyeS5Db250YWluc0tleShuYW1lKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChzdHJpbmcpZGljdGlvbmFyeVtuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIGdldEJvb2woc3RyaW5nIG5hbWUsIGJvb2wgZGVmYXVsdFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGRpY3Rpb25hcnkuQ29udGFpbnNLZXkobmFtZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYm9vbClkaWN0aW9uYXJ5W25hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEpTT05BcnJheSBnZXRBcnJheShzdHJpbmcgbmFtZSwgSlNPTkFycmF5IGRlZmF1bHRWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEpTT05BcnJheSgoU3lzdGVtLk9iamVjdFtdKWRpY3Rpb25hcnlbbmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEpTT05UYWJsZSBnZXRKU09OKHN0cmluZyBuYW1lLCBKU09OVGFibGUgZGVmYXVsdFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGRpY3Rpb25hcnkuQ29udGFpbnNLZXkobmFtZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSlNPTlRhYmxlKChfRGljdGlvbmFyeTxzdHJpbmcsIFN5c3RlbS5PYmplY3Q+KWRpY3Rpb25hcnlbbmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIExvZ0Vycm9yKHN0cmluZyBlcnJvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IGdldEludChzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGljdGlvbmFyeS5Db250YWluc0tleShuYW1lKSlcclxuICAgICAgICAgICAgICAgIExvZ0Vycm9yKFwiVGFibGUgaGFzIG5vIGludCBjYWxsZWQgXCIgKyBuYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpKGRvdWJsZSlkaWN0aW9uYXJ5W25hbWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IGdldEZsb2F0KHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpKVxyXG4gICAgICAgICAgICAgICAgTG9nRXJyb3IoXCJUYWJsZSBoYXMgbm8gZmxvYXQgY2FsbGVkIFwiICsgbmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpKGRvdWJsZSlkaWN0aW9uYXJ5W25hbWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBnZXREb3VibGUoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWRpY3Rpb25hcnkuQ29udGFpbnNLZXkobmFtZSkpXHJcbiAgICAgICAgICAgICAgICBMb2dFcnJvcihcIlRhYmxlIGhhcyBubyBkb3VibGUgY2FsbGVkIFwiICsgbmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZG91YmxlKWRpY3Rpb25hcnlbbmFtZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIGdldFN0cmluZyhzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGljdGlvbmFyeS5Db250YWluc0tleShuYW1lKSlcclxuICAgICAgICAgICAgICAgIExvZ0Vycm9yKFwiVGFibGUgaGFzIG5vIHN0cmluZyBjYWxsZWQgXCIgKyBuYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIChzdHJpbmcpZGljdGlvbmFyeVtuYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIGdldFZlY3RvcjIoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBKU09OQXJyYXkgYXJyYXkgPSBnZXRBcnJheShuYW1lKTtcclxuICAgICAgICAgICAgaWYgKGFycmF5Lkxlbmd0aCAhPSAyKVxyXG4gICAgICAgICAgICAgICAgTG9nRXJyb3IoXCJnZXRWZWN0b3IyIC0gYXJyYXkgbGVuZ3RoIGlzIFwiICsgYXJyYXkuTGVuZ3RoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5LnRvVmVjdG9yMigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgZ2V0Qm9vbChzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGljdGlvbmFyeS5Db250YWluc0tleShuYW1lKSlcclxuICAgICAgICAgICAgICAgIExvZ0Vycm9yKFwiVGFibGUgaGFzIG5vIGJvb2wgY2FsbGVkIFwiICsgbmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoYm9vbClkaWN0aW9uYXJ5W25hbWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEpTT05BcnJheSBnZXRBcnJheShzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGljdGlvbmFyeS5Db250YWluc0tleShuYW1lKSlcclxuICAgICAgICAgICAgICAgIExvZ0Vycm9yKFwiVGFibGUgaGFzIG5vIGFycmF5IGNhbGxlZCBcIiArIG5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEpTT05BcnJheSgoU3lzdGVtLk9iamVjdFtdKWRpY3Rpb25hcnlbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEpTT05UYWJsZSBnZXRKU09OKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFkaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KG5hbWUpKVxyXG4gICAgICAgICAgICAgICAgTG9nRXJyb3IoXCJUYWJsZSBoYXMgbm8gc3VidGFibGUgY2FsbGVkIFwiICsgbmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSlNPTlRhYmxlKChfRGljdGlvbmFyeTxzdHJpbmcsIFN5c3RlbS5PYmplY3Q+KWRpY3Rpb25hcnlbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIFN5c3RlbS5PYmplY3QgcGFyc2VWYWx1ZShzdHJpbmcganNvbiwgcmVmIGludCBpZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTa2lwV2hpdGVzcGFjZShqc29uLCByZWYgaWR4KTtcclxuICAgICAgICAgICAgaWYgKGpzb25baWR4XSA9PSAneycpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9EaWN0aW9uYXJ5PHN0cmluZywgU3lzdGVtLk9iamVjdD4gcmVzdWx0ID0gbmV3IF9EaWN0aW9uYXJ5PHN0cmluZywgU3lzdGVtLk9iamVjdD4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgICAgICBTa2lwV2hpdGVzcGFjZShqc29uLCByZWYgaWR4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVybWl0IHRyYWlsaW5nIGNvbW1hcyAtIHtcImZvb1wiOlwiYmFyXCIgLCB9IGlzIGxlZ2FsXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb25baWR4XSA9PSAnfScpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBrZXkgPSAoc3RyaW5nKXBhcnNlVmFsdWUoanNvbiwgcmVmIGlkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgU2tpcFdoaXRlc3BhY2UoanNvbiwgcmVmIGlkeCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uW2lkeF0gIT0gJzonKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0RXJyb3IoanNvbiwgaWR4LCBcIkludmFsaWQga2V5dmFsdWUgc2VwYXJhdG9yOiBcIiArIGpzb25baWR4XSArIFwiIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgICAgICBTeXN0ZW0uT2JqZWN0IHZhbHVlID0gcGFyc2VWYWx1ZShqc29uLCByZWYgaWR4KTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBTa2lwV2hpdGVzcGFjZShqc29uLCByZWYgaWR4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb25baWR4XSA9PSAnfScpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoanNvbltpZHhdICE9ICcsJylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUmVwb3J0RXJyb3IoanNvbiwgaWR4LCBcIkV4cGVjdGVkIGEgY29tbWEsIGdvdDogXCIgKyBqc29uW2lkeF0gKyBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGVybWl0IG1pc3NpbmcgY29tbWFzIC0ge1wiZm9vXCI6MSBcImJhclwiOjEgfSBpcyBsZWdhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZHgtLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoanNvbltpZHhdID09ICdbJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTGlzdDxTeXN0ZW0uT2JqZWN0PiB2YWx1ZXMgPSBuZXcgTGlzdDxTeXN0ZW0uT2JqZWN0PigpO1xyXG4gICAgICAgICAgICAgICAgKytpZHg7XHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2tpcFdoaXRlc3BhY2UoanNvbiwgcmVmIGlkeCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uW2lkeF0gPT0gJ10nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytpZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXMuVG9BcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgU3lzdGVtLk9iamVjdCB2YWx1ZSA9IHBhcnNlVmFsdWUoanNvbiwgcmVmIGlkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgU2tpcFdoaXRlc3BhY2UoanNvbiwgcmVmIGlkeCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5BZGQodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBTa2lwV2hpdGVzcGFjZShqc29uLCByZWYgaWR4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb25baWR4XSA9PSAnLCcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoanNvbltpZHhdICE9ICddJylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlcG9ydEVycm9yKGpzb24sIGlkeCwgXCJFeHBlY3RlZCBhIGNvbW1hLCBnb3Q6IFwiICsganNvbltpZHhdICsgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChqc29uW2lkeF0gPT0gJ1wiJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgKytpZHg7XHJcbiAgICAgICAgICAgICAgICBTdHJpbmcgc3RyaW5nU29GYXIgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaW50IHN0YXJ0SWR4ID0gaWR4O1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGpzb25baWR4XSAhPSAnXCInKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uW2lkeF0gPT0gJ1xcXFwnKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nU29GYXIgKz0ganNvbi5TdWJzdHJpbmcoc3RhcnRJZHgsIGlkeCAtIHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWR4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqc29uW2lkeF0gPT0gJ24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdTb0ZhciArPSAnXFxuJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ1NvRmFyICs9IGpzb25baWR4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydElkeCA9IGlkeCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICsraWR4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKytpZHg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nU29GYXIgKyBqc29uLlN1YnN0cmluZyhzdGFydElkeCwgaWR4IC0gc3RhcnRJZHggLSAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChqc29uW2lkeF0gPT0gJy0nIHx8IGpzb25baWR4XSA+PSAnMCcgJiYganNvbltpZHhdIDw9ICc5JylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYm9vbCBuZWdhdGUgPSAoanNvbltpZHhdID09ICctJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmVnYXRlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICsraWR4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGludCBudW1iZXJTb0ZhciA9IDA7XHJcbiAgICAgICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlclNvRmFyID0gbnVtYmVyU29GYXIgKiAxMCArIGpzb25baWR4XSAtICcwJztcclxuICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdoaWxlIChqc29uW2lkeF0gPj0gJzAnICYmIGpzb25baWR4XSA8PSAnOScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvdWJsZSByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25baWR4XSA9PSAnLicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZmxvYXRpbmcgcG9pbnRcclxuICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW50IGZyYWN0aW9uU29GYXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdWJsZSBkaXZpc29yID0gMS4wZjtcclxuICAgICAgICAgICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhY3Rpb25Tb0ZhciA9IGZyYWN0aW9uU29GYXIgKiAxMCArIGpzb25baWR4XSAtICcwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2aXNvciAqPSAxMC4wZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytpZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChqc29uW2lkeF0gPj0gJzAnICYmIGpzb25baWR4XSA8PSAnOScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBudW1iZXJTb0ZhciArIGZyYWN0aW9uU29GYXIgLyBkaXZpc29yO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bWJlclNvRmFyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZWdhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChqc29uW2lkeF0gPj0gJ2EnICYmIGpzb25baWR4XSA8PSAneicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBzdGFydElkeCA9IGlkeDtcclxuICAgICAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgKytpZHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoanNvbltpZHhdID49ICdhJyAmJiBqc29uW2lkeF0gPD0gJ3onKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmcga2V5d29yZCA9IGpzb24uU3Vic3RyaW5nKHN0YXJ0SWR4LCBpZHggLSBzdGFydElkeCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5d29yZCA9PSBcImZhbHNlXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoa2V5d29yZCA9PSBcInRydWVcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSZXBvcnRFcnJvcihqc29uLCBpZHgsIFwiSW52YWxpZCBqc29uIGtleXdvcmQ6IFwiICsga2V5d29yZCArIFwiIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJlcG9ydEVycm9yKGpzb24sIGlkeCwgXCJJbnZhbGlkIHN5bWJvbDogJ1wiICsganNvbltpZHhdICsgXCInXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIFNraXBXaGl0ZXNwYWNlKHN0cmluZyB0ZXh0LCByZWYgaW50IGlkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0Lkxlbmd0aCA8PSBpZHgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2hhciBjID0gdGV4dFtpZHhdO1xyXG4gICAgICAgICAgICB3aGlsZSAoYyA9PSAnICcgfHwgYyA9PSAnXFx0JyB8fCBjID09ICdcXHInIHx8IGMgPT0gJ1xcbicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICsraWR4O1xyXG4gICAgICAgICAgICAgICAgYyA9IHRleHRbaWR4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGMgPT0gJy8nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dFtpZHggKyAxXSA9PSAnLycpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICsraWR4OyAvLyB0byB0aGUgL1xyXG4gICAgICAgICAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2lkeDsgLy8gdG8gdGhlIGNoYXJhY3RlciBhZnRlciB0aGUgL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gdGV4dFtpZHhdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaWR4IDwgdGV4dC5MZW5ndGggJiYgYyAhPSAnXFxuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0ZXh0W2lkeCArIDFdID09ICcqJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvKiBjb21tZW50ICovXHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHN0YXJ0SWR4ID0gaWR4O1xyXG4gICAgICAgICAgICAgICAgICAgICsraWR4OyAvLyB0byB0aGUgKlxyXG4gICAgICAgICAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2lkeDsgLy8gdG8gdGhlIGNoYXJhY3RlciBhZnRlciB0aGUgKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gdGV4dFtpZHhdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaWR4IDwgdGV4dC5MZW5ndGggJiYgKGMgIT0gJyonIHx8IHRleHRbaWR4ICsgMV0gIT0gJy8nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA9PSB0ZXh0Lkxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlcG9ydEVycm9yKHRleHQsIHN0YXJ0SWR4LCBcIlVudGVybWluYXRlZCAvKiBjb21tZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZHggKz0gMjsgLy8gdG8gdGhlIGNoYXJhY3RlciBhZnRlciB0aGUgKi9cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgU2tpcFdoaXRlc3BhY2UodGV4dCwgcmVmIGlkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgU3RyaW5nIHBhcnNlQ29tbWFuZFdvcmQoc3RyaW5nIHRleHQsIHJlZiBpbnQgaWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2tpcFdoaXRlc3BhY2UodGV4dCwgcmVmIGlkeCk7XHJcbiAgICAgICAgICAgIGlmICgodGV4dFtpZHhdID49ICdhJyAmJiB0ZXh0W2lkeF0gPD0gJ3onKSB8fCAodGV4dFtpZHhdID49ICdBJyAmJiB0ZXh0W2lkeF0gPD0gJ1onKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHN0YXJ0SWR4ID0gaWR4O1xyXG4gICAgICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICArK2lkeDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdoaWxlIChpZHggPCB0ZXh0Lkxlbmd0aCAmJiAoKHRleHRbaWR4XSA+PSAnYScgJiYgdGV4dFtpZHhdIDw9ICd6JykgfHwgKHRleHRbaWR4XSA+PSAnQScgJiYgdGV4dFtpZHhdIDw9ICdaJykpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgd29yZCA9IHRleHQuU3Vic3RyaW5nKHN0YXJ0SWR4LCBpZHggLSBzdGFydElkeCk7XHJcbiAgICAgICAgICAgICAgICBpZiAod29yZCA9PSBcInRydWVcIiB8fCB3b3JkID09IFwiZmFsc2VcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDsgLy8gY2FuJ3QgaGFuZGxlIGtleXdvcmRzIGhlcmVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB3b3JkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIFJlcG9ydEVycm9yKHN0cmluZyBqc29uLCBpbnQgZXJyb3JBdCwgc3RyaW5nIG1lc3NhZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbGluZU51bWJlciA9IDE7XHJcbiAgICAgICAgICAgIGludCBsaW5lU3RhcnRJZHggPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpZHggPSAwOyBpZHggPD0gZXJyb3JBdDsgKytpZHgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uW2lkeF0gPT0gJ1xcbicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgKytsaW5lTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVTdGFydElkeCA9IGlkeCArIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0cmluZyBsaW5lVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGVuZElkeCA9IGVycm9yQXQgKyAxOyBlbmRJZHggPCBqc29uLkxlbmd0aDsgKytlbmRJZHgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uW2VuZElkeF0gPT0gJ1xcbicgfHwganNvbltlbmRJZHhdID09ICdcXHInKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVUZXh0ID0ganNvbi5TdWJzdHJpbmcobGluZVN0YXJ0SWR4LCBlbmRJZHggLSBsaW5lU3RhcnRJZHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBMb2dFcnJvcihcIkpTT04gZXJyb3IgYXQgbGluZSBcIiArIGxpbmVOdW1iZXIgKyBcIiAtIFwiICsgbGluZVRleHQgKyBcIlxcblwiICsgbWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cmluZyByZXN1bHQgPSBcInsgXCI7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHN0cmluZyBrZXkgaW4gZGljdGlvbmFyeS5LZXlzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTeXN0ZW0uT2JqZWN0IHZhbCA9IGRpY3Rpb25hcnlba2V5XTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwuR2V0VHlwZSgpID09IHR5cGVvZihzdHJpbmcpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcXCJcIiArIGtleSArIFwiXFxcIjpcXFwiXCIgKyB2YWwgKyBcIlxcXCIsXFxuXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxcIlwiICsga2V5ICsgXCJcXFwiOlwiICsgdmFsICsgXCIsXFxuXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0ICs9IFwifVwiO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKHN0cmluZyBrZXksIFN5c3RlbS5PYmplY3QgdmFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGljdGlvbmFyeVtrZXldID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIExSQ0VuZ2luZVxyXG57XHJcbiAgICBwdWJsaWMgZW51bSBSb3RhdGlvbjkwXHJcbiAgICB7XHJcbiAgICAgICAgTm9uZSxcclxuICAgICAgICBSb3Q5MCxcclxuICAgICAgICBSb3QxODAsXHJcbiAgICAgICAgUm90MjcwXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gVGV4dEFsaWdubWVudFxyXG4gICAge1xyXG4gICAgICAgIExFRlQsXHJcbiAgICAgICAgQ0VOVEVSLFxyXG4gICAgICAgIFJJR0hULFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgTFJDRW5naW5lRXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRG90UHJvZHVjdCh0aGlzIFZlY3RvcjIgYSwgVmVjdG9yMiBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuWCAqIGIuWCArIGEuWSAqIGIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgYSB2ZWN0b3IgdG8gYW4gYW5nbGUuIER1ZSByaWdodCAoVmVjdG9yMigxLDApKSBpcyBhdCAwLjBmLCBhbmQgdGhlIGFuZ2xlcyBjb250aW51ZSBjbG9ja3dpc2UuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBUb0FuZ2xlKHRoaXMgVmVjdG9yMiBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgbGVuID0gYS5MZW5ndGgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsZW4gPCAwLjAwMWYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMiBkaXIgPSBhIC8gbGVuO1xyXG5cclxuICAgICAgICAgICAgICAgIGZsb2F0IHJlc3VsdCA9IChmbG9hdClNYXRoLkFzaW4oZGlyLlkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGEuWCA8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gKGZsb2F0KShNYXRoLlBJLXJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgQ29udGFpbnModGhpcyBSZWN0YW5nbGUgcmVjdCwgVmVjdG9yMiBwb3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjdC5Db250YWlucyhuZXcgUG9pbnQoKGludClwb3MuWCwgKGludClwb3MuWSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyIFhZKHRoaXMgUmVjdGFuZ2xlIHJlY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIocmVjdC5YLCByZWN0LlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERyYXcodGhpcyBTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgUmljaEltYWdlIGltYWdlLCBSZWN0YW5nbGUgcmVjdCwgQ29sb3IgY29sKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW1hZ2UuRHJhdyhzcHJpdGVCYXRjaCwgcmVjdCwgY29sKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTXVsdGlwbHkodGhpcyBDb2xvciBjb2wxLCBDb2xvciBjb2wyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihjb2wxLlIgKiBjb2wyLlIgKiAoMSAvIDY1NTM2LjBmKSwgY29sMS5HICogY29sMi5HICogKDEgLyA2NTUzNi4wZiksIGNvbDEuQiAqIGNvbDIuQiAqICgxIC8gNjU1MzYuMGYpLCBjb2wxLkEgKiBjb2wyLkEgKiAoMSAvIDY1NTM2LjBmKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjIgU2l6ZSh0aGlzIFRleHR1cmUyRCB0ZXh0dXJlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHRleHR1cmUuV2lkdGgsIHRleHR1cmUuSGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IGhleFRvSW50KHRoaXMgU3RyaW5nIHN0cilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCByZXN1bHQgPSAwO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChjaGFyIGMgaW4gc3RyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYyA+PSAnYScgJiYgYyA8PSAnZicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gKGMgLSAnYScpICsgMTAgKyByZXN1bHQgKiAxNjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGMgPj0gJ0EnICYmIGMgPD0gJ0YnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IChjIC0gJ0EnKSArIDEwICsgcmVzdWx0ICogMTY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjID49ICcwJyAmJiBjIDw9ICc5JylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAoYyAtICcwJykgKyByZXN1bHQgKiAxNjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciB0b0NvbG9yKHRoaXMgU3RyaW5nIHN0cilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChzdHIuTGVuZ3RoID09IDYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3Ioc3RyLlN1YnN0cmluZygwLCAyKS5oZXhUb0ludCgpLCBzdHIuU3Vic3RyaW5nKDIsIDIpLmhleFRvSW50KCksIHN0ci5TdWJzdHJpbmcoNCwgMikuaGV4VG9JbnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc3RyLkxlbmd0aCA9PSA4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKHN0ci5TdWJzdHJpbmcoMCwgMikuaGV4VG9JbnQoKSwgc3RyLlN1YnN0cmluZygyLCAyKS5oZXhUb0ludCgpLCBzdHIuU3Vic3RyaW5nKDQsIDIpLmhleFRvSW50KCksIHN0ci5TdWJzdHJpbmcoNiwgMikuaGV4VG9JbnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIENvbG9yLldoaXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgdG9JbnQodGhpcyBSb3RhdGlvbjkwIHJvdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocm90KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFJvdGF0aW9uOTAuUm90OTA6IHJldHVybiA5MDtcclxuICAgICAgICAgICAgICAgIGNhc2UgUm90YXRpb245MC5Sb3QxODA6IHJldHVybiAxODA7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFJvdGF0aW9uOTAuUm90MjcwOiByZXR1cm4gMjcwO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUm90YXRpb245MCBnZXRSb3RhdGlvbih0aGlzIEpTT05UYWJsZSB0YWJsZSwgc3RyaW5nIG5hbWUsIFJvdGF0aW9uOTAgZGVmYXVsdFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGFuZ2xlID0gdGFibGUuZ2V0SW50KG5hbWUsIGRlZmF1bHRWYWx1ZS50b0ludCgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIChSb3RhdGlvbjkwKShhbmdsZSAvIDkwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUm90YXRpb245MCByb3RhdGVCeSh0aGlzIFJvdGF0aW9uOTAgcm90YXRpb24sIFJvdGF0aW9uOTAgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbmV3Um90YXRpb24gPSAocm90YXRpb24udG9JbnQoKSArIG90aGVyLnRvSW50KCkpICUgMzYwO1xyXG4gICAgICAgICAgICByZXR1cm4gKFJvdGF0aW9uOTApKG5ld1JvdGF0aW9uIC8gOTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBSb3RhdGlvbjkwIGludmVydCh0aGlzIFJvdGF0aW9uOTAgcm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbmV3Um90YXRpb24gPSAzNjAgLSByb3RhdGlvbi50b0ludCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gKFJvdGF0aW9uOTApKG5ld1JvdGF0aW9uIC8gOTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERyYXdTdHJpbmcodGhpcyBTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgU3ByaXRlRm9udCBmb250LCBzdHJpbmcgdGV4dCwgVmVjdG9yMiBwb3NpdGlvbiwgVGV4dEFsaWdubWVudCBhbGlnbm1lbnQsIENvbG9yIGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChhbGlnbm1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGV4dEFsaWdubWVudC5MRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXdTdHJpbmcoZm9udCwgdGV4dCwgcG9zaXRpb24sIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVGV4dEFsaWdubWVudC5SSUdIVDpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZlY3RvcjIgc2l6ZSA9IGZvbnQuTWVhc3VyZVN0cmluZyh0ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhd1N0cmluZyhmb250LCB0ZXh0LCBuZXcgVmVjdG9yMigoaW50KShwb3NpdGlvbi5YIC0gc2l6ZS5YKSwgcG9zaXRpb24uWSksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRleHRBbGlnbm1lbnQuQ0VOVEVSOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmVjdG9yMiBzaXplID0gZm9udC5NZWFzdXJlU3RyaW5nKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3U3RyaW5nKGZvbnQsIHRleHQsIG5ldyBWZWN0b3IyKChpbnQpKHBvc2l0aW9uLlggLSBzaXplLlggLyAyKSwgcG9zaXRpb24uWSksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEluc2VydExpbmVCcmVha3ModGhpcyBzdHJpbmcgcmF3VGV4dCwgU3ByaXRlRm9udCBmb250LCBpbnQgbGluZVdpZHRoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgc3BhY2VXaWR0aCA9IGZvbnQuTWVhc3VyZVN0cmluZyhcIiBcIikuWDtcclxuICAgICAgICAgICAgZmxvYXQgeCA9IDA7XHJcbiAgICAgICAgICAgIGludCB3b3JkU3RhcnRJZHggPSAwO1xyXG4gICAgICAgICAgICBzdHJpbmcgcmVzdWx0ID0gXCJcIjtcclxuICAgICAgICAgICAgc3RyaW5nIGxhc3RTcGxpdCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZsb2F0IGxhc3RTcGxpdFdpZHRoID0gMDtcclxuICAgICAgICAgICAgZm9yKGludCBJZHggPSAwOyBJZHggPD0gcmF3VGV4dC5MZW5ndGg7ICsrSWR4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihJZHggPT0gcmF3VGV4dC5MZW5ndGggfHwgcmF3VGV4dFtJZHhdID09ICcgJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgd29yZCA9IHJhd1RleHQuU3Vic3RyaW5nKHdvcmRTdGFydElkeCwgSWR4IC0gd29yZFN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCB3b3JkV2lkdGggPSBmb250Lk1lYXN1cmVTdHJpbmcod29yZCkuWDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCArIGxhc3RTcGxpdFdpZHRoICsgd29yZFdpZHRoID4gbGluZVdpZHRoKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gbGFzdFNwbGl0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ICs9IGxhc3RTcGxpdFdpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElkeCA8IHJhd1RleHQuTGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U3BsaXQgPSBcIlwiICsgcmF3VGV4dFtJZHhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNwbGl0V2lkdGggPSBmb250Lk1lYXN1cmVTdHJpbmcobGFzdFNwbGl0KS5YO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB3b3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIHggKz0gd29yZFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmRTdGFydElkeCA9IElkeCArIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyYXdUZXh0W0lkeF0gPT0gJ1xcbicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRHJhd0JlYW0odGhpcyBTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgVGV4dHVyZTJEIHRleHR1cmUsIFZlY3RvcjIgc3RhcnQsIFZlY3RvcjIgZW5kLCBpbnQgdGhpY2tuZXNzLCBDb2xvciBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgb2Zmc2V0ID0gZW5kIC0gc3RhcnQ7XHJcbiAgICAgICAgICAgIGZsb2F0IGJlYW1Sb3RhdGlvbiA9IG9mZnNldC5Ub0FuZ2xlKCk7XHJcbiAgICAgICAgICAgIFJlY3RhbmdsZSBiZWFtUmVjdCA9IG5ldyBSZWN0YW5nbGUoKGludClzdGFydC5YLCAoaW50KXN0YXJ0LlksIChpbnQpb2Zmc2V0Lkxlbmd0aCgpLCB0aGlja25lc3MpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIGJlYW1SZWN0LCBudWxsLCBjb2xvciwgYmVhbVJvdGF0aW9uLCBuZXcgVmVjdG9yMigwLCB0ZXh0dXJlLkhlaWdodC8yKSwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwLjBmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUmVjdGFuZ2xlIEdldFN0cmluZ0JvdW5kcyh0aGlzIFNwcml0ZUZvbnQgZm9udCwgc3RyaW5nIHRleHQsIFZlY3RvcjIgcG9zaXRpb24sIFRleHRBbGlnbm1lbnQgYWxpZ25tZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMiBzaXplID0gZm9udC5NZWFzdXJlU3RyaW5nKHRleHQpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGFsaWdubWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0QWxpZ25tZW50LkxFRlQ6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKChpbnQpcG9zaXRpb24uWCwgKGludClwb3NpdGlvbi5ZLCAoaW50KXNpemUuWCwgKGludClzaXplLlkpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0QWxpZ25tZW50LlJJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKChpbnQpKHBvc2l0aW9uLlggLSBzaXplLlgpLCAoaW50KXBvc2l0aW9uLlksIChpbnQpc2l6ZS5YLCAoaW50KXNpemUuWSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRleHRBbGlnbm1lbnQuQ0VOVEVSOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKChpbnQpKHBvc2l0aW9uLlggLSBzaXplLlgqMC41ZiksIChpbnQpcG9zaXRpb24uWSwgKGludClzaXplLlgsIChpbnQpc2l6ZS5ZKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBSZWN0YW5nbGUgQmxvYXQodGhpcyBSZWN0YW5nbGUgcmVjdCwgaW50IGFtb3VudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHJlY3QuWCAtIGFtb3VudCwgcmVjdC5ZIC0gYW1vdW50LCByZWN0LldpZHRoICsgYW1vdW50ICogMiwgcmVjdC5IZWlnaHQgKyBhbW91bnQgKiAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUmVjdGFuZ2xlIEZpeE5lZ2F0aXZlcyh0aGlzIFJlY3RhbmdsZSByZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICBNYXRoLk1pbihyZWN0LlgsIHJlY3QuWCArIHJlY3QuV2lkdGgpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5NaW4ocmVjdC5ZLCByZWN0LlkgKyByZWN0LkhlaWdodCksXHJcbiAgICAgICAgICAgICAgICBNYXRoLkFicyhyZWN0LldpZHRoKSxcclxuICAgICAgICAgICAgICAgIE1hdGguQWJzKHJlY3QuSGVpZ2h0KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuQ29udGVudDtcclxuXHJcbm5hbWVzcGFjZSBMUkNFbmdpbmVcclxue1xyXG4gICAgaW50ZXJmYWNlIElEcmF3TW9kZVxyXG4gICAge1xyXG4gICAgICAgIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgUmVjdGFuZ2xlIHJlY3QsIFRleHR1cmUyRCB0ZXh0dXJlLCBDb2xvciBjb2xvciwgUm90YXRpb245MCByb3RhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRHJhd01vZGVfRml4ZWQgOiBJRHJhd01vZGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBSZWN0YW5nbGUgcmVjdCwgVGV4dHVyZTJEIHRleHR1cmUsIENvbG9yIGNvbG9yLCBSb3RhdGlvbjkwIHJvdGF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgVmVjdG9yMihyZWN0LkxlZnQsIHJlY3QuVG9wKSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEcmF3TW9kZV9GaXR0ZWQgOiBJRHJhd01vZGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBSZWN0YW5nbGUgcmVjdCwgVGV4dHVyZTJEIHRleHR1cmUsIENvbG9yIGNvbG9yLCBSb3RhdGlvbjkwIHJvdGF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdGV4dHVyZUFzcGVjdCA9IHRleHR1cmUuV2lkdGggLyAoZmxvYXQpdGV4dHVyZS5IZWlnaHQ7XHJcbiAgICAgICAgICAgIGZsb2F0IHJlY3RBc3BlY3QgPSByZWN0LldpZHRoIC8gKGZsb2F0KXJlY3QuSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgZmxvYXQgc2NhbGU7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0dXJlQXNwZWN0ID4gcmVjdEFzcGVjdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gZml0IHdpZHRoXHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IHJlY3QuV2lkdGggLyAoZmxvYXQpdGV4dHVyZS5XaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gcmVjdC5IZWlnaHQgLyAoZmxvYXQpdGV4dHVyZS5IZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFJlY3RhbmdsZSBkcmF3UmVjdCA9IG5ldyBSZWN0YW5nbGUoKGludCkocmVjdC5YICsgMC41ZioocmVjdC5XaWR0aCAtIHRleHR1cmUuV2lkdGgqc2NhbGUpKSwgKGludCkocmVjdC5ZICsgMC41ZioocmVjdC5IZWlnaHQgLSB0ZXh0dXJlLkhlaWdodCpzY2FsZSkpLCAoaW50KSh0ZXh0dXJlLldpZHRoKnNjYWxlKSwgKGludCkodGV4dHVyZS5IZWlnaHQqc2NhbGUpKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBkcmF3UmVjdCwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEcmF3TW9kZV9TdHJldGNoZWQ6IElEcmF3TW9kZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFJlY3RhbmdsZSByZWN0LCBUZXh0dXJlMkQgdGV4dHVyZSwgQ29sb3IgY29sb3IsIFJvdGF0aW9uOTAgcm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCByb3QgPSAwLjBmO1xyXG4gICAgICAgICAgICBpbnQgcm90V2lkdGggPSByZWN0LldpZHRoO1xyXG4gICAgICAgICAgICBpbnQgcm90SGVpZ2h0ID0gcmVjdC5IZWlnaHQ7XHJcbiAgICAgICAgICAgIGlmIChyb3RhdGlvbiA9PSBSb3RhdGlvbjkwLk5vbmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgcmVjdCwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocm90YXRpb24gPT0gUm90YXRpb245MC5Sb3Q5MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm90ID0gKGZsb2F0KShNYXRoLlBJICogMC41KTtcclxuICAgICAgICAgICAgICAgIHJvdFdpZHRoID0gcmVjdC5IZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICByb3RIZWlnaHQgPSByZWN0LldpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJvdGF0aW9uID09IFJvdGF0aW9uOTAuUm90MTgwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3QgPSAoZmxvYXQpTWF0aC5QSTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChyb3RhdGlvbiA9PSBSb3RhdGlvbjkwLlJvdDI3MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm90ID0gKGZsb2F0KShNYXRoLlBJICogMS41KTtcclxuICAgICAgICAgICAgICAgIHJvdFdpZHRoID0gcmVjdC5IZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICByb3RIZWlnaHQgPSByZWN0LldpZHRoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnQgaGFsZldpZHRoID0gcmVjdC5XaWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGludCBoYWxmSGVpZ2h0ID0gcmVjdC5IZWlnaHQgLyAyO1xyXG5cclxuICAgICAgICAgICAgUmVjdGFuZ2xlIHJvdFJlY3QgPSBuZXcgUmVjdGFuZ2xlKChpbnQpKHJlY3QuWCArIGhhbGZXaWR0aCksIChpbnQpKHJlY3QuWSArIGhhbGZIZWlnaHQpLCByb3RXaWR0aCwgcm90SGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9yaWdpbiB3b3VsZCBiZSA8dGV4dHVyZS5XaWR0aC8yLCB0ZXh0dXJlLkhlaWdodC8yPiwgaWYgaGFsZldpZHRoIGFuZCBoYWxmSGVpZ2h0IHdlcmVuJ3Qgcm91bmRlZFxyXG4gICAgICAgICAgICBWZWN0b3IyIG9yaWdpbiA9IG5ldyBWZWN0b3IyKHRleHR1cmUuV2lkdGggKiAoaGFsZldpZHRoIC8gKGZsb2F0KXJlY3QuV2lkdGgpLCB0ZXh0dXJlLkhlaWdodCAqIChoYWxmSGVpZ2h0LyhmbG9hdClyZWN0LkhlaWdodCkpO1xyXG5cclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCByb3RSZWN0LCBudWxsLCBjb2xvciwgcm90LCBvcmlnaW4sIFNwcml0ZUVmZmVjdHMuTm9uZSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xhc3MgRHJhd01vZGVfVGlsZWQgOiBJRHJhd01vZGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBSZWN0YW5nbGUgcmVjdCwgVGV4dHVyZTJEIHRleHR1cmUsIENvbG9yIGNvbG9yLCBSb3RhdGlvbjkwIHJvdGF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgWCA9IHJlY3QuWDsgWCA8IHJlY3QuWCArIHJlY3QuV2lkdGg7IFggKz0gdGV4dHVyZS5XaWR0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgWSA9IHJlY3QuWTsgWSA8IHJlY3QuWSArIHJlY3QuSGVpZ2h0OyBZICs9IHRleHR1cmUuSGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgbmV3IFZlY3RvcjIoWCwgWSksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xhc3MgRHJhd01vZGVfU3RyZXRjaDlHcmlkIDogSURyYXdNb2RlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgUmVjdGFuZ2xlIHJlY3QsIFRleHR1cmUyRCB0ZXh0dXJlLCBDb2xvciBjb2xvciwgUm90YXRpb245MCByb3RhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBub25TdHJldGNoV2lkdGggPSB0ZXh0dXJlLldpZHRoIC8gMjtcclxuICAgICAgICAgICAgaW50IG5vblN0cmV0Y2hIZWlnaHQgPSB0ZXh0dXJlLkhlaWdodCAvIDI7XHJcblxyXG4gICAgICAgICAgICBpbnQgdGV4TWlkZGxlV2lkdGggPSB0ZXh0dXJlLldpZHRoIC0gbm9uU3RyZXRjaFdpZHRoICogMjtcclxuICAgICAgICAgICAgaW50IHRleE1pZGRsZUhlaWdodCA9IHRleHR1cmUuSGVpZ2h0IC0gbm9uU3RyZXRjaEhlaWdodCAqIDI7XHJcbiAgICAgICAgICAgIGludCB0ZXhSaWdodEVkZ2VYID0gdGV4dHVyZS5XaWR0aCAtIG5vblN0cmV0Y2hXaWR0aDtcclxuICAgICAgICAgICAgaW50IHRleEJvdHRvbUVkZ2VZID0gdGV4dHVyZS5IZWlnaHQgLSBub25TdHJldGNoSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaW50IHNjcmVlbk1pZGRsZVdpZHRoID0gcmVjdC5XaWR0aCAtIG5vblN0cmV0Y2hXaWR0aCAqIDI7XHJcbiAgICAgICAgICAgIGludCBzY3JlZW5NaWRkbGVIZWlnaHQgPSByZWN0LkhlaWdodCAtIG5vblN0cmV0Y2hIZWlnaHQgKiAyO1xyXG4gICAgICAgICAgICBpbnQgcmlnaHRFZGdlWCA9IHJlY3QuWCArIHJlY3QuV2lkdGggLSBub25TdHJldGNoV2lkdGg7XHJcbiAgICAgICAgICAgIGludCBib3R0b21FZGdlWSA9IHJlY3QuWSArIHJlY3QuSGVpZ2h0IC0gbm9uU3RyZXRjaEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIC8vIFRMLCB0b3AsIFRSXHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUocmVjdC5YLCAgIHJlY3QuWSwgbm9uU3RyZXRjaFdpZHRoLCBub25TdHJldGNoSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUoMCwgICAgICAgIDAsICAgICAgbm9uU3RyZXRjaFdpZHRoLCBub25TdHJldGNoSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIGNvbG9yKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShyZWN0LlgrIG5vblN0cmV0Y2hXaWR0aCwgIHJlY3QuWSwgc2NyZWVuTWlkZGxlV2lkdGgsIG5vblN0cmV0Y2hIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShub25TdHJldGNoV2lkdGgsICAgICAgICAgIDAsICAgICAgdGV4TWlkZGxlV2lkdGgsIG5vblN0cmV0Y2hIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgY29sb3IpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKHJpZ2h0RWRnZVgsICAgICAgIHJlY3QuWSwgbm9uU3RyZXRjaFdpZHRoLCBub25TdHJldGNoSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUodGV4UmlnaHRFZGdlWCwgICAgMCwgICAgICBub25TdHJldGNoV2lkdGgsIG5vblN0cmV0Y2hIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgLy8gbGVmdCwgY2VudGVyLCByaWdodFxyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKHJlY3QuWCwgICByZWN0LlkrIG5vblN0cmV0Y2hIZWlnaHQsICAgbm9uU3RyZXRjaFdpZHRoLCBzY3JlZW5NaWRkbGVIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZSgwLCAgICAgICAgbm9uU3RyZXRjaEhlaWdodCwgICAgICAgICAgIG5vblN0cmV0Y2hXaWR0aCwgdGV4TWlkZGxlSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIGNvbG9yKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShyZWN0LlgrIG5vblN0cmV0Y2hXaWR0aCwgIHJlY3QuWSsgbm9uU3RyZXRjaEhlaWdodCwgICBzY3JlZW5NaWRkbGVXaWR0aCwgc2NyZWVuTWlkZGxlSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUobm9uU3RyZXRjaFdpZHRoLCAgICAgICAgICBub25TdHJldGNoSGVpZ2h0LCAgICAgICAgICAgdGV4TWlkZGxlV2lkdGgsIHRleE1pZGRsZUhlaWdodCksXHJcbiAgICAgICAgICAgICAgICBjb2xvcik7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUocmlnaHRFZGdlWCwgICAgICAgcmVjdC5ZKyBub25TdHJldGNoSGVpZ2h0LCAgIG5vblN0cmV0Y2hXaWR0aCwgc2NyZWVuTWlkZGxlSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUodGV4UmlnaHRFZGdlWCwgICAgbm9uU3RyZXRjaEhlaWdodCwgICAgICAgICAgIG5vblN0cmV0Y2hXaWR0aCwgdGV4TWlkZGxlSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJMLCBib3R0b20sIEJSXHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUocmVjdC5YLCAgIGJvdHRvbUVkZ2VZLCAgICBub25TdHJldGNoV2lkdGgsIG5vblN0cmV0Y2hIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZSgwLCAgICAgICAgdGV4Qm90dG9tRWRnZVksIG5vblN0cmV0Y2hXaWR0aCwgbm9uU3RyZXRjaEhlaWdodCksXHJcbiAgICAgICAgICAgICAgICBjb2xvcik7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUocmVjdC5YKyBub25TdHJldGNoV2lkdGgsICAgIGJvdHRvbUVkZ2VZLCAgICAgIHNjcmVlbk1pZGRsZVdpZHRoLCBub25TdHJldGNoSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUobm9uU3RyZXRjaFdpZHRoLCAgICAgICAgICAgIHRleEJvdHRvbUVkZ2VZLCAgIHRleE1pZGRsZVdpZHRoLCBub25TdHJldGNoSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIGNvbG9yKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShyaWdodEVkZ2VYLCAgICAgICBib3R0b21FZGdlWSwgICAgbm9uU3RyZXRjaFdpZHRoLCBub25TdHJldGNoSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUodGV4UmlnaHRFZGdlWCwgICAgdGV4Qm90dG9tRWRnZVksIG5vblN0cmV0Y2hXaWR0aCwgbm9uU3RyZXRjaEhlaWdodCksXHJcbiAgICAgICAgICAgICAgICBjb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERyYXdNb2RlX1RpbGVkOUdyaWQgOiBJRHJhd01vZGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBSZWN0YW5nbGUgcmVjdCwgVGV4dHVyZTJEIHRleHR1cmUsIENvbG9yIGNvbG9yLCBSb3RhdGlvbjkwIHJvdGF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gbWFuLCB0aGlzIGlzIGZpZGRseVxyXG4gICAgICAgICAgICBpbnQgZnJhZ21lbnRXID0gdGV4dHVyZS5XaWR0aCAvIDQ7XHJcbiAgICAgICAgICAgIGludCBmcmFnbWVudEggPSB0ZXh0dXJlLkhlaWdodCAvIDQ7XHJcbiAgICAgICAgICAgIGludCByaWdodEVkZ2VYID0gcmVjdC5YICsgcmVjdC5XaWR0aCAtIGZyYWdtZW50VztcclxuICAgICAgICAgICAgaW50IGJvdHRvbUVkZ2VZID0gcmVjdC5ZICsgcmVjdC5IZWlnaHQgLSBmcmFnbWVudEg7XHJcbiAgICAgICAgICAgIGludCBYO1xyXG4gICAgICAgICAgICBpbnQgWSA9IHJlY3QuWSArIGZyYWdtZW50SDtcclxuICAgICAgICAgICAgZm9yIChYID0gcmVjdC5YICsgZnJhZ21lbnRXOyBYIDw9IHJlY3QuWCArIHJlY3QuV2lkdGggLSBmcmFnbWVudFcgKiAzOyBYICs9IGZyYWdtZW50VyAqIDIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIHRvcFxyXG4gICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKFgsIHJlY3QuWSwgZnJhZ21lbnRXICogMiwgZnJhZ21lbnRIKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKGZyYWdtZW50VywgMCwgZnJhZ21lbnRXICogMiwgZnJhZ21lbnRIKSwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgLy8gbWlkZGxlc1xyXG4gICAgICAgICAgICAgICAgZm9yIChZID0gcmVjdC5ZICsgZnJhZ21lbnRIOyBZIDw9IHJlY3QuWSArIHJlY3QuSGVpZ2h0IC0gZnJhZ21lbnRIKjM7IFkgKz0gZnJhZ21lbnRIICogMilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUoWCxZLGZyYWdtZW50VyoyLCBmcmFnbWVudEgqMiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUoZnJhZ21lbnRXLCBmcmFnbWVudEgsIGZyYWdtZW50VyoyLCBmcmFnbWVudEgqMiksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGJvdHRvbSBnYXAtZmlsbFxyXG4gICAgICAgICAgICAgICAgaWYgKFkgPCBib3R0b21FZGdlWSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgZmlsbFkgPSBib3R0b21FZGdlWSAtIFk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKFgsIFksIGZyYWdtZW50VyAqIDIsIGZpbGxZKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShmcmFnbWVudFcsIGZyYWdtZW50SCwgZnJhZ21lbnRXICogMiwgZmlsbFkpLCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBib3R0b21cclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgbmV3IFJlY3RhbmdsZShYLCBib3R0b21FZGdlWSwgZnJhZ21lbnRXICogMiwgZnJhZ21lbnRIKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKGZyYWdtZW50VywgZnJhZ21lbnRIKjMsIGZyYWdtZW50VyAqIDIsIGZyYWdtZW50SCksIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW50IGZpbmFsWCA9IFg7XHJcbiAgICAgICAgICAgIGludCBmaW5hbFkgPSBZO1xyXG4gICAgICAgICAgICBpbnQgZmlsbFcgPSByaWdodEVkZ2VYIC0gZmluYWxYO1xyXG4gICAgICAgICAgICBpbnQgZmlsbEggPSBib3R0b21FZGdlWSAtIGZpbmFsWTtcclxuXHJcbiAgICAgICAgICAgIC8vIGJvdHRvbS1yaWdodCBjb3JuZXIgZ2FwIGZpbGxcclxuICAgICAgICAgICAgaWYgKGZpbGxXID4gMCAmJiBmaWxsSCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgbmV3IFJlY3RhbmdsZShmaW5hbFgsIGZpbmFsWSwgZmlsbFcsIGZpbGxIKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKGZyYWdtZW50VywgZnJhZ21lbnRILCBmaWxsVywgZmlsbEgpLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGVkZ2UgZ2FwIGZpbGxcclxuICAgICAgICAgICAgaWYgKGZpbGxXID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gdG9wXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUoZmluYWxYLCByZWN0LlksIGZpbGxXLCBmcmFnbWVudEgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUoZnJhZ21lbnRXLCAwLCBmaWxsVywgZnJhZ21lbnRIKSwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgLy8gYm90dG9tXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUoZmluYWxYLCBib3R0b21FZGdlWSwgZmlsbFcsIGZyYWdtZW50SCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShmcmFnbWVudFcsIGZyYWdtZW50SCAqIDMsIGZpbGxXLCBmcmFnbWVudEgpLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGZpbGxIID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gbGVmdFxyXG4gICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKHJlY3QuWCwgZmluYWxZLCBmcmFnbWVudFcsIGZpbGxIKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKDAsIGZyYWdtZW50SCwgZnJhZ21lbnRXLCBmaWxsSCksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0IFxyXG4gICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKHJpZ2h0RWRnZVgsIGZpbmFsWSwgZnJhZ21lbnRXLCBmaWxsSCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZShmcmFnbWVudFcqMywgZnJhZ21lbnRILCBmcmFnbWVudFcsIGZpbGxIKSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKFkgPSByZWN0LlkgKyBmcmFnbWVudEg7IFkgPD0gcmVjdC5ZICsgcmVjdC5IZWlnaHQgLSBmcmFnbWVudEggKiAzOyBZICs9IGZyYWdtZW50SCAqIDIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGxlZnRcclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgbmV3IFJlY3RhbmdsZShyZWN0LlgsIFksIGZyYWdtZW50VywgZnJhZ21lbnRIICogMiksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlY3RhbmdsZSgwLCBmcmFnbWVudEgsIGZyYWdtZW50VywgZnJhZ21lbnRIICogMiksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUocmlnaHRFZGdlWCwgWSwgZnJhZ21lbnRXLCBmcmFnbWVudEggKiAyKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKGZyYWdtZW50VyozLCBmcmFnbWVudEgsIGZyYWdtZW50VywgZnJhZ21lbnRIICogMiksIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0IGdhcC1maWxsXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUoZmluYWxYLCBZLCBmaWxsVywgZnJhZ21lbnRIKjIpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUoZnJhZ21lbnRXLCBmcmFnbWVudEgsIGZpbGxXLCBmcmFnbWVudEgqMiksIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKHJlY3QuWCwgcmVjdC5ZLCBmcmFnbWVudFcsIGZyYWdtZW50SCksXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKDAsIDAsIGZyYWdtZW50VywgZnJhZ21lbnRIKSwgY29sb3IpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUocmlnaHRFZGdlWCwgYm90dG9tRWRnZVksIGZyYWdtZW50VywgZnJhZ21lbnRIKSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUoZnJhZ21lbnRXKjMsIGZyYWdtZW50SCozLCBmcmFnbWVudFcsIGZyYWdtZW50SCksIGNvbG9yKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKHJlY3QuWCwgYm90dG9tRWRnZVksIGZyYWdtZW50VywgZnJhZ21lbnRIKSxcclxuICAgICAgICAgICAgICAgIG5ldyBSZWN0YW5nbGUoMCwgZnJhZ21lbnRIKjMsIGZyYWdtZW50VywgZnJhZ21lbnRIKSwgY29sb3IpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUocmlnaHRFZGdlWCwgcmVjdC5ZLCBmcmFnbWVudFcsIGZyYWdtZW50SCksXHJcbiAgICAgICAgICAgICAgICBuZXcgUmVjdGFuZ2xlKGZyYWdtZW50VyozLCAwLCBmcmFnbWVudFcsIGZyYWdtZW50SCksIGNvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRHJhd01vZGVfVGlsZWRQcm9ncmVzc0JhciA6IElEcmF3TW9kZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFJlY3RhbmdsZSByZWN0LCBUZXh0dXJlMkQgdGV4dHVyZSwgQ29sb3IgY29sb3IsIFJvdGF0aW9uOTAgcm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbGVmdEVuZFdpZHRoID0gdGV4dHVyZS5XaWR0aCAvIDQ7XHJcbiAgICAgICAgICAgIGludCB0aWxlU2l6ZSA9IHRleHR1cmUuV2lkdGgvMjtcclxuICAgICAgICAgICAgaW50IHJpZ2h0RW5kV2lkdGggPSB0ZXh0dXJlLldpZHRoIC0gdGlsZVNpemUgLSBsZWZ0RW5kV2lkdGg7XHJcbiAgICAgICAgICAgIGludCB0aWxlZEFyZWFXaWR0aCA9IHJlY3QuV2lkdGggLSBsZWZ0RW5kV2lkdGggLSByaWdodEVuZFdpZHRoO1xyXG4gICAgICAgICAgICBpbnQgdGlsZUNvdW50ID0gKGludClNYXRoLlJvdW5kKChmbG9hdCl0aWxlZEFyZWFXaWR0aCAvIHRpbGVTaXplKTtcclxuICAgICAgICAgICAgaW50IHRpbGVTcGFjaW5nID0gKGludClNYXRoLkNlaWxpbmcoKGZsb2F0KXRpbGVkQXJlYVdpZHRoIC8gdGlsZUNvdW50KTtcclxuXHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgbmV3IFJlY3RhbmdsZShyZWN0LlgsIHJlY3QuWSwgbGVmdEVuZFdpZHRoLCByZWN0LkhlaWdodCksIG5ldyBSZWN0YW5nbGUoMCwwLCBsZWZ0RW5kV2lkdGgsIHRleHR1cmUuSGVpZ2h0KSwgY29sb3IpO1xyXG4gICAgICAgICAgICBmb3IoaW50IFggPSAwOyBYIDwgdGlsZWRBcmVhV2lkdGg7IFgrPXRpbGVTcGFjaW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIG5ldyBSZWN0YW5nbGUocmVjdC5YICsgbGVmdEVuZFdpZHRoICsgWCwgcmVjdC5ZLCB0aWxlU3BhY2luZywgcmVjdC5IZWlnaHQpLCBuZXcgUmVjdGFuZ2xlKGxlZnRFbmRXaWR0aCwgMCwgdGlsZVNpemUsIHRleHR1cmUuSGVpZ2h0KSwgY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgbmV3IFJlY3RhbmdsZShyZWN0LlggKyByZWN0LldpZHRoLSByaWdodEVuZFdpZHRoLCByZWN0LlksIHJpZ2h0RW5kV2lkdGgsIHJlY3QuSGVpZ2h0KSwgbmV3IFJlY3RhbmdsZSh0ZXh0dXJlLldpZHRoLSByaWdodEVuZFdpZHRoLCAwLCByaWdodEVuZFdpZHRoLCB0ZXh0dXJlLkhlaWdodCksIGNvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludGVyZmFjZSBSaWNoSW1hZ2VMYXllclxyXG4gICAge1xyXG4gICAgICAgIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgUmVjdGFuZ2xlIHJlY3QsIENvbG9yIGNvbCwgUm90YXRpb245MCByb3RhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudW0gUmljaEltYWdlRHJhd01vZGVcclxuICAgIHtcclxuICAgICAgICBERUZBVUxULFxyXG4gICAgICAgIFNUUkVUQ0hFRCxcclxuICAgICAgICBGSVhFRCxcclxuICAgICAgICBGSVRURUQsXHJcbiAgICAgICAgVElMRUQsXHJcbiAgICAgICAgVElMRUQ5R1JJRCxcclxuICAgICAgICBTVFJFVENIRUQ5R1JJRCxcclxuICAgICAgICBUSUxFRFBST0dSRVNTQkFSLFxyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUmljaEltYWdlTGF5ZXJfVGV4dHVyZSA6IFJpY2hJbWFnZUxheWVyXHJcbiAgICB7XHJcbiAgICAgICAgVGV4dHVyZTJEIHRleHR1cmU7XHJcbiAgICAgICAgQ29sb3IgY29sb3I7XHJcbiAgICAgICAgSURyYXdNb2RlIGRyYXdNb2RlO1xyXG4gICAgICAgIGludCBwYWRkaW5nO1xyXG4gICAgICAgIFZlY3RvcjIgb2Zmc2V0O1xyXG4gICAgICAgIFJvdGF0aW9uOTAgcm90YXRpb247XHJcbiAgICAgICAgYm9vbCBtb2RpZmllc1JlY3Q7XHJcbiAgICAgICAgc3RhdGljXHJcbiNpZiBXSU5ET1dTXHJcbiAgICAgICAgICAgIERpY3Rpb25hcnlcclxuI2Vsc2VcclxuICAgICAgICAgICAgX0RpY3Rpb25hcnlcclxuI2VuZGlmXHJcbiAgICAgICAgICAgIDxTdHJpbmcsIElEcmF3TW9kZT4gZHJhd01vZGVzQnlOYW1lID0gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ld1xyXG4jaWYgV0lORE9XU1xyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5XHJcbiNlbHNlXHJcbiAgICAgICAgICAgIF9EaWN0aW9uYXJ5XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICA8c3RyaW5nLCBJRHJhd01vZGU+KCksKF9vNCk9PntfbzQuQWRkKFwiZGVmYXVsdFwiLG5ldyBEcmF3TW9kZV9TdHJldGNoZWQoKSk7X280LkFkZChcInN0cmV0Y2hlZFwiLG5ldyBEcmF3TW9kZV9TdHJldGNoZWQoKSk7X280LkFkZChcImZpeGVkXCIsbmV3IERyYXdNb2RlX0ZpeGVkKCkpO19vNC5BZGQoXCJmaXR0ZWRcIixuZXcgRHJhd01vZGVfRml0dGVkKCkpO19vNC5BZGQoXCJ0aWxlZFwiLG5ldyBEcmF3TW9kZV9UaWxlZCgpKTtfbzQuQWRkKFwidGlsZWQ5Z3JpZFwiLG5ldyBEcmF3TW9kZV9UaWxlZDlHcmlkKCkpO19vNC5BZGQoXCJzdHJldGNoZWQ5Z3JpZFwiLG5ldyBEcmF3TW9kZV9TdHJldGNoOUdyaWQoKSk7X280LkFkZChcInRpbGVkcHJvZ3Jlc3NiYXJcIixuZXcgRHJhd01vZGVfVGlsZWRQcm9ncmVzc0JhcigpKTtyZXR1cm4gX280O30pO1xyXG4gICAgICAgIHN0YXRpY1xyXG4jaWYgV0lORE9XU1xyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5XHJcbiNlbHNlXHJcbiAgICAgICAgICAgIF9EaWN0aW9uYXJ5XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICA8UmljaEltYWdlRHJhd01vZGUsIElEcmF3TW9kZT4gZHJhd01vZGVzID0gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ld1xyXG4jaWYgV0lORE9XU1xyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5XHJcbiNlbHNlXHJcbiAgICAgICAgICAgIF9EaWN0aW9uYXJ5XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICA8UmljaEltYWdlRHJhd01vZGUsIElEcmF3TW9kZT4oKSwoX281KT0+e19vNS5BZGQoUmljaEltYWdlRHJhd01vZGUuREVGQVVMVCxuZXcgRHJhd01vZGVfU3RyZXRjaGVkKCkpO19vNS5BZGQoUmljaEltYWdlRHJhd01vZGUuU1RSRVRDSEVELG5ldyBEcmF3TW9kZV9TdHJldGNoZWQoKSk7X281LkFkZChSaWNoSW1hZ2VEcmF3TW9kZS5GSVhFRCxuZXcgRHJhd01vZGVfRml4ZWQoKSk7X281LkFkZChSaWNoSW1hZ2VEcmF3TW9kZS5GSVRURUQsbmV3IERyYXdNb2RlX0ZpdHRlZCgpKTtfbzUuQWRkKFJpY2hJbWFnZURyYXdNb2RlLlRJTEVELG5ldyBEcmF3TW9kZV9UaWxlZCgpKTtfbzUuQWRkKFJpY2hJbWFnZURyYXdNb2RlLlRJTEVEOUdSSUQsbmV3IERyYXdNb2RlX1RpbGVkOUdyaWQoKSk7X281LkFkZChSaWNoSW1hZ2VEcmF3TW9kZS5TVFJFVENIRUQ5R1JJRCxuZXcgRHJhd01vZGVfU3RyZXRjaDlHcmlkKCkpO19vNS5BZGQoUmljaEltYWdlRHJhd01vZGUuVElMRURQUk9HUkVTU0JBUixuZXcgRHJhd01vZGVfVGlsZWRQcm9ncmVzc0JhcigpKTtyZXR1cm4gX281O30pO1xyXG5cclxuICAgICAgICBwdWJsaWMgUmljaEltYWdlTGF5ZXJfVGV4dHVyZShUZXh0dXJlMkQgYVRleHR1cmUsIENvbG9yIGFDb2xvciwgUmljaEltYWdlRHJhd01vZGUgYURyYXdNb2RlLCBpbnQgYVBhZGRpbmcsIFJvdGF0aW9uOTAgYVJvdGF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dHVyZSA9IGFUZXh0dXJlO1xyXG4gICAgICAgICAgICBjb2xvciA9IGFDb2xvcjtcclxuICAgICAgICAgICAgZHJhd01vZGUgPSBkcmF3TW9kZXNbYURyYXdNb2RlXTtcclxuICAgICAgICAgICAgcGFkZGluZyA9IGFQYWRkaW5nO1xyXG4gICAgICAgICAgICByb3RhdGlvbiA9IGFSb3RhdGlvbjtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gVmVjdG9yMi5aZXJvO1xyXG5cclxuICAgICAgICAgICAgbW9kaWZpZXNSZWN0ID0gKHBhZGRpbmcgIT0gMCB8fCBvZmZzZXQuWCAhPSAwIHx8IG9mZnNldC5ZICE9IDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFJpY2hJbWFnZUxheWVyX1RleHR1cmUoVGV4dHVyZTJEIGFUZXh0dXJlLCBDb2xvciBhQ29sb3IsIFN0cmluZyBhRHJhd01vZGUsIGludCBhUGFkZGluZywgUm90YXRpb245MCBhUm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0dXJlID0gYVRleHR1cmU7XHJcbiAgICAgICAgICAgIGNvbG9yID0gYUNvbG9yO1xyXG4gICAgICAgICAgICBkcmF3TW9kZSA9IGRyYXdNb2Rlc0J5TmFtZVthRHJhd01vZGVdO1xyXG4gICAgICAgICAgICBwYWRkaW5nID0gYVBhZGRpbmc7XHJcbiAgICAgICAgICAgIHJvdGF0aW9uID0gYVJvdGF0aW9uO1xyXG4gICAgICAgICAgICBvZmZzZXQgPSBWZWN0b3IyLlplcm87XHJcblxyXG4gICAgICAgICAgICBtb2RpZmllc1JlY3QgPSAocGFkZGluZyAhPSAwIHx8IG9mZnNldC5YICE9IDAgfHwgb2Zmc2V0LlkgIT0gMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmljaEltYWdlTGF5ZXJfVGV4dHVyZShKU09OVGFibGUgdGVtcGxhdGUsIENvbnRlbnRNYW5hZ2VyIGNvbnRlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0dXJlID0gY29udGVudC5Mb2FkPFRleHR1cmUyRD4odGVtcGxhdGUuZ2V0U3RyaW5nKFwidGV4dHVyZVwiLCBcIndoaXRlXCIpKTtcclxuICAgICAgICAgICAgY29sb3IgPSB0ZW1wbGF0ZS5nZXRTdHJpbmcoXCJjb2xvclwiLCBcIkZGRkZGRlwiKS50b0NvbG9yKCk7XHJcbiAgICAgICAgICAgIGRyYXdNb2RlID0gZHJhd01vZGVzQnlOYW1lW3RlbXBsYXRlLmdldFN0cmluZyhcImRyYXdcIiwgXCJkZWZhdWx0XCIpXTtcclxuICAgICAgICAgICAgcGFkZGluZyA9IHRlbXBsYXRlLmdldEludChcInBhZGRpbmdcIiwgMCk7XHJcblxyXG4gICAgICAgICAgICBKU09OQXJyYXkgb2Zmc2V0QXJyYXkgPSB0ZW1wbGF0ZS5nZXRBcnJheShcIm9mZnNldFwiLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKG9mZnNldEFycmF5ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBuZXcgVmVjdG9yMigwLCAwKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0QXJyYXkudG9WZWN0b3IyKCk7XHJcblxyXG4gICAgICAgICAgICByb3RhdGlvbiA9IHRlbXBsYXRlLmdldFJvdGF0aW9uKFwicm90YXRpb25cIiwgUm90YXRpb245MC5Ob25lKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGlmaWVzUmVjdCA9IChwYWRkaW5nICE9IDAgfHwgb2Zmc2V0LlggIT0gMCB8fCBvZmZzZXQuWSAhPSAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFJlY3RhbmdsZSByZWN0LCBDb2xvciBpbkNvbCwgUm90YXRpb245MCBhUm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb2xvciBmaW5hbENvbG9yID0gaW5Db2wuTXVsdGlwbHkoY29sb3IpO1xyXG4gICAgICAgICAgICBpZiAobW9kaWZpZXNSZWN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkcmF3TW9kZS5EcmF3KHNwcml0ZUJhdGNoLCBuZXcgUmVjdGFuZ2xlKHJlY3QuWCArIChpbnQpb2Zmc2V0LlggLSBwYWRkaW5nLCByZWN0LlkgKyAoaW50KW9mZnNldC5ZIC0gcGFkZGluZywgcmVjdC5XaWR0aCArIHBhZGRpbmcgKiAyLCByZWN0LkhlaWdodCArIHBhZGRpbmcgKiAyKSwgdGV4dHVyZSwgZmluYWxDb2xvciwgcm90YXRpb24ucm90YXRlQnkoYVJvdGF0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkcmF3TW9kZS5EcmF3KHNwcml0ZUJhdGNoLCByZWN0LCB0ZXh0dXJlLCBmaW5hbENvbG9yLCByb3RhdGlvbi5yb3RhdGVCeShhUm90YXRpb24pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUmljaEltYWdlTGF5ZXJfSW1hZ2UgOiBSaWNoSW1hZ2VMYXllclxyXG4gICAge1xyXG4gICAgICAgIFJpY2hJbWFnZSBpbWFnZTtcclxuICAgICAgICBSb3RhdGlvbjkwIHJvdGF0aW9uO1xyXG5cclxuICAgICAgICBwdWJsaWMgUmljaEltYWdlTGF5ZXJfSW1hZ2UoUmljaEltYWdlIGFJbWFnZSwgUm90YXRpb245MCBhUm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbWFnZSA9IGFJbWFnZTtcclxuICAgICAgICAgICAgcm90YXRpb24gPSBhUm90YXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBSZWN0YW5nbGUgcmVjdCwgQ29sb3IgY29sLCBSb3RhdGlvbjkwIGFSb3RhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGltYWdlLkRyYXcoc3ByaXRlQmF0Y2gsIHJlY3QsIGNvbCwgcm90YXRpb24ucm90YXRlQnkoYVJvdGF0aW9uKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUmljaEltYWdlXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxSaWNoSW1hZ2VMYXllcj4gbGF5ZXJzO1xyXG4gICAgICAgIHB1YmxpYyBSaWNoSW1hZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGF5ZXJzID0gbmV3IExpc3Q8UmljaEltYWdlTGF5ZXI+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmljaEltYWdlKFRleHR1cmUyRCB0ZXh0dXJlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGF5ZXJzID0gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PFJpY2hJbWFnZUxheWVyPigpLChfbzYpPT57X282LkFkZChuZXcgUmljaEltYWdlTGF5ZXJfVGV4dHVyZSh0ZXh0dXJlLCBDb2xvci5XaGl0ZSwgXCJkZWZhdWx0XCIsIDAsIFJvdGF0aW9uOTAuTm9uZSkpO3JldHVybiBfbzY7fSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmljaEltYWdlKFJpY2hJbWFnZUxheWVyIGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGF5ZXJzID0gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PFJpY2hJbWFnZUxheWVyPigpLChfbzcpPT57X283LkFkZChsYXllcik7cmV0dXJuIF9vNzt9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSaWNoSW1hZ2UoSlNPTlRhYmxlIHRlbXBsYXRlLCBDb250ZW50TWFuYWdlciBjb250ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGF5ZXJzID0gbmV3IExpc3Q8UmljaEltYWdlTGF5ZXI+KCk7XHJcblxyXG4gICAgICAgICAgICBKU09OQXJyYXkgbGF5ZXJUZW1wbGF0ZSA9IHRlbXBsYXRlLmdldEFycmF5KFwibGF5ZXJzXCIsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAobGF5ZXJUZW1wbGF0ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBJZHggPSAwOyBJZHggPCBsYXllclRlbXBsYXRlLkxlbmd0aDsgKytJZHgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJzLkFkZChuZXcgUmljaEltYWdlTGF5ZXJfVGV4dHVyZShsYXllclRlbXBsYXRlLmdldEpTT04oSWR4KSwgY29udGVudCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJzLkFkZChuZXcgUmljaEltYWdlTGF5ZXJfVGV4dHVyZSh0ZW1wbGF0ZSwgY29udGVudCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoUmljaEltYWdlTGF5ZXIgbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYXllcnMuQWRkKGxheWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChSaWNoSW1hZ2UgaW1hZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYXllcnMuQWRkKG5ldyBSaWNoSW1hZ2VMYXllcl9JbWFnZShpbWFnZSwgUm90YXRpb245MC5Ob25lKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBSZWN0YW5nbGUgcmVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXcoc3ByaXRlQmF0Y2gsIHJlY3QsIENvbG9yLldoaXRlLCBSb3RhdGlvbjkwLk5vbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgUmVjdGFuZ2xlIHJlY3QsIENvbG9yIGNvbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXcoc3ByaXRlQmF0Y2gsIHJlY3QsIGNvbCwgUm90YXRpb245MC5Ob25lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFJlY3RhbmdsZSByZWN0LCBDb2xvciBjb2wsIFJvdGF0aW9uOTAgcm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoKFJpY2hJbWFnZUxheWVyIGN1ckxheWVyIGluIGxheWVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyTGF5ZXIuRHJhdyhzcHJpdGVCYXRjaCwgcmVjdCwgY29sLCByb3RhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRvb2x0aXBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZW51bSBBbGlnblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTEVGVCxcclxuICAgICAgICAgICAgUklHSFQsXHJcbiAgICAgICAgICAgIENFTlRFUixcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEcmF3VG9vbHRpcChTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgU3ByaXRlRm9udCBmb250LCBSaWNoSW1hZ2UgYmcsIExpc3Q8c3RyaW5nPiB0ZXh0LCBWZWN0b3IyIG9yaWdpbiwgQWxpZ24gYWxpZ24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBsaW5lSGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgZmxvYXQgbWF4V2lkdGggPSAwO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChzdHJpbmcgcyBpbiB0ZXh0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIGxpbmVTaXplID0gZm9udC5NZWFzdXJlU3RyaW5nKHMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVTaXplLlggPiBtYXhXaWR0aClcclxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aCA9IGxpbmVTaXplLlg7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZVNpemUuWSA+IGxpbmVIZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodCA9IGxpbmVTaXplLlk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjIgcGFkZGluZyA9IG5ldyBWZWN0b3IyKDQsIDIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFsaWduID09IEFsaWduLlJJR0hUKVxyXG4gICAgICAgICAgICAgICAgb3JpZ2luLlggLT0gKG1heFdpZHRoICsgcGFkZGluZy5YICogMik7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFsaWduID09IEFsaWduLkNFTlRFUilcclxuICAgICAgICAgICAgICAgIG9yaWdpbi5YIC09IChpbnQpKChtYXhXaWR0aCArIHBhZGRpbmcuWCAqIDIpLzIpO1xyXG5cclxuICAgICAgICAgICAgYmcuRHJhdyhzcHJpdGVCYXRjaCwgbmV3IFJlY3RhbmdsZSgoaW50KW9yaWdpbi5YLCAoaW50KW9yaWdpbi5ZLCAoaW50KShtYXhXaWR0aCArIHBhZGRpbmcuWCAqIDIpLCAoaW50KSh0ZXh0LkNvdW50ICogbGluZUhlaWdodCArIHBhZGRpbmcuWSAqIDIpKSk7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgc3RyaW5nUG9zID0gb3JpZ2luICsgbmV3IFZlY3RvcjIocGFkZGluZy5YLCBwYWRkaW5nLlkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChzdHJpbmcgcyBpbiB0ZXh0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3U3RyaW5nKGZvbnQsIHMsIHN0cmluZ1BvcywgQ29sb3IuQmxhY2spO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nUG9zID0gbmV3IFZlY3RvcjIoc3RyaW5nUG9zLlgsIHN0cmluZ1Bvcy5ZICsgbGluZUhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgTGlzdDxzdHJpbmc+IFN0cmluZ1RvTGluZXMoc3RyaW5nIHRleHQsIFNwcml0ZUZvbnQgZm9udCwgZmxvYXQgbWF4V2lkdGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmdbXSB3b3JkcyA9IHRleHQuU3BsaXQobmV3IGNoYXJbXSB7ICcgJyB9LCBTdHJpbmdTcGxpdE9wdGlvbnMuUmVtb3ZlRW1wdHlFbnRyaWVzKTtcclxuICAgICAgICAgICAgTGlzdDxzdHJpbmc+IHJlc3VsdCA9IG5ldyBMaXN0PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgc3RyaW5nIGN1cnJlbnRMaW5lID0gXCJcIjtcclxuICAgICAgICAgICAgZmxvYXQgc3BhY2VXaWR0aCA9IGZvbnQuTWVhc3VyZVN0cmluZyhcIiBcIikuWDtcclxuICAgICAgICAgICAgZmxvYXQgY3VycmVudFdpZHRoID0gMDtcclxuICAgICAgICAgICAgZm9yZWFjaCAoc3RyaW5nIHdvcmQgaW4gd29yZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgc3RyaW5nU2l6ZSA9IGZvbnQuTWVhc3VyZVN0cmluZyh3b3JkKTtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50V2lkdGggPiAwICYmIGN1cnJlbnRXaWR0aCArIHN0cmluZ1NpemUuWCA+IG1heFdpZHRoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5BZGQoY3VycmVudExpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudExpbmUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50V2lkdGggPiAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMaW5lICs9IFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRXaWR0aCArPSBzcGFjZVdpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRXaWR0aCArPSBzdHJpbmdTaXplLlg7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TGluZSArPSB3b3JkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdC5BZGQoY3VycmVudExpbmUpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBMUkNFbmdpbmVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNwbGFzaFxyXG4gICAge1xyXG4gICAgICAgIHN0cmluZyB0ZXh0O1xyXG4gICAgICAgIFRleHRBbGlnbm1lbnQgYWxpZ25tZW50O1xyXG4gICAgICAgIFNwcml0ZUZvbnQgZm9udDtcclxuICAgICAgICBUZXh0dXJlMkQgaWNvbjtcclxuICAgICAgICBWZWN0b3IyIHBvcztcclxuICAgICAgICBWZWN0b3IyIHZlbG9jaXR5O1xyXG4gICAgICAgIENvbG9yIGNvbG9yO1xyXG4gICAgICAgIGludCBsaWZldGltZTtcclxuICAgICAgICBmbG9hdCBkcmFnO1xyXG4gICAgICAgIGZsb2F0IGdyYXZpdHk7XHJcbiAgICAgICAgcHVibGljIGJvb2wgYWxpdmUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcGxhc2goc3RyaW5nIHRleHQsIFRleHRBbGlnbm1lbnQgYWxpZ25tZW50LCBTcHJpdGVGb250IGZvbnQsIENvbG9yIGNvbG9yLCBWZWN0b3IyIHBvcywgVmVjdG9yMiB2ZWxvY2l0eSwgZmxvYXQgZHJhZywgZmxvYXQgZ3Jhdml0eSwgZmxvYXQgbGlmZVNlY29uZHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICB0aGlzLmFsaWdubWVudCA9IGFsaWdubWVudDtcclxuICAgICAgICAgICAgdGhpcy5mb250ID0gZm9udDtcclxuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgICAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xyXG4gICAgICAgICAgICB0aGlzLmRyYWcgPSBkcmFnO1xyXG4gICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSBncmF2aXR5O1xyXG4gICAgICAgICAgICB0aGlzLmxpZmV0aW1lID0gKGludCkobGlmZVNlY29uZHMgKiAzMCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpZmV0aW1lLS07XHJcbiAgICAgICAgICAgIGlmIChsaWZldGltZSA8PSAwKVxyXG4gICAgICAgICAgICAgICAgYWxpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eS5ZICs9IGdyYXZpdHk7XHJcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eSAqPSBkcmFnO1xyXG4gICAgICAgICAgICAgICAgcG9zICs9IHZlbG9jaXR5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRleHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXdTdHJpbmcoZm9udCwgdGV4dCwgcG9zLCBhbGlnbm1lbnQsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpY29uICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KGljb24sIG5ldyBSZWN0YW5nbGUoKGludClwb3MuWCwgKGludClwb3MuWSwgaWNvbi5XaWR0aCwgaWNvbi5IZWlnaHQpLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTcGxhc2hNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxTcGxhc2g+IHNwbGFzaGVzID0gbmV3IExpc3Q8U3BsYXNoPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoU3BsYXNoIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcGxhc2hlcy5BZGQocyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IG51bURlYWQgPSAwO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChTcGxhc2ggcyBpbiBzcGxhc2hlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHMuYWxpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgcy5VcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBudW1EZWFkKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGludCBHQVJCQUdFX0NPTExFQ1RfVEhSRVNIT0xEID0gMztcclxuICAgICAgICAgICAgaWYgKG51bURlYWQgPT0gc3BsYXNoZXMuQ291bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNwbGFzaGVzLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihudW1EZWFkID4gR0FSQkFHRV9DT0xMRUNUX1RIUkVTSE9MRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTGlzdDxTcGxhc2g+IG5ld0xpc3QgPSBuZXcgTGlzdDxTcGxhc2g+KCk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoKFNwbGFzaCBzIGluIHNwbGFzaGVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0xpc3QuQWRkKHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3BsYXNoZXMgPSBuZXdMaXN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAoU3BsYXNoIHMgaW4gc3BsYXNoZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChzLmFsaXZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHMuRHJhdyhzcHJpdGVCYXRjaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIExSQ0VuZ2luZTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgTFJDRW5naW5lXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTcHJpdGVPYmplY3RcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBwb3M7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgc2l6ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9zaXplOyB9XHJcbiAgICAgICAgICAgIHNldCB7IF9zaXplID0gdmFsdWU7IF9zY2FsZSA9IG5ldyBWZWN0b3IyKHZhbHVlLlggLyB0ZXh0dXJlUmVnaW9uLldpZHRoLCB2YWx1ZS5ZIC8gdGV4dHVyZVJlZ2lvbi5IZWlnaHQpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFZlY3RvcjIgX3NpemU7XHJcbiAgICAgICAgVmVjdG9yMiBfc2NhbGU7XHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRCB0ZXh0dXJlO1xyXG4gICAgICAgIHB1YmxpYyBSZWN0YW5nbGUgdGV4dHVyZVJlZ2lvbjtcclxuICAgICAgICBDb2xvciBjb2xvciA9IENvbG9yLldoaXRlO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBsYXllckRlcHRoO1xyXG4gICAgICAgIC8vcHVibGljIFNwcml0ZUVmZmVjdHMgc3ByaXRlRWZmZWN0cyA9IFNwcml0ZUVmZmVjdHMuTm9uZTtcclxuXHJcbiAgICAgICAgcHVibGljIFNwcml0ZU9iamVjdChUZXh0dXJlMkQgdGV4dHVyZSwgVmVjdG9yMiBwb3MpOiB0aGlzKHRleHR1cmUsIHBvcywgdGV4dHVyZS5TaXplKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFNwcml0ZU9iamVjdChUZXh0dXJlMkQgdGV4dHVyZSwgVmVjdG9yMiBwb3MsIFZlY3RvcjIgc2l6ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgICAgIHRoaXMucG9zID0gcG9zO1xyXG4gICAgICAgICAgICB0aGlzLnRleHR1cmVSZWdpb24gPSBuZXcgUmVjdGFuZ2xlKDAsIDAsIHRleHR1cmUuV2lkdGgsIHRleHR1cmUuSGVpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcHJpdGVPYmplY3QoVGV4dHVyZTJEIHRleHR1cmUsIFZlY3RvcjIgcG9zLCBWZWN0b3IyIHNpemUsIENvbG9yIGNvbG9yKTogdGhpcyh0ZXh0dXJlLCBwb3MsIHNpemUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3ByaXRlT2JqZWN0KFRleHR1cmUyRCB0ZXh0dXJlLCBWZWN0b3IyIHBvcywgVmVjdG9yMiBzaXplLCBDb2xvciBjb2xvciwgUmVjdGFuZ2xlIHRleHR1cmVSZWdpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgICAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlUmVnaW9uID0gdGV4dHVyZVJlZ2lvbjtcclxuICAgICAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKHBvcy5Ub1BvaW50KCksIF9zY2FsZS5Ub1BvaW50KCkpLCBjb2xvcik7LyosIHRleHR1cmVSZWdpb24sIGNvbG9yLCAwLCBWZWN0b3IyLlplcm8sICovLypfc2NhbGUqLy8qLCovIC8qc3ByaXRlRWZmZWN0cyovLyosIGxheWVyRGVwdGgqLy8qKTsqL1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RhbmdsZSBib3VuZHMgeyBnZXQgeyByZXR1cm4gbmV3IFZlY3RhbmdsZShwb3MsIHNpemUpOyB9IH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuQ29udGVudDtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBMUkNFbmdpbmVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFVJQnV0dG9uU3R5bGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVUlCdXR0b25BcHBlYXJhbmNlIG5vcm1hbDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVUlCdXR0b25BcHBlYXJhbmNlIGhvdmVyO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBVSUJ1dHRvbkFwcGVhcmFuY2UgcHJlc3NlZDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVUlCdXR0b25BcHBlYXJhbmNlIGRpc2FibGVkO1xyXG5cclxuICAgICAgICBwdWJsaWMgVUlCdXR0b25TdHlsZShVSUJ1dHRvbkFwcGVhcmFuY2Ugbm9ybWFsLCBVSUJ1dHRvbkFwcGVhcmFuY2UgaG92ZXIsIFVJQnV0dG9uQXBwZWFyYW5jZSBwcmVzc2VkLCBVSUJ1dHRvbkFwcGVhcmFuY2UgZGlzYWJsZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vcm1hbCA9IG5vcm1hbDtcclxuICAgICAgICAgICAgdGhpcy5ob3ZlciA9IGhvdmVyO1xyXG4gICAgICAgICAgICB0aGlzLnByZXNzZWQgPSBwcmVzc2VkO1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBVSUJ1dHRvbkFwcGVhcmFuY2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgU3ByaXRlRm9udCBmb250O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBDb2xvciB0ZXh0Q29sb3I7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFJpY2hJbWFnZSBpbWFnZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVmVjdG9yMiB0ZXh0T2Zmc2V0O1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBDb2xvciBmaWxsQ29sb3I7XHJcblxyXG4gICAgICAgIHB1YmxpYyBVSUJ1dHRvbkFwcGVhcmFuY2UoU3ByaXRlRm9udCBmb250LCBDb2xvciB0ZXh0Q29sb3IsIFJpY2hJbWFnZSBpbWFnZSwgQ29sb3IgZmlsbENvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5mb250ID0gZm9udDtcclxuICAgICAgICAgICAgdGhpcy50ZXh0Q29sb3IgPSB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5maWxsQ29sb3IgPSBmaWxsQ29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVUlCdXR0b25BcHBlYXJhbmNlKFNwcml0ZUZvbnQgZm9udCwgQ29sb3IgdGV4dENvbG9yLCBSaWNoSW1hZ2UgaW1hZ2UsIENvbG9yIGZpbGxDb2xvciwgVmVjdG9yMiB0ZXh0T2Zmc2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5mb250ID0gZm9udDtcclxuICAgICAgICAgICAgdGhpcy50ZXh0Q29sb3IgPSB0ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5maWxsQ29sb3IgPSBmaWxsQ29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dE9mZnNldCA9IHRleHRPZmZzZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBzdHJpbmcgbGFiZWwsIFRleHR1cmUyRCBpY29uLCBSZWN0YW5nbGUgZnJhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbWFnZS5EcmF3KHNwcml0ZUJhdGNoLCBmcmFtZSwgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBNYWdpY1VJLkRyYXc5R3JpZChzcHJpdGVCYXRjaCwgdGV4dHVyZSwgZnJhbWUsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBmcmFtZSwgZmlsbENvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpY29uICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChmb250ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWNvbiBhbmQgdGV4dFxyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjIgbGFiZWxTaXplID0gZm9udC5NZWFzdXJlU3RyaW5nKGxhYmVsKTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCBpY29uU3BhY2luZyA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yMiBpY29uT3JpZ2luID0gZnJhbWUuQ2VudGVyLlRvVmVjdG9yMigpICsgdGV4dE9mZnNldCAtIG5ldyBWZWN0b3IyKGxhYmVsU2l6ZS5YICsgaWNvbi5XaWR0aCArIGljb25TcGFjaW5nLCBpY29uLkhlaWdodCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjIgdGV4dE9yaWdpbiA9IG5ldyBWZWN0b3IyKChpbnQpKGljb25PcmlnaW4uWCArIGljb24uV2lkdGggKyBpY29uU3BhY2luZyksIChpbnQpKGZyYW1lLkNlbnRlci5ZICsgdGV4dE9mZnNldC5ZIC0gbGFiZWxTaXplLlkvMikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoaWNvbiwgaWNvbk9yaWdpbiwgQ29sb3IuV2hpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXdTdHJpbmcoZm9udCwgbGFiZWwsIHRleHRPcmlnaW4sIHRleHRDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWNvbiBvbmx5XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyhpY29uLCBmcmFtZS5DZW50ZXIuVG9WZWN0b3IyKCkgKyB0ZXh0T2Zmc2V0IC0gaWNvbi5TaXplKCkgLyAyLCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZm9udCAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyB0ZXh0IG9ubHlcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgbGFiZWxTaXplID0gZm9udC5NZWFzdXJlU3RyaW5nKGxhYmVsKTtcclxuICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXdTdHJpbmcoZm9udCwgbGFiZWwsIG5ldyBWZWN0b3IyKChmbG9hdClNYXRoLkZsb29yKGZyYW1lLkNlbnRlci5YICsgdGV4dE9mZnNldC5YIC0gbGFiZWxTaXplLlggLyAyKSwgKGZsb2F0KU1hdGguRmxvb3IoZnJhbWUuQ2VudGVyLlkgKyB0ZXh0T2Zmc2V0LlkgLSBsYWJlbFNpemUuWSAvIDIpKSwgdGV4dENvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVUlCdXR0b24gOiBVSUVsZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIGxhYmVsO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlMkQgaWNvbjtcclxuICAgICAgICBwdWJsaWMgUmVjdGFuZ2xlIGZyYW1lO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBVSUJ1dHRvblN0eWxlIHN0eWxlcztcclxuICAgICAgICBwdWJsaWMgT25QcmVzc0RlbGVnYXRlIG9uUHJlc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldDsgcHJvdGVjdGVkIHNldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGJvb2wgbW91c2VJbnNpZGU7XHJcbiAgICAgICAgcHVibGljIGJvb2wgcHJlc3NlZEluc2lkZTtcclxuICAgICAgICBwdWJsaWMgYm9vbCBlbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBwdWJsaWMgYm9vbCB2aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcHVibGljIGRlbGVnYXRlIHZvaWQgT25QcmVzc0RlbGVnYXRlKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVUlCdXR0b25TdHlsZSBHZXREZWZhdWx0U3R5bGUoQ29udGVudE1hbmFnZXIgQ29udGVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNwcml0ZUZvbnQgZm9udCA9IENvbnRlbnQuTG9hZDxTcHJpdGVGb250PihcIkFyaWFsXCIpO1xyXG4gICAgICAgICAgICBSaWNoSW1hZ2Ugbm9ybWFsSW1hZ2UgPSBuZXcgUmljaEltYWdlKG5ldyBSaWNoSW1hZ2VMYXllcl9UZXh0dXJlKENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiYnV0dG9uM2RcIiksIENvbG9yLldoaXRlLCBcInN0cmV0Y2hlZDlncmlkXCIsIDAsIFJvdGF0aW9uOTAuTm9uZSkpO1xyXG4gICAgICAgICAgICBSaWNoSW1hZ2UgaG92ZXJJbWFnZSA9IG5ldyBSaWNoSW1hZ2UobmV3IFJpY2hJbWFnZUxheWVyX1RleHR1cmUoQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJidXR0b24zZF9ob3ZlclwiKSwgQ29sb3IuV2hpdGUsIFwic3RyZXRjaGVkOWdyaWRcIiwgMCwgUm90YXRpb245MC5Ob25lKSk7XHJcbiAgICAgICAgICAgIFJpY2hJbWFnZSBwcmVzc2VkSW1hZ2UgPSBuZXcgUmljaEltYWdlKG5ldyBSaWNoSW1hZ2VMYXllcl9UZXh0dXJlKENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiYnV0dG9uM2RfcHJlc3NlZFwiKSwgQ29sb3IuV2hpdGUsIFwic3RyZXRjaGVkOWdyaWRcIiwgMCwgUm90YXRpb245MC5Ob25lKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFVJQnV0dG9uU3R5bGUoXHJcbiAgICAgICAgICAgICAgICBuZXcgVUlCdXR0b25BcHBlYXJhbmNlKGZvbnQsIENvbG9yLkJsYWNrLCBub3JtYWxJbWFnZSwgQ29sb3IuV2hpdGUpLFxyXG4gICAgICAgICAgICAgICAgbmV3IFVJQnV0dG9uQXBwZWFyYW5jZShmb250LCBDb2xvci5CbGFjaywgaG92ZXJJbWFnZSwgQ29sb3IuV2hpdGUpLFxyXG4gICAgICAgICAgICAgICAgbmV3IFVJQnV0dG9uQXBwZWFyYW5jZShmb250LCBDb2xvci5CbGFjaywgcHJlc3NlZEltYWdlLCBDb2xvci5XaGl0ZSwgbmV3IFZlY3RvcjIoMCwxKSksXHJcbiAgICAgICAgICAgICAgICBuZXcgVUlCdXR0b25BcHBlYXJhbmNlKGZvbnQsIENvbG9yLkJsYWNrLCBub3JtYWxJbWFnZSwgQ29sb3IuR3JheSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVSUJ1dHRvbihzdHJpbmcgbGFiZWwsIFJlY3RhbmdsZSBmcmFtZSwgVUlCdXR0b25TdHlsZSBzdHlsZXMsIE9uUHJlc3NEZWxlZ2F0ZSBvblByZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzID0gc3R5bGVzO1xyXG4gICAgICAgICAgICB0aGlzLm9uUHJlc3MgPSBvblByZXNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVJQnV0dG9uKHN0cmluZyBsYWJlbCwgVGV4dHVyZTJEIGljb24sIFJlY3RhbmdsZSBmcmFtZSwgVUlCdXR0b25TdHlsZSBzdHlsZXMsIE9uUHJlc3NEZWxlZ2F0ZSBvblByZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgICAgICB0aGlzLmljb24gPSBpY29uO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lID0gZnJhbWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzID0gc3R5bGVzO1xyXG4gICAgICAgICAgICB0aGlzLm9uUHJlc3MgPSBvblByZXNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIFVJTW91c2VSZXNwb25kZXIgR2V0TW91c2VIb3ZlcihWZWN0b3IyIGxvY2FsTW91c2VQb3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZnJhbWUuQ29udGFpbnMobG9jYWxNb3VzZVBvcykgPyB0aGlzIDogbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShJbnB1dFN0YXRlIGlucHV0U3RhdGUsIFZlY3RvcjIgb3JpZ2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFlbmFibGVkIHx8ICF2aXNpYmxlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtb3VzZUluc2lkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcHJlc3NlZEluc2lkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtb3VzZUluc2lkZSA9IGlucHV0U3RhdGUuaG92ZXJpbmdFbGVtZW50ID09IHRoaXM7Ly8gZnJhbWUuQ29udGFpbnMoaW5wdXRTdGF0ZS5Nb3VzZVBvcyAtIG9yaWdpbik7XHJcbiAgICAgICAgICAgIGlmIChtb3VzZUluc2lkZSAmJiBpbnB1dFN0YXRlLldhc01vdXNlTGVmdEp1c3RQcmVzc2VkKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByZXNzZWRJbnNpZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlucHV0U3RhdGUubW91c2VMZWZ0LmlzRG93bilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vdXNlSW5zaWRlICYmIHByZXNzZWRJbnNpZGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJlc3NlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHJlc3NlZEluc2lkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIFByZXNzZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYob25QcmVzcyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgb25QcmVzcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgVmVjdG9yMiBvcmlnaW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXZpc2libGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBVSUJ1dHRvbkFwcGVhcmFuY2UgY3VycmVudFN0eWxlO1xyXG4gICAgICAgICAgICBpZiAoIWVuYWJsZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdHlsZSA9IHN0eWxlcy5kaXNhYmxlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChtb3VzZUluc2lkZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXNzZWRJbnNpZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0eWxlID0gc3R5bGVzLnByZXNzZWQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0eWxlID0gc3R5bGVzLmhvdmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFN0eWxlID0gc3R5bGVzLm5vcm1hbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3VycmVudFN0eWxlLkRyYXcoc3ByaXRlQmF0Y2gsIGxhYmVsLCBpY29uLCBuZXcgUmVjdGFuZ2xlKGZyYW1lLlggKyAoaW50KW9yaWdpbi5YLCBmcmFtZS5ZICsgKGludClvcmlnaW4uWSwgZnJhbWUuV2lkdGgsIGZyYW1lLkhlaWdodCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0RW5hYmxlZChib29sIGVuYWJsZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBlbmFibGVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0VmlzaWJsZShib29sIHZpc2libGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVUlSYWRpb0J1dHRvbkdyb3VwPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFVJUmFkaW9CdXR0b248VD4gc2VsZWN0ZWRCdXR0b247XHJcbiAgICAgICAgcHVibGljIFQgc2VsZWN0ZWRWYWx1ZSB7IGdldCB7IHJldHVybiBzZWxlY3RlZEJ1dHRvbi52YWx1ZTsgfSB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFVJUmFkaW9CdXR0b248VD46IFVJQnV0dG9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IFVJUmFkaW9CdXR0b25Hcm91cDxUPiBncm91cDtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVCB2YWx1ZTtcclxuICAgICAgICBVSUJ1dHRvbkFwcGVhcmFuY2UgYWN0aXZlQXBwZWFyYW5jZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgT25SYWRpb1ByZXNzRGVsZWdhdGUgb25SYWRpb1ByZXNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgZGVsZWdhdGUgdm9pZCBPblJhZGlvUHJlc3NEZWxlZ2F0ZShUIHZhbHVlKTtcclxuXHJcbiAgICAgICAgcHVibGljIFVJUmFkaW9CdXR0b24oc3RyaW5nIGxhYmVsLCBUIHZhbHVlLCBVSVJhZGlvQnV0dG9uR3JvdXA8VD4gZ3JvdXAsIFJlY3RhbmdsZSBmcmFtZSwgVUlCdXR0b25TdHlsZSBzdHlsZXMsIFVJQnV0dG9uQXBwZWFyYW5jZSBhY3RpdmVBcHBlYXJhbmNlLCBPblByZXNzRGVsZWdhdGUgb25QcmVzcykgOlxyXG4gICAgICAgICAgICBiYXNlKGxhYmVsLCBmcmFtZSwgc3R5bGVzLCBvblByZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cCA9IGdyb3VwO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQXBwZWFyYW5jZSA9IGFjdGl2ZUFwcGVhcmFuY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVUlSYWRpb0J1dHRvbihzdHJpbmcgbGFiZWwsIFQgdmFsdWUsIFVJUmFkaW9CdXR0b25Hcm91cDxUPiBncm91cCwgUmVjdGFuZ2xlIGZyYW1lLCBVSUJ1dHRvblN0eWxlIHN0eWxlcywgVUlCdXR0b25BcHBlYXJhbmNlIGFjdGl2ZUFwcGVhcmFuY2UsIE9uUmFkaW9QcmVzc0RlbGVnYXRlIG9uUmFkaW9QcmVzcykgOlxyXG4gICAgICAgICAgICBiYXNlKGxhYmVsLCBmcmFtZSwgc3R5bGVzLCBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cCA9IGdyb3VwO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQXBwZWFyYW5jZSA9IGFjdGl2ZUFwcGVhcmFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMub25SYWRpb1ByZXNzID0gb25SYWRpb1ByZXNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgUHJlc3NlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBncm91cC5zZWxlY3RlZEJ1dHRvbiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZihvblJhZGlvUHJlc3MgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG9uUmFkaW9QcmVzcyh2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBiYXNlLlByZXNzZWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFZlY3RvcjIgb3JpZ2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGdyb3VwLnNlbGVjdGVkQnV0dG9uID09IHRoaXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUFwcGVhcmFuY2UuRHJhdyhzcHJpdGVCYXRjaCwgbGFiZWwsIGljb24sIG5ldyBSZWN0YW5nbGUoZnJhbWUuWCArIChpbnQpb3JpZ2luLlgsIGZyYW1lLlkgKyAoaW50KW9yaWdpbi5ZLCBmcmFtZS5XaWR0aCwgZnJhbWUuSGVpZ2h0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXNlLkRyYXcoc3ByaXRlQmF0Y2gsIG9yaWdpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIFN5c3RlbS5Db2xsZWN0aW9uc1xyXG57XHJcbiAgICBpbnRlcm5hbCBzdGF0aWMgY2xhc3MgX0hhc2hIZWxwZXJzXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBJbnQzMiBIYXNoUHJpbWUgPSAxMDE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaW50W10gcHJpbWVzID0ge1xyXG4gICAgICAgICAgICAzLCA3LCAxMSwgMTcsIDIzLCAyOSwgMzcsIDQ3LCA1OSwgNzEsIDg5LCAxMDcsIDEzMSwgMTYzLCAxOTcsIDIzOSwgMjkzLCAzNTMsIDQzMSwgNTIxLCA2MzEsIDc2MSwgOTE5LFxyXG4gICAgICAgICAgICAxMTAzLCAxMzI3LCAxNTk3LCAxOTMxLCAyMzMzLCAyODAxLCAzMzcxLCA0MDQ5LCA0ODYxLCA1ODM5LCA3MDEzLCA4NDE5LCAxMDEwMywgMTIxNDMsIDE0NTkxLFxyXG4gICAgICAgICAgICAxNzUxOSwgMjEwMjMsIDI1MjI5LCAzMDI5MywgMzYzNTMsIDQzNjI3LCA1MjM2MSwgNjI4NTEsIDc1NDMxLCA5MDUyMywgMTA4NjMxLCAxMzAzNjMsIDE1NjQzNyxcclxuICAgICAgICAgICAgMTg3NzUxLCAyMjUzMDcsIDI3MDM3MSwgMzI0NDQ5LCAzODkzNTcsIDQ2NzIzNywgNTYwNjg5LCA2NzI4MjcsIDgwNzQwMywgOTY4ODk3LCAxMTYyNjg3LCAxMzk1MjYzLFxyXG4gICAgICAgICAgICAxNjc0MzE5LCAyMDA5MTkxLCAyNDExMDMzLCAyODkzMjQ5LCAzNDcxODk5LCA0MTY2Mjg3LCA0OTk5NTU5LCA1OTk5NDcxLCA3MTk5MzY5IH07XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJc1ByaW1lKGludCBjYW5kaWRhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoKGNhbmRpZGF0ZSAmIDEpICE9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBsaW1pdCA9IChpbnQpTWF0aC5TcXJ0KGNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBkaXZpc29yID0gMzsgZGl2aXNvciA8PSBsaW1pdDsgZGl2aXNvciArPSAyKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoY2FuZGlkYXRlICUgZGl2aXNvcikgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChjYW5kaWRhdGUgPT0gMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBHZXRQcmltZShpbnQgbWluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1pbiA8IDApXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oXCJIYXNodGFibGUncyBjYXBhY2l0eSBvdmVyZmxvd2VkIGFuZCB3ZW50IG5lZ2F0aXZlLiBDaGVjayBsb2FkIGZhY3RvciwgY2FwYWNpdHkgYW5kIHRoZSBjdXJyZW50IHNpemUgb2YgdGhlIHRhYmxlLlwiKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcmltZXMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBwcmltZSA9IHByaW1lc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChwcmltZSA+PSBtaW4pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAobWluIHwgMSk7IGkgPCBJbnQzMi5NYXhWYWx1ZTsgaSArPSAyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSXNQcmltZShpKSAmJiAoKGkgLSAxKSAlIEhhc2hQcmltZSAhPSAwKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWluO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgR2V0TWluUHJpbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByaW1lc1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEV4cGFuZFByaW1lKGludCBvbGRTaXplKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IG5ld1NpemUgPSAyICogb2xkU2l6ZTtcclxuICAgICAgICAgICAgaWYgKCh1aW50KW5ld1NpemUgPiBNYXhQcmltZUFycmF5TGVuZ3RoICYmIE1heFByaW1lQXJyYXlMZW5ndGggPiBvbGRTaXplKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF4UHJpbWVBcnJheUxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gR2V0UHJpbWUobmV3U2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IE1heFByaW1lQXJyYXlMZW5ndGggPSAweDdGRUZGRkZEO1xyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBSVBsYXllciA6IFBsYXllclxyXG4gICAge1xyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSBDUzE5OTggLy8gQXN5bmMgbWV0aG9kIGxhY2tzICdhd2FpdCcgb3BlcmF0b3JzIGFuZCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XHJcbiAgICAgICAgcHVibGljIGFzeW5jIG92ZXJyaWRlIFRhc2s8VGV4dHVyZTJEPiBUYXJnZXRDYXJkKClcclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgQ1MxOTk4IC8vIEFzeW5jIG1ldGhvZCBsYWNrcyAnYXdhaXQnIG9wZXJhdG9ycyBhbmQgd2lsbCBydW4gc3luY2hyb25vdXNseVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWUuY2FyZEltYWdlc1szXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIEFJUGxheWVyKEhhbmRHYW1lIEdhbWUpIDogYmFzZShHYW1lKSB7IH1cclxuXHJcbiNwcmFnbWEgd2FybmluZyBkaXNhYmxlIENTMTk5OCAvLyBBc3luYyBtZXRob2QgbGFja3MgJ2F3YWl0JyBvcGVyYXRvcnMgYW5kIHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBMb29rQXRDYXJkcyhSZWFsQ2FyZFBvb2wgY2FyZFBvb2wpIHsgfVxyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSBDUzE5OTggLy8gQXN5bmMgbWV0aG9kIGxhY2tzICdhd2FpdCcgb3BlcmF0b3JzIGFuZCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyB2b2lkIE9uVHVyblN0YXJ0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuT25UdXJuU3RhcnQoKTtcclxuICAgICAgICAgICAgYXdhaXQgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5PcmRlckJ5PGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQsaW50PihIYW5kLmNhcmRzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SGFuZEdhbWVzLkNhcmQsIGludD4pKHYgPT4gKChDYXJkcy5Mb3ZlTGV0dGVyQ2FyZCl2KS5WYWx1ZSkpLkZpcnN0KCkuUGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzazxQbGF5ZXI+IFRhcmdldFBsYXllcigpIHtyZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5PcmRlckJ5PGdsb2JhbDo6SGFuZEdhbWVzLlBsYXllcixib29sPiggICAgICAgICAgICBHYW1lLnBsYXllcnMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIYW5kR2FtZXMuUGxheWVyLCBib29sPikodiA9PiB2LklzSGFuZG1haWRlZCkpLlRoZW5CeTxib29sPigoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkhhbmRHYW1lcy5QbGF5ZXIsIGJvb2w+KSh2ID0+IHYgaXMgQUlQbGF5ZXIpKS5GaXJzdCgpO31cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzLkNhcmRzXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBMb3ZlTGV0dGVyQ2FyZCA6IENhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgaW50IFZhbHVlIHsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrIFBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9ICgoSGFuZClAaW4pLnBsYXllcjtcclxuICAgICAgICAgICAgYXdhaXQgYmFzZS5QbGF5KCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHBsYXllci5FbmRUdXJuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFJlYWxDYXJkUG9vbCA6IENhcmRQb29sXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8Q2FyZD4gY2FyZHMgPSBuZXcgTGlzdDxDYXJkPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgUmVhbENhcmRQb29sKEhhbmRHYW1lIGdhbWUpIDogYmFzZShnYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEFkZChDYXJkIGNhcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXJkLkBpbiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNhcmRzLkFkZChjYXJkKTtcclxuICAgICAgICAgICAgYmFzZS5BZGQoY2FyZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFJlbW92ZShDYXJkIGNhcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXJkLkBpbiA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICghY2FyZHMuUmVtb3ZlKGNhcmQpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiezB9IGlzIG5vdCBpbiBjb2xsZWN0aW9uLlwiLGNhcmQpKTtcclxuICAgICAgICAgICAgYmFzZS5SZW1vdmUoY2FyZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIENvbnRhaW5zKENhcmQgY2FyZCkge3JldHVybiBjYXJkcy5Db250YWlucyhjYXJkKTt9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTG9jYWxQbGF5ZXIgOiBQbGF5ZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBPblR1cm5TdGFydCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk9uVHVyblN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFtGbGFnc11cclxuICAgICAgICBwcml2YXRlIGVudW0gQWxlcnRTY3JlZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENob29zZUFQbGF5ZXIgPSAxLFxyXG4gICAgICAgICAgICBOYW1lQUNhcmQgPSAyLFxyXG4gICAgICAgICAgICBWaWV3Q2FyZHMgPSA2XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFsZXJ0U2NyZWVuPyBDdXJyZW50QWxlcnRTY3JlZW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBMb2NhbFBsYXllcihIYW5kR2FtZSBHYW1lKSA6IGJhc2UoR2FtZSkgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrPFBsYXllcj4gVGFyZ2V0UGxheWVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEN1cnJlbnRBbGVydFNjcmVlbiA9IEFsZXJ0U2NyZWVuLkNob29zZUFQbGF5ZXI7XHJcbiAgICAgICAgICAgIFBsYXllciByID0gYXdhaXQgKHRhcmdldFBsYXllciA9IG5ldyBUYXNrQ29tcGxldGlvblNvdXJjZTxQbGF5ZXI+KCkpLlRhc2s7XHJcbiAgICAgICAgICAgIHRhcmdldFBsYXllciA9IG51bGw7XHJcbiAgICAgICAgICAgIEN1cnJlbnRBbGVydFNjcmVlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGFza0NvbXBsZXRpb25Tb3VyY2U8UGxheWVyPiB0YXJnZXRQbGF5ZXI7XHJcbiAgICAgICAgVGFza0NvbXBsZXRpb25Tb3VyY2U8VGV4dHVyZTJEPiB0YXJnZXRDYXJkO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSBEaWN0aW9uYXJ5PEFsZXJ0U2NyZWVuLCBzdHJpbmc+IG1lc3NhZ2VzID0gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PEFsZXJ0U2NyZWVuLCBzdHJpbmc+KCksKF9vMSk9PntfbzEuQWRkKEFsZXJ0U2NyZWVuLk5hbWVBQ2FyZCxcIkNob29zZSBhIGNhcmRcIik7X28xLkFkZChBbGVydFNjcmVlbi5DaG9vc2VBUGxheWVyLFwiQ2hvb3NlIGEgcGxheWVyXCIpO19vMS5BZGQoQWxlcnRTY3JlZW4uVmlld0NhcmRzLFwiWW91IGhhdmUgMiBzZWNvbmRzIHRvIGxvb2sgYXQgdGhlc2UgY2FyZHMuXCIpO3JldHVybiBfbzE7fSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBvdmVycmlkZSBUYXNrPFRleHR1cmUyRD4gVGFyZ2V0Q2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDdXJyZW50QWxlcnRTY3JlZW4gPSBBbGVydFNjcmVlbi5OYW1lQUNhcmQ7XHJcbiAgICAgICAgICAgIGNhcmRzVG9EcmF3ID0gR2FtZS5jYXJkSW1hZ2VzO1xyXG4gICAgICAgICAgICB2YXIgciA9IGF3YWl0ICh0YXJnZXRDYXJkID0gbmV3IFRhc2tDb21wbGV0aW9uU291cmNlPFRleHR1cmUyRD4oKSkuVGFzaztcclxuICAgICAgICAgICAgdGFyZ2V0Q2FyZCA9IG51bGw7XHJcbiAgICAgICAgICAgIEN1cnJlbnRBbGVydFNjcmVlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIGNhcmRzVG9EcmF3ID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgdm9pZCBVcGRhdGUgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lLnBsYXllcnNbR2FtZS50dXJuSWR4XSAhPSB0aGlzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoQ3VycmVudEFsZXJ0U2NyZWVuID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb3VzZVN0YXRlID0gTW91c2UuR2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjYXJkIGluIEhhbmQuY2FyZHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEhhbmQuR2V0RHJhd2luZ1Bvc2l0aW9uKGNhcmQpLkRyYXdQb3NpdGlvbi5Db250YWlucyhtb3VzZVN0YXRlLlBvc2l0aW9uKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb3VzZVN0YXRlLkxlZnRCdXR0b24gIT0gQnV0dG9uU3RhdGUuUHJlc3NlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQuSGlnaGxpZ2h0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBjYXJkLlBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkLkhpZ2hsaWdodGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBNb3VzZS5HZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChDdXJyZW50QWxlcnRTY3JlZW4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBbGVydFNjcmVlbi5DaG9vc2VBUGxheWVyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuTGVmdEJ1dHRvbiA9PSBCdXR0b25TdGF0ZS5QcmVzc2VkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIHBsYXllciBpbiBHYW1lLnBsYXllcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllci5Jc0hhbmRtYWlkZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHZXRMb2NhdGlvbk9mKHBsYXllcikuQ29udGFpbnMoc3RhdGUuWCwgc3RhdGUuWSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyICE9IG51bGwgJiYgIXRhcmdldFBsYXllci5UYXNrLklzQ29tcGxldGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGxheWVyLlNldFJlc3VsdChwbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQWxlcnRTY3JlZW4uTmFtZUFDYXJkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBuID0gMDsgbiA8IEdhbWUuY2FyZEltYWdlcy5Db3VudDsgbisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9nZXRDYXJkUG9zaXRpb24obikuQ29udGFpbnMoc3RhdGUuWCwgc3RhdGUuWSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLkxlZnRCdXR0b24gPT0gQnV0dG9uU3RhdGUuUHJlc3NlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHYW1lLmNhcmRJbWFnZXNbbl0gIT0gbnVsbCAmJiAhdGFyZ2V0Q2FyZC5UYXNrLklzQ29tcGxldGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2FyZC5TZXRSZXN1bHQoR2FtZS5jYXJkSW1hZ2VzW25dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IERpY3Rpb25hcnk8QWxlcnRTY3JlZW4sIEFjdGlvbjxMb2NhbFBsYXllcj4+IGhpZ2hsaWdodHMgPSBCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8QWxlcnRTY3JlZW4sIEFjdGlvbjxMb2NhbFBsYXllcj4+KCksKF9vMik9PntfbzIuQWRkKEFsZXJ0U2NyZWVuLkNob29zZUFQbGF5ZXIsQHRoaXMgPT4gQHRoaXMuRHJhd1BsYXllcnMoKSk7X28yLkFkZChBbGVydFNjcmVlbi5OYW1lQUNhcmQsQHRoaXMgPT4gQHRoaXMuRHJhd0NhcmRzKCkpO3JldHVybiBfbzI7fSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLmNhcmRiYWNrLCBuZXcgUmVjdGFuZ2xlKEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuV2lkdGggLSAxNTAgLSBEZWNrLmNhcmRXaWR0aCAtIDIwLCBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAtIERlY2suY2FyZEhlaWdodCwgRGVjay5jYXJkV2lkdGgsIERlY2suY2FyZEhlaWdodCksIENvbG9yLldoZWF0KTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNhcmQgaW4gR2FtZS5kaXNjYXJkUGlsZS5jYXJkcylcclxuICAgICAgICAgICAgICAgIGNhcmQuRHJhdygpO1xyXG4gICAgICAgICAgICBEcmF3SGFuZHMoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHJ1biBpbiBoaWdobGlnaHRzKVxyXG4gICAgICAgICAgICAgICAgaWYgKChydW4uS2V5IHwgQ3VycmVudEFsZXJ0U2NyZWVuKSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bi5WYWx1ZSh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChDdXJyZW50QWxlcnRTY3JlZW4gIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nIGRpc3BsYXllZFRleHQgPSBtZXNzYWdlc1soQWxlcnRTY3JlZW4pQ3VycmVudEFsZXJ0U2NyZWVuXTtcclxuICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLnJlY3RhbmdsZSwgR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5Cb3VuZHMsIG5ldyBDb2xvcihDb2xvci5CbGFjaywgLjlmKSk7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIHRleHRNZXRyaWNzID0gR2FtZS5jaG9pY2VGb250Lk1lYXN1cmVTdHJpbmcoZGlzcGxheWVkVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIHRleHRMb2MgPSAtIHRleHRNZXRyaWNzIC8gMjtcclxuICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLnJlY3RhbmdsZSwgbmV3IFJlY3RhbmdsZSh0ZXh0TG9jLlRvUG9pbnQoKSArIChHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkJvdW5kcy5TaXplLlRvVmVjdG9yMigpIC8gMikuVG9Qb2ludCgpLCB0ZXh0TWV0cmljcy5Ub1BvaW50KCkpLCBDb2xvci5CbHVlVmlvbGV0KTtcclxuICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhd1N0cmluZyhHYW1lLmNob2ljZUZvbnQsIGRpc3BsYXllZFRleHQsIHRleHRMb2MgKyBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkJvdW5kcy5TaXplLlRvVmVjdG9yMigpIC8gMiwgQ29sb3IuQmxhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBydW4gaW4gaGlnaGxpZ2h0cylcclxuICAgICAgICAgICAgICAgIGlmICgocnVuLktleSB8IEN1cnJlbnRBbGVydFNjcmVlbikgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICBydW4uVmFsdWUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIERyYXdIYW5kcyAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgbiA9IDA7IG4gPCBHYW1lLnBsYXllcnMuQ291bnQ7IG4rKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllciA9IEdhbWUucGxheWVyc1tuXTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjYXJkIGluIHBsYXllci5IYW5kLmNhcmRzKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhcmQuRHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIERyYXdQbGF5ZXJzICgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBuID0gMDsgbiA8IEdhbWUucGxheWVycy5Db3VudDsgbisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gR2FtZS5wbGF5ZXJzW25dO1xyXG4gICAgICAgICAgICAgICAgdWludCBjb2xvciA9ICh1aW50KSgweGZmIDw8IChuIDw8IDMpKSArIDB4ZmYwMDAwMDA7XHJcbiAgICAgICAgICAgICAgICBSZWN0YW5nbGUgciA9IEdldExvY2F0aW9uT2YocGxheWVyKTtcclxuICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLnJlY3RhbmdsZSwgciwgbmV3IENvbG9yKGNvbG9yKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmxvc3QpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5zcHJpdGVCYXRjaC5EcmF3KEdhbWUucmVjdGFuZ2xlLCByLCBuZXcgQ29sb3IoQ29sb3IuQmxhY2ssIC41ZikpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLnJlY3RhbmdsZSwgbmV3IFJlY3RhbmdsZShyLkxvY2F0aW9uICsgbmV3IFBvaW50KDM1KSwgbmV3IFBvaW50KDMwKSksIENvbG9yLlJlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwbGF5ZXIuSXNIYW5kbWFpZGVkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLnJlY3RhbmdsZSwgbmV3IFJlY3RhbmdsZShyLkxvY2F0aW9uICsgbmV3IFBvaW50KDM1KSwgbmV3IFBvaW50KDMwKSksIENvbG9yLkJsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoR2FtZS5wbGF5ZXJzW0dhbWUudHVybklkeF0gIT0gcGxheWVyKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhHYW1lLnJlY3RhbmdsZSwgciwgbmV3IENvbG9yKENvbG9yLldoaXRlLCAuMjVmKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFJlY3RhbmdsZSBfZ2V0Q2FyZFBvc2l0aW9uKGludCBpbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGludCBjYXJkV2lkdGggPSBIYW5kLmNhcmRXaWR0aCwgY2FyZEhlaWdodCA9IEhhbmQuY2FyZEhlaWdodDtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5XaWR0aCAvIDIgLSBjYXJkc1RvRHJhdy5Db3VudCAqIGNhcmRXaWR0aCAvIDIgKyBpbmRleCAqIGNhcmRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LkhlaWdodCAtIGNhcmRIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTGlzdDxUZXh0dXJlMkQ+IGNhcmRzVG9EcmF3O1xyXG5cclxuICAgICAgICB2b2lkIERyYXdDYXJkcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQ3VycmVudEFsZXJ0U2NyZWVuID09IEFsZXJ0U2NyZWVuLk5hbWVBQ2FyZCB8fCBDdXJyZW50QWxlcnRTY3JlZW4gPT0gQWxlcnRTY3JlZW4uVmlld0NhcmRzKVxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgbiA9IDA7IG4gPCBjYXJkc1RvRHJhdy5Db3VudDsgbisrKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuc3ByaXRlQmF0Y2guRHJhdyhjYXJkc1RvRHJhd1tuXSwgX2dldENhcmRQb3NpdGlvbihuKSwgQ29sb3IuV2hpdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUmVjdGFuZ2xlIEdldExvY2F0aW9uT2YgKFBsYXllciBwbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgaW5kZXggPSAoKEdhbWUucGxheWVycy5JbmRleE9mKHBsYXllcikgKiA0IC8gR2FtZS5wbGF5ZXJzLkNvdW50ICsgKDIgLyBHYW1lLnBsYXllcnMuQ291bnQpKSArIDIpICUgNDtcclxuICAgICAgICAgICAgdmFyIHNpemUgPSBuZXcgUG9pbnQoMTAwLCAxMDApO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBuZXcgUG9pbnQoXHJcbiAgICAgICAgICAgICAgICAoR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5XaWR0aCAgLSBzaXplLlgpICogKGluZGV4ICUgMiksXHJcbiAgICAgICAgICAgICAgICAoR2FtZS5HcmFwaGljc0RldmljZS5WaWV3cG9ydC5IZWlnaHQgLSBzaXplLlkpICogKGluZGV4IC8gMikpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShwb3NpdGlvbiwgc2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBMb29rQXRDYXJkcyhSZWFsQ2FyZFBvb2wgY2FyZFBvb2wpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXJkc1RvRHJhdyA9IGNhcmRQb29sLmNhcmRzLkNvbnZlcnRBbGw8Z2xvYmFsOjpNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcy5UZXh0dXJlMkQ+KChnbG9iYWw6OlN5c3RlbS5Db252ZXJ0ZXI8Z2xvYmFsOjpIYW5kR2FtZXMuQ2FyZCwgZ2xvYmFsOjpNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcy5UZXh0dXJlMkQ+KSh2ID0+IHYuaW1hZ2UpKTtcclxuICAgICAgICAgICAgQ3VycmVudEFsZXJ0U2NyZWVuID0gQWxlcnRTY3JlZW4uVmlld0NhcmRzO1xyXG4gICAgICAgICAgICBhd2FpdCBUYXNrLkRlbGF5KDIwMDApO1xyXG4gICAgICAgICAgICBDdXJyZW50QWxlcnRTY3JlZW4gPSBudWxsO1xyXG4gICAgICAgICAgICBjYXJkc1RvRHJhdyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIEEgZ2FtZSBvZiBsb3ZlIGxldHRlci5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgTG92ZUxldHRlckdhbWUgOiBIYW5kR2FtZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgQ29udGVudEZvbGRlck5hbWUge2dldHtyZXR1cm4gXCJMb3ZlIExldHRlclwiO319XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlXHJcbiNpZiBXSU5ET1dTXHJcbiAgICAgICAgICAgIERpY3Rpb25hcnlcclxuI2Vsc2VcclxuICAgICAgICAgICAgX0RpY3Rpb25hcnlcclxuI2VuZGlmXHJcbiAgICAgICAgICAgIDxzdHJpbmcsIGludD4gY2FyZHMge2dldHtyZXR1cm4gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ld1xyXG4jaWYgV0lORE9XU1xyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5XHJcbiNlbHNlXHJcbiAgICAgICAgICAgIF9EaWN0aW9uYXJ5XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICA8c3RyaW5nLCBpbnQ+KCksKF9vMyk9PntfbzMuQWRkKFwiR3VhcmRcIiw1KTtfbzMuQWRkKFwiUHJpZXN0XCIsMik7X28zLkFkZChcIkJhcm9uXCIsMik7X28zLkFkZChcIkhhbmRtYWlkXCIsMik7X28zLkFkZChcIlByaW5jZVwiLDIpO19vMy5BZGQoXCJLaW5nXCIsMSk7X28zLkFkZChcIkNvdW50ZXNzXCIsMSk7X28zLkFkZChcIlByaW5jZXNzXCIsMSk7cmV0dXJuIF9vMzt9KTt9fVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIExSQ0VuZ2luZTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgTFJDRW5naW5lXHJcbntcclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgVUlNb3VzZVJlc3BvbmRlclxyXG4gICAge1xyXG4gICAgICAgIFVJTW91c2VSZXNwb25kZXIgR2V0TW91c2VIb3ZlcihWZWN0b3IyIGxvY2FsTW91c2VQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBVSUVsZW1lbnQ6IFVJTW91c2VSZXNwb25kZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVUlDb250YWluZXIgcGFyZW50O1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBVSU1vdXNlUmVzcG9uZGVyIEdldE1vdXNlSG92ZXIoVmVjdG9yMiBsb2NhbE1vdXNlUG9zKTtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgdm9pZCBVcGRhdGUoSW5wdXRTdGF0ZSBpbnB1dFN0YXRlLCBWZWN0b3IyIG9yaWdpbik7XHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKElucHV0U3RhdGUgaW5wdXRTdGF0ZSkgeyBVcGRhdGUoaW5wdXRTdGF0ZSwgVmVjdG9yMi5aZXJvKTsgIH1cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBWZWN0b3IyIG9yaWdpbik7XHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCkgeyBEcmF3KHNwcml0ZUJhdGNoLCBWZWN0b3IyLlplcm8pOyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFVJQ29udGFpbmVyIDpVSUVsZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBvcmlnaW47XHJcbiAgICAgICAgcHVibGljIExpc3Q8VUlFbGVtZW50PiBlbGVtZW50cyA9IG5ldyBMaXN0PFVJRWxlbWVudD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIFVJQ29udGFpbmVyKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVJQ29udGFpbmVyKFZlY3RvcjIgb3JpZ2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVUlNb3VzZVJlc3BvbmRlciBHZXRNb3VzZUhvdmVyKFZlY3RvcjIgbG9jYWxNb3VzZVBvcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgY2hpbGRNb3VzZVBvcyA9IGxvY2FsTW91c2VQb3MgLSBvcmlnaW47XHJcbiAgICAgICAgICAgIGZvcihpbnQgSWR4ID0gZWxlbWVudHMuQ291bnQtMTsgSWR4ID49IDA7IC0tSWR4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVSU1vdXNlUmVzcG9uZGVyIHNlbGVjdGVkID0gZWxlbWVudHNbSWR4XS5HZXRNb3VzZUhvdmVyKGNoaWxkTW91c2VQb3MpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShJbnB1dFN0YXRlIGlucHV0U3RhdGUsIFZlY3RvcjIgb3JpZ2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMiBuZXdPcmlnaW4gPSBvcmlnaW4gKyB0aGlzLm9yaWdpbjtcclxuICAgICAgICAgICAgZm9yZWFjaCAoVUlFbGVtZW50IGVsZW1lbnQgaW4gZWxlbWVudHMpXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LlVwZGF0ZShpbnB1dFN0YXRlLCBuZXdPcmlnaW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgVmVjdG9yMiBvcmlnaW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWZWN0b3IyIG5ld09yaWdpbiA9IG9yaWdpbiArIHRoaXMub3JpZ2luO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChVSUVsZW1lbnQgZWxlbWVudCBpbiBlbGVtZW50cylcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuRHJhdyhzcHJpdGVCYXRjaCwgbmV3T3JpZ2luKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChVSUVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLkFkZChlbGVtZW50KTtcclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnQgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlKFVJRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWxlbWVudHMuUmVtb3ZlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBlbGVtZW50LnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDbGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoKFVJRWxlbWVudCBlbGVtZW50IGluIGVsZW1lbnRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxlbWVudHMuQ2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lcy5DYXJkc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmFyb25DYXJkIDogTG92ZUxldHRlckNhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IFZhbHVlIHtnZXR7cmV0dXJuIDM7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgT25QbGF5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllclxyXG4gICAgICAgICAgICAgICAgbWUgPSAoKEhhbmQpQGluKS5wbGF5ZXI7XHJcbiAgICAgICAgICAgIHZhciBvdGhlciA9IGF3YWl0ICgoSGFuZClAaW4pLnBsYXllci5UYXJnZXRQbGF5ZXIoKTsgLy9Xb3JrYXJvdW5kIGZvciAjMjkzMVxyXG4gICAgICAgICAgICB2YXIgYUNvbXBhcmUgPSAoKExvdmVMZXR0ZXJDYXJkKShvdGhlci5IYW5kLmNhcmRzWzBdKSkuVmFsdWU7XHJcbiAgICAgICAgICAgIHZhciBiQ29tcGFyZSA9ICgoTG92ZUxldHRlckNhcmQpKG1lLkhhbmQuY2FyZHNbMF0pKS5WYWx1ZTsgLy9Xb3JrYXJvdW5kIGZvciAjMjkxOC5cclxuICAgICAgICAgICAgc3dpdGNoIChhQ29tcGFyZS5Db21wYXJlVG8oYkNvbXBhcmUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIC0xOiAvLyBHb29kIGZvciBtZVxyXG4gICAgICAgICAgICAgICAgICAgIG90aGVyLkxvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTogLy8gQmFkIGZvciBtZVxyXG4gICAgICAgICAgICAgICAgICAgIG1lLkxvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzLkNhcmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDb3VudGVzc0NhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gNzt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lcy5DYXJkc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR3VhcmRDYXJkIDogTG92ZUxldHRlckNhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IFZhbHVlIHtnZXR7cmV0dXJuIDE7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgT25QbGF5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBhd2FpdCAoKEhhbmQpQGluKS5wbGF5ZXIuVGFyZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXR0ZWRDYXJkID0gYXdhaXQgKChIYW5kKUBpbikucGxheWVyLlRhcmdldENhcmQoKTsgLy9Xb3JrYXJvdW5kIGZvciAjMjkxOC5cclxuICAgICAgICAgICAgaWYgKHBsYXllci5IYW5kLmNhcmRzWzBdLmltYWdlID09IHRhcmdldHRlZENhcmQpXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuTG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzLkNhcmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIYW5kbWFpZENhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gNDt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgKChIYW5kKUBpbikucGxheWVyLklzSGFuZG1haWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXMuQ2FyZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEtpbmdDYXJkIDogTG92ZUxldHRlckNhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IFZhbHVlIHtnZXR7cmV0dXJuIDY7fX1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIFRhc2sgT25QbGF5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZSA9ICgoSGFuZClAaW4pLnBsYXllcjtcclxuICAgICAgICAgICAgdmFyIG90aGVyID0gYXdhaXQgbWUuVGFyZ2V0UGxheWVyKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IG1lLkhhbmQuY2FyZHNbMF0uTW92ZUNhcmRUbyhvdGhlci5IYW5kKTtcclxuICAgICAgICAgICAgYXdhaXQgb3RoZXIuSGFuZC5jYXJkc1swXS5Nb3ZlQ2FyZFRvKG1lLkhhbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhhbmRHYW1lcy5DYXJkc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJpZXN0Q2FyZCA6IExvdmVMZXR0ZXJDYXJkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBWYWx1ZSB7Z2V0e3JldHVybiAyO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrIE9uUGxheSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhd2FpdCAoKEhhbmQpQGluKS5wbGF5ZXIuTG9va0F0Q2FyZHMoKGF3YWl0ICgoSGFuZClAaW4pLnBsYXllci5UYXJnZXRQbGF5ZXIoKSkuSGFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXMuQ2FyZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFByaW5jZUNhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gNTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIEBpbiA9IChhd2FpdCAoKEhhbmQpdGhpcy5AaW4pLnBsYXllci5UYXJnZXRQbGF5ZXIoKSkuSGFuZDtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHYgaW4gKChIYW5kKUBpbikuY2FyZHMpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB2Lk1vdmVDYXJkVG8oQGluLkdhbWUuZGlzY2FyZFBpbGUpO1xyXG4gICAgICAgICAgICBhd2FpdCBAaW4uR2FtZS5Ub3BDYXJkKCkuTW92ZUNhcmRUbyhAaW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSGFuZEdhbWVzLkNhcmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcmluY2Vzc0NhcmQgOiBMb3ZlTGV0dGVyQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgVmFsdWUge2dldHtyZXR1cm4gODt9fVxyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgQ1MxOTk4IC8vIEFzeW5jIG1ldGhvZCBsYWNrcyAnYXdhaXQnIG9wZXJhdG9ycyBhbmQgd2lsbCBydW4gc3luY2hyb25vdXNseVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrIE9uRGlzY2FyZCgpXHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIENTMTk5OCAvLyBBc3luYyBtZXRob2QgbGFja3MgJ2F3YWl0JyBvcGVyYXRvcnMgYW5kIHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICgoSGFuZClAaW4pLnBsYXllci5Mb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzayBPblBsYXkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERlY2sgOiBSZWFsQ2FyZFBvb2xcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRXaWR0aCA9IDE1MDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRIZWlnaHQgPSAyMDk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEZWNrKEhhbmRHYW1lIGdhbWUpIDogYmFzZShnYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBEcmF3SW5mbyBHZXREcmF3aW5nUG9zaXRpb24oQ2FyZCBjYXJkKSB7cmV0dXJuIG5ldyBEcmF3SW5mb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1Bvc2l0aW9uID0gbmV3IFJlY3RhbmdsZShHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC0gMTUwIC0gY2FyZFdpZHRoIC0gMjAsIEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC0gY2FyZEhlaWdodCwgY2FyZFdpZHRoLCBjYXJkSGVpZ2h0KSxcclxuICAgICAgICAgICAgUGVybWlzc2lvbnMgPSBEcmF3SW5mby5EcmF3UGVybWlzc2lvbi5BbmltYXRhYmxlXHJcbiAgICAgICAgfTt9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERpc2NhcmRQaWxlIDogUmVhbENhcmRQb29sXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIERpc2NhcmRQaWxlKEhhbmRHYW1lIGdhbWUpIDogYmFzZShnYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgY2FyZFdpZHRoID0gSGFuZC5jYXJkV2lkdGggLyAyO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgY2FyZEhlaWdodCA9IEhhbmQuY2FyZEhlaWdodCAvIDI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBEcmF3SW5mbyBHZXREcmF3aW5nUG9zaXRpb24oQ2FyZCBjYXJkKSB7cmV0dXJuIG5ldyBEcmF3SW5mb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3UG9zaXRpb24gPSBuZXcgUmVjdGFuZ2xlKEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuV2lkdGggLSAxMDAgLSBjYXJkV2lkdGggLSAxMCwgKEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC0gY2FyZEhlaWdodCkgLyAyLCBjYXJkV2lkdGgsIGNhcmRIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgUGVybWlzc2lvbnMgPSBjYXJkc1tjYXJkcy5Db3VudCAtIDFdID09IGNhcmQgPyBEcmF3SW5mby5EcmF3UGVybWlzc2lvbi5EcmF3YWJsZSA6IERyYXdJbmZvLkRyYXdQZXJtaXNzaW9uLkFuaW1hdGFibGVcclxuICAgICAgICAgICAgfTt9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxuXHJcbm5hbWVzcGFjZSBIYW5kR2FtZXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhhbmQgOiBSZWFsQ2FyZFBvb2xcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRXaWR0aCA9IDE1MDtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IGNhcmRIZWlnaHQgPSAyMDk7XHJcbiAgICAgICAgcHVibGljIFBsYXllciBwbGF5ZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIYW5kKEhhbmRHYW1lIGdhbWUsIFBsYXllciBwbGF5ZXIpIDogYmFzZShnYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgRHJhd0luZm8gR2V0RHJhd2luZ1Bvc2l0aW9uKENhcmQgY2FyZCkge3JldHVybiBuZXcgRHJhd0luZm9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd1Bvc2l0aW9uID0gbmV3IFJlY3RhbmdsZShcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLkdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC8gMiAtIGNhcmRzLkNvdW50ICogY2FyZFdpZHRoIC8gMiArIGNhcmRzLkluZGV4T2YoY2FyZCkgKiBjYXJkV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgKEdhbWUuR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuSGVpZ2h0IC0gY2FyZEhlaWdodCkgKiAoKCgoR2FtZS5wbGF5ZXJzLkluZGV4T2YocGxheWVyKSAqIDQgLyBHYW1lLnBsYXllcnMuQ291bnQgKyAoMiAvIEdhbWUucGxheWVycy5Db3VudCkpICsgMikgJSA0KSAvIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBjYXJkSGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgIFBlcm1pc3Npb25zID0gRHJhd0luZm8uRHJhd1Blcm1pc3Npb24uRHJhd2FibGUsXHJcbiAgICAgICAgICAgICAgICBTaG93Q2FyZEJhY2sgPSBHYW1lLnVpICE9IHBsYXllclxyXG4gICAgICAgICAgICB9O31cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
