using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace HandGames
{
    /// <summary>
    /// This is the main type for your game.
    /// </summary>
    public abstract class HandGame : Game
    {
        GraphicsDeviceManager graphics;
        public SpriteBatch spriteBatch;
        public List<Player> players = new List<Player>();
        public Player won;
        public abstract string ContentFolderName { get; }
        public abstract
#if !WINDOWS
            _Dictionary
#else
            Dictionary
#endif
            <string, int> cards
        { get; }
        public List<Texture2D> cardImages;

        public HandGame()
        {
            graphics = new GraphicsDeviceManager(this)
            {
                IsFullScreen = true,
                PreferredBackBufferWidth = 1366,
                PreferredBackBufferHeight = 768
            };
            Content.RootDirectory = "Content";
            IsMouseVisible = true;
        }

        /// <summary>
        /// Allows the game to perform any initialization it needs to before starting to run.
        /// This is where it can query for any required services and load any non-graphic
        /// related content.  Calling base.Initialize will enumerate through any components
        /// and initialize them as well.
        /// </summary>
        protected override void Initialize()
        {
            // TODO: Add your initialization logic here

            base.Initialize();
        }

        public Texture2D cardback;
        public DiscardPile discardPile;

        /// <summary>
        /// LoadContent will be called once per game and is the place to load
        /// all of your content.
        /// </summary>
        protected override void LoadContent()
        {
            // Create a new SpriteBatch, which can be used to draw textures.
            spriteBatch = new SpriteBatch(GraphicsDevice);
            cardImages = new List<Texture2D>();
            deck = new Deck(this);
            discardPile = new DiscardPile(this);
            // TODO: use this.Content to load your game content here
            font = Content.Load<SpriteFont>("Arial");
            largeFont = Content.Load<SpriteFont>("Choice Text");
            rectangle = Content.Load<Texture2D>("white");
            cardback = Content.Load<Texture2D>($"{ContentFolderName}/cardback");
            players.Add(ui = new LocalPlayer(this));
            players.Add(new AIPlayer(this));
            do
            {
                int n = 0;
                foreach (var cardKeyPair in cards)
                {
                    var image = Content.Load<Texture2D>($"{ContentFolderName}/{n + 1}{cardKeyPair.Key}");
                    cardImages.Add(image);
                    for (int idx = 0; idx < cardKeyPair.Value; idx++)
                    {
                        Card card = (Card)Assembly.GetExecutingAssembly().GetType($"HandGames.Cards.{cardKeyPair.Key}Card").GetConstructor(new Type[] { }).Invoke(new object[0]);
                        card.image = image;
                        deck.Add(card);
                    }
                    n++;
                }
            }
            while (false);
            StartNewGame();
        }

        public Card TopCard() => deck.cards[0];

        public int turnIdx;
        Random rnd = new Random();

        void ShuffleDeck()
        {

            int n = deck.cards.Count;
            while (n > 1)
            {
                n--;
                int k = rnd.Next(n + 1);
                var value = deck.cards[k];
                deck.cards[k] = deck.cards[n];
                deck.cards[n] = value;
            }
        }

        public void StartNewGame()
        {
            ShuffleDeck();
            players.ForEach(player =>
            {
                for (int i = 0; i < 1; i++)
                {
                    var topCard = TopCard();
                    deck.Remove(topCard);
                    player.Hand.Add(topCard);
                }
            });
            players[turnIdx].OnTurnStart();
        }

        public Texture2D rectangle;
        public Deck deck;
        public LocalPlayer ui;
        public SpriteFont font, largeFont;

        /// <summary>
        /// UnloadContent will be called once per game and is the place to unload
        /// game-specific content.
        /// </summary>
        protected override void UnloadContent()
        {
            // TODO: Unload any non ContentManager content here
        }

        /// <summary>
        /// Allows the game to run logic such as updating the world,
        /// checking for collisions, gathering input, and playing audio.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Update(GameTime gameTime)
        {
#if WINDOWS
            if (Keyboard.GetState().IsKeyDown(Microsoft.Xna.Framework.Input.Keys.Escape))
            {
                Exit();
            }
#endif
            // TODO: Add your update logic here
            bool _holdingDown = Mouse.GetState().LeftButton == ButtonState.Pressed;
            LastMouseDown = _holdingDown && !holdingDown;
            holdingDown = _holdingDown;
            if (won == null)
                ui.Update();
            base.Update(gameTime);
        }

        public bool LastMouseDown;
        bool holdingDown;

        /// <summary>
        /// This is called when the game should draw itself.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);

            // TODO: Add your drawing code here

#if WINDOWS
            spriteBatch.Begin(blendState: BlendState.AlphaBlend);
#else
            spriteBatch.Begin();
#endif
            ui.Draw();
            if (won != null)
            {
                string text = $"{won.GetType().Name} has won.";
                var measure = largeFont.MeasureString(text);
                spriteBatch.DrawString(largeFont, text, new Vector2(y: (GraphicsDevice.Viewport.Height - measure.Y) / 2, x: (GraphicsDevice.Viewport.Width - measure.X) / 2), Color.Red);
            }
            spriteBatch.End();

            base.Draw(gameTime);
        }
    }
}
