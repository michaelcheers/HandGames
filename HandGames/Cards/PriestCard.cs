﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames.Cards
{
    public class PriestCard : LoveLetterCard
    {
        public override int Value => 2;

        public override async Task OnPlay()
        {
            await Caster.LookAtHand(await Caster.TargetPlayer());
        }
    }
}
