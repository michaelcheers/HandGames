using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandGames
{
    /// <summary>
    /// A game of love letter.
    /// </summary>
    public class LoveLetterGame : HandGame
    {
        public override string ContentFolderName => "Love Letter";
        public override
#if WINDOWS
            Dictionary
#else
            _Dictionary
#endif
            <string, int> cards => new
#if WINDOWS
            Dictionary
#else
            _Dictionary
#endif
            <string, int>
        {
            { "Guard", 5 },
            { "Priest", 2 },
            { "Baron", 2 },
            { "Handmaid", 2 },
            { "Prince", 2 },
            { "King", 1 },
            { "Countess", 1 },
            { "Princess", 1 }
        };
    }
}
