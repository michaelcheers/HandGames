using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames
{
    public abstract class RealCardPool : CardPool
    {
        public List<Card> cards = new List<Card>();

        public RealCardPool(HandGame game) : base(game)
        {
        }

        public override void Add(Card card)
        {
            card.@in = this;
            cards.Add(card);
            base.Add(card);
        }
        public override void Remove(Card card)
        {
            card.@in = null;
            if (!cards.Remove(card))
                throw new Exception($"{card} is not in collection.");
            base.Remove(card);
        }
        public override bool Contains(Card card) => cards.Contains(card);
    }
}
