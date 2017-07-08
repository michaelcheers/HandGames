using Microsoft.Xna.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames
{
    public class Deck : RealCardPool
    {
        public const int cardWidth = 150;
        public const int cardHeight = 209;

        public Deck(HandGame game) : base(game)
        {
        }

        public override DrawInfo GetDrawingPosition(Card card) => new DrawInfo
        {
            DrawPosition = new Rectangle(Game.GraphicsDevice.Viewport.Width - 150 - cardWidth - 20, Game.GraphicsDevice.Viewport.Height - cardHeight, cardWidth, cardHeight),
            Permissions = DrawInfo.DrawPermission.Animatable
        };
    }
}
