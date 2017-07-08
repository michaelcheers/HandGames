using Microsoft.Xna.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames
{
    public abstract class CardPool
    {
        public CardPool (HandGame game)
        {
            Game = game;
        }
        public virtual void Add(Card card)
        {
            card.@in = this;
        }
        public virtual void Remove(Card card)
        {
            if (card.@in == this)
                card.@in = null;
        }
        public abstract bool Contains(Card card);
        public abstract DrawInfo GetDrawingPosition(Card card);
        public HandGame Game;
    }
}
