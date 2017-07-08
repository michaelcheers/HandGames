Bridge.assembly("HandGames", function ($asm, globals) {
    "use strict";

    Bridge.define("System.Collections.DictionaryEntry", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new System.Collections.DictionaryEntry(); }
            }
        },
        fields: {
            _key: null,
            _value: null
        },
        props: {
            Key: {
                get: function () {
                    return this._key;
                },
                set: function (value) {
                    this._key = value;
                }
            },
            Value: {
                get: function () {
                    return this._value;
                },
                set: function (value) {
                    this._value = value;
                }
            }
        },
        ctors: {
            $ctor1: function (key, value) {
                this.$initialize();
                this._key = key;
                this._value = value;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([5445305491, this._key, this._value]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, System.Collections.DictionaryEntry)) {
                    return false;
                }
                return Bridge.equals(this._key, o._key) && Bridge.equals(this._value, o._value);
            },
            $clone: function (to) {
                var s = to || new System.Collections.DictionaryEntry();
                s._key = this._key;
                s._value = this._value;
                return s;
            }
        }
    });

    Bridge.define("System.Collections.Generic._Dictionary$2", function (TKey, TValue) { return {
        inherits: [System.Collections.Generic.IDictionary$2(TKey,TValue),System.Collections.IDictionary,System.Collections.Generic.IReadOnlyDictionary$2(TKey,TValue)],
        statics: {
            fields: {
                VersionName: null,
                HashSizeName: null,
                KeyValuePairsName: null,
                ComparerName: null
            },
            ctors: {
                init: function () {
                    this.VersionName = "Version";
                    this.HashSizeName = "HashSize";
                    this.KeyValuePairsName = "KeyValuePairs";
                    this.ComparerName = "Comparer";
                }
            },
            methods: {
                IsCompatibleKey: function (key) {
                    if (key == null) {
                        throw new System.ArgumentNullException();
                    }
                    return (Bridge.is(key, TKey));
                }
            }
        },
        fields: {
            buckets: null,
            entries: null,
            count: 0,
            version: 0,
            freeList: 0,
            freeCount: 0,
            comparer: null,
            keys: null,
            values: null
        },
        props: {
            Comparer: {
                get: function () {
                    return this.comparer;
                }
            },
            Count: {
                get: function () {
                    return ((this.count - this.freeCount) | 0);
                }
            },
            Keys: {
                get: function () {
if (this.keys == null) {
                        this.keys = new (System.Collections.Generic._Dictionary$2.KeyCollection(TKey,TValue))(this);
                    }
                    return this.keys;
                }
            },
            System$Collections$Generic$IDictionary$2$Keys: {
                get: function () {
                    if (this.keys == null) {
                        this.keys = new (System.Collections.Generic._Dictionary$2.KeyCollection(TKey,TValue))(this);
                    }
                    return this.keys;
                }
            },
            System$Collections$Generic$IReadOnlyDictionary$2$Keys: {
                get: function () {
                    if (this.keys == null) {
                        this.keys = new (System.Collections.Generic._Dictionary$2.KeyCollection(TKey,TValue))(this);
                    }
                    return this.keys;
                }
            },
            Values: {
                get: function () {
if (this.values == null) {
                        this.values = new (System.Collections.Generic._Dictionary$2.ValueCollection(TKey,TValue))(this);
                    }
                    return this.values;
                }
            },
            System$Collections$Generic$IDictionary$2$Values: {
                get: function () {
                    if (this.values == null) {
                        this.values = new (System.Collections.Generic._Dictionary$2.ValueCollection(TKey,TValue))(this);
                    }
                    return this.values;
                }
            },
            System$Collections$Generic$IReadOnlyDictionary$2$Values: {
                get: function () {
                    if (this.values == null) {
                        this.values = new (System.Collections.Generic._Dictionary$2.ValueCollection(TKey,TValue))(this);
                    }
                    return this.values;
                }
            },
            System$Collections$Generic$ICollection$1$IsReadOnly: {
                get: function () {
                    return false;
                }
            },
            System$Collections$IDictionary$IsFixedSize: {
                get: function () {
                    return false;
                }
            },
            System$Collections$IDictionary$IsReadOnly: {
                get: function () {
                    return false;
                }
            },
            System$Collections$IDictionary$Keys: {
                get: function () {
                    return Bridge.cast(this.Keys, System.Collections.ICollection);
                }
            },
            System$Collections$IDictionary$Values: {
                get: function () {
                    return Bridge.cast(this.Values, System.Collections.ICollection);
                }
            }
        },
        alias: [
            "Count", "System$Collections$Generic$IReadOnlyCollection$1$System$Collections$Generic$KeyValuePair$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$Count",
            "Count", "System$Collections$ICollection$Count",
            "Count", "System$Collections$Generic$ICollection$1$System$Collections$Generic$KeyValuePair$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$Count",
            "System$Collections$Generic$IDictionary$2$Keys", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$Keys",
            "System$Collections$Generic$IReadOnlyDictionary$2$Keys", "System$Collections$Generic$IReadOnlyDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$Keys",
            "System$Collections$Generic$IDictionary$2$Values", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$Values",
            "System$Collections$Generic$IReadOnlyDictionary$2$Values", "System$Collections$Generic$IReadOnlyDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$Values",
            "getItem", "System$Collections$Generic$IReadOnlyDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getItem",
            "setItem", "System$Collections$Generic$IReadOnlyDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$setItem",
            "getItem", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getItem",
            "setItem", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$setItem",
            "add", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$add",
            "System$Collections$Generic$ICollection$1$add", "System$Collections$Generic$ICollection$1$System$Collections$Generic$KeyValuePair$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$add",
            "System$Collections$Generic$ICollection$1$contains", "System$Collections$Generic$ICollection$1$System$Collections$Generic$KeyValuePair$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$contains",
            "System$Collections$Generic$ICollection$1$remove", "System$Collections$Generic$ICollection$1$System$Collections$Generic$KeyValuePair$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$remove",
            "clear", "System$Collections$IDictionary$clear",
            "clear", "System$Collections$Generic$ICollection$1$System$Collections$Generic$KeyValuePair$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$clear",
            "containsKey", "System$Collections$Generic$IReadOnlyDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$containsKey",
            "containsKey", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$containsKey",
            "System$Collections$Generic$IEnumerable$1$getEnumerator", "System$Collections$Generic$IEnumerable$1$System$Collections$Generic$KeyValuePair$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getEnumerator",
            "remove", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$remove",
            "tryGetValue", "System$Collections$Generic$IReadOnlyDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$tryGetValue",
            "tryGetValue", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$tryGetValue",
            "System$Collections$Generic$ICollection$1$IsReadOnly", "System$Collections$Generic$ICollection$1$System$Collections$Generic$KeyValuePair$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$IsReadOnly",
            "System$Collections$Generic$ICollection$1$copyTo", "System$Collections$Generic$ICollection$1$System$Collections$Generic$KeyValuePair$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$copyTo"
        ],
        ctors: {
            ctor: function () {
                System.Collections.Generic._Dictionary$2(TKey,TValue).$ctor5.call(this, 0, null);
            },
            $ctor4: function (capacity) {
                System.Collections.Generic._Dictionary$2(TKey,TValue).$ctor5.call(this, capacity, null);
            },
            $ctor3: function (comparer) {
                System.Collections.Generic._Dictionary$2(TKey,TValue).$ctor5.call(this, 0, comparer);
            },
            $ctor5: function (capacity, comparer) {
                this.$initialize();
                if (capacity < 0) {
                    throw new System.ArgumentOutOfRangeException();
                }
                if (capacity > 0) {
                    this.Initialize(capacity);
                }
                this.comparer = comparer || System.Collections.Generic.EqualityComparer$1(TKey).def;

            },
            $ctor1: function (dictionary) {
                System.Collections.Generic._Dictionary$2(TKey,TValue).$ctor2.call(this, dictionary, null);
            },
            $ctor2: function (dictionary, comparer) {
                System.Collections.Generic._Dictionary$2(TKey,TValue).$ctor5.call(this, dictionary != null ? System.Array.getCount(dictionary, System.Collections.Generic.KeyValuePair$2(TKey,TValue)) : 0, comparer);
                var $t;

                if (dictionary == null) {
                    throw new System.ArgumentNullException();
                }

                $t = Bridge.getEnumerator(dictionary, System.Collections.Generic.KeyValuePair$2(TKey,TValue));
                try {
                    while ($t.moveNext()) {
                        var pair = $t.Current;
                        this.add(pair.key, pair.value);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }}
    },
    methods: {
        getItem: function (key) {
            var i = this.FindEntry(key);
            if (i >= 0) {
                return this.entries[System.Array.index(i, this.entries)].value;
            }
            throw new System.Collections.Generic.KeyNotFoundException();
        },
        setItem: function (key, value) {
            this.Insert(key, value, false);
        },
        System$Collections$IDictionary$getItem: function (key) {
            if (System.Collections.Generic._Dictionary$2(TKey,TValue).IsCompatibleKey(key)) {
                var i = this.FindEntry(Bridge.cast(Bridge.unbox(key), TKey));
                if (i >= 0) {
                    return this.entries[System.Array.index(i, this.entries)].value;
                }
            }
            return null;
        },
        System$Collections$IDictionary$setItem: function (key, value) {
            if (key == null) {
                throw new System.ArgumentNullException();
            }
            if (value == null) {
                throw new System.ArgumentNullException();
            }

            try {
                var tempKey = Bridge.cast(Bridge.unbox(key), TKey);
                try {
                    this.setItem(tempKey, Bridge.cast(Bridge.unbox(value), TValue));
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    if (Bridge.is($e1, System.InvalidCastException)) {
                        throw new System.Exception();
                    } else {
                        throw $e1;
                    }
                }
            }
            catch ($e2) {
                $e2 = System.Exception.create($e2);
                if (Bridge.is($e2, System.InvalidCastException)) {
                    throw new System.Exception();
                } else {
                    throw $e2;
                }
            }
        },
        add: function (key, value) {
            this.Insert(key, value, true);
        },
        System$Collections$Generic$ICollection$1$add: function (keyValuePair) {
            this.add(keyValuePair.key, keyValuePair.value);
        },
        System$Collections$IDictionary$add: function (key, value) {
            if (key == null) {
                throw new System.ArgumentNullException();
            }
            if (value == null) {
                throw new System.ArgumentNullException();
            }

            try {
                var tempKey = Bridge.cast(Bridge.unbox(key), TKey);

                try {
                    this.add(tempKey, Bridge.cast(Bridge.unbox(value), TValue));
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    if (Bridge.is($e1, System.InvalidCastException)) {
                        throw new System.ArgumentException();
                    } else {
                        throw $e1;
                    }
                }
            }
            catch ($e2) {
                $e2 = System.Exception.create($e2);
                if (Bridge.is($e2, System.InvalidCastException)) {
                    throw new System.ArgumentException();
                } else {
                    throw $e2;
                }
            }
        },
        System$Collections$Generic$ICollection$1$contains: function (keyValuePair) {
            var i = this.FindEntry(keyValuePair.key);
            if (i >= 0 && System.Collections.Generic.EqualityComparer$1(TValue).def.equals2(this.entries[System.Array.index(i, this.entries)].value, keyValuePair.value)) {
                return true;
            }
            return false;
        },
        System$Collections$IDictionary$contains: function (key) {
            if (System.Collections.Generic._Dictionary$2(TKey,TValue).IsCompatibleKey(key)) {
                return this.containsKey(Bridge.cast(Bridge.unbox(key), TKey));
            }

            return false;
        },
        System$Collections$Generic$ICollection$1$remove: function (keyValuePair) {
            var i = this.FindEntry(keyValuePair.key);
            if (i >= 0 && System.Collections.Generic.EqualityComparer$1(TValue).def.equals2(this.entries[System.Array.index(i, this.entries)].value, keyValuePair.value)) {
                this.remove(keyValuePair.key);
                return true;
            }
            return false;
        },
        remove: function (key) {
            if (key == null) {
                throw new System.ArgumentNullException();
            }

            if (this.buckets != null) {
                var hashCode = this.comparer[Bridge.geti(this.comparer, "System$Collections$Generic$IEqualityComparer$1$" + Bridge.getTypeAlias(TKey) + "$getHashCode2", "System$Collections$Generic$IEqualityComparer$1$getHashCode2")](key) & 2147483647;
                var bucket = hashCode % this.buckets.length;
                var last = -1;
                for (var i = this.buckets[System.Array.index(bucket, this.buckets)]; i >= 0; last = i, i = this.entries[System.Array.index(i, this.entries)].next) {
                    if (this.entries[System.Array.index(i, this.entries)].hashCode === hashCode && this.comparer[Bridge.geti(this.comparer, "System$Collections$Generic$IEqualityComparer$1$" + Bridge.getTypeAlias(TKey) + "$equals2", "System$Collections$Generic$IEqualityComparer$1$equals2")](this.entries[System.Array.index(i, this.entries)].key, key)) {
                        if (last < 0) {
                            this.buckets[System.Array.index(bucket, this.buckets)] = this.entries[System.Array.index(i, this.entries)].next;
                        } else {
                            this.entries[System.Array.index(last, this.entries)].next = this.entries[System.Array.index(i, this.entries)].next;
                        }
                        this.entries[System.Array.index(i, this.entries)].hashCode = -1;
                        this.entries[System.Array.index(i, this.entries)].next = this.freeList;
                        this.entries[System.Array.index(i, this.entries)].key = Bridge.getDefaultValue(TKey);
                        this.entries[System.Array.index(i, this.entries)].value = Bridge.getDefaultValue(TValue);
                        this.freeList = i;
                        this.freeCount = (this.freeCount + 1) | 0;
                        this.version = (this.version + 1) | 0;
                        return true;
                    }
                }
            }
            return false;
        },
        System$Collections$IDictionary$remove: function (key) {
            if (System.Collections.Generic._Dictionary$2(TKey,TValue).IsCompatibleKey(key)) {
                this.remove(Bridge.cast(Bridge.unbox(key), TKey));
            }
        },
        clear: function () {
            if (this.count > 0) {
                for (var i = 0; i < this.buckets.length; i = (i + 1) | 0) {
                    this.buckets[System.Array.index(i, this.buckets)] = -1;
                }
                System.Array.fill(this.entries, System.Collections.Generic._Dictionary$2.Entry(TKey,TValue).getDefaultValue, 0, this.count);
                this.freeList = -1;
                this.count = 0;
                this.freeCount = 0;
                this.version = (this.version + 1) | 0;
            }
        },
        containsKey: function (key) {
            return this.FindEntry(key) >= 0;
        },
        ContainsValue: function (value) {
            if (value == null) {
                for (var i = 0; i < this.count; i = (i + 1) | 0) {
                    if (this.entries[System.Array.index(i, this.entries)].hashCode >= 0 && this.entries[System.Array.index(i, this.entries)].value == null) {
                        return true;
                    }
                }
            } else {
                var c = System.Collections.Generic.EqualityComparer$1(TValue).def;
                for (var i1 = 0; i1 < this.count; i1 = (i1 + 1) | 0) {
                    if (this.entries[System.Array.index(i1, this.entries)].hashCode >= 0 && c.equals2(this.entries[System.Array.index(i1, this.entries)].value, value)) {
                        return true;
                    }
                }
            }
            return false;
        },
        CopyTo: function (array, index) {
            if (array == null) {
                throw new System.ArgumentNullException();
            }

            if (index < 0 || index > array.length) {
                throw new System.ArgumentOutOfRangeException();
            }

            if (((array.length - index) | 0) < this.Count) {
                throw new System.ArgumentException();
            }

            var count = this.count;
            var entries = this.entries;
            for (var i = 0; i < count; i = (i + 1) | 0) {
                if (entries[System.Array.index(i, entries)].hashCode >= 0) {
                    array[System.Array.index(Bridge.identity(index, (index = (index + 1) | 0)), array)] = new (System.Collections.Generic.KeyValuePair$2(TKey,TValue))(entries[System.Array.index(i, entries)].key, entries[System.Array.index(i, entries)].value);
                }
            }
        },
        System$Collections$Generic$ICollection$1$copyTo: function (array, index) {
            this.CopyTo(array, index);
        },
        System$Collections$ICollection$copyTo: function (array, index) {
            if (array == null) {
                throw new System.ArgumentNullException();
            }

            if (System.Array.getRank(array) !== 1) {
                throw new System.ArgumentException();
            }

            if (System.Array.getLower(array, 0) !== 0) {
                throw new System.ArgumentException();
            }

            if (index < 0 || index > array.length) {
                throw new System.ArgumentOutOfRangeException();
            }

            if (((array.length - index) | 0) < this.Count) {
                throw new System.ArgumentException();
            }

            var pairs = Bridge.as(array, System.Array.type(System.Collections.Generic.KeyValuePair$2(TKey,TValue)));
            if (pairs != null) {
                this.CopyTo(pairs, index);
            } else if (Bridge.is(array, System.Array.type(System.Collections.DictionaryEntry))) {
                var dictEntryArray = Bridge.as(array, System.Array.type(System.Collections.DictionaryEntry));
                var entries = this.entries;
                for (var i = 0; i < this.count; i = (i + 1) | 0) {
                    if (entries[System.Array.index(i, entries)].hashCode >= 0) {
                        dictEntryArray[System.Array.index(Bridge.identity(index, (index = (index + 1) | 0)), dictEntryArray)] = new System.Collections.DictionaryEntry.$ctor1(entries[System.Array.index(i, entries)].key, entries[System.Array.index(i, entries)].value);
                    }
                }
            } else {
                var objects = Bridge.as(array, System.Array.type(System.Object));
                if (objects == null) {
                    throw new System.ArgumentException();
                }

                var count = this.count;
                var entries1 = this.entries;
                for (var i1 = 0; i1 < count; i1 = (i1 + 1) | 0) {
                    if (entries1[System.Array.index(i1, entries1)].hashCode >= 0) {
                        objects[System.Array.index(Bridge.identity(index, (index = (index + 1) | 0)), objects)] = new (System.Collections.Generic.KeyValuePair$2(TKey,TValue))(entries1[System.Array.index(i1, entries1)].key, entries1[System.Array.index(i1, entries1)].value);
                    }
                }
            }
        },
        GetEnumerator: function () {
            return new (System.Collections.Generic._Dictionary$2.Enumerator(TKey,TValue)).$ctor1(this, System.Collections.Generic._Dictionary$2.Enumerator(TKey,TValue).KeyValuePair);
        },
        System$Collections$Generic$IEnumerable$1$getEnumerator: function () {
            return new (System.Collections.Generic._Dictionary$2.Enumerator(TKey,TValue)).$ctor1(this, System.Collections.Generic._Dictionary$2.Enumerator(TKey,TValue).KeyValuePair).$clone();
        },
        System$Collections$IEnumerable$getEnumerator: function () {
            return new (System.Collections.Generic._Dictionary$2.Enumerator(TKey,TValue)).$ctor1(this, System.Collections.Generic._Dictionary$2.Enumerator(TKey,TValue).KeyValuePair).$clone();
        },
        System$Collections$IDictionary$getEnumerator: function () {
            return new (System.Collections.Generic._Dictionary$2.Enumerator(TKey,TValue)).$ctor1(this, System.Collections.Generic._Dictionary$2.Enumerator(TKey,TValue).DictEntry).$clone();
        },
        FindEntry: function (key) {
            if (key == null) {
                throw new System.ArgumentNullException();
            }

            if (this.buckets != null) {
                var hashCode = this.comparer[Bridge.geti(this.comparer, "System$Collections$Generic$IEqualityComparer$1$" + Bridge.getTypeAlias(TKey) + "$getHashCode2", "System$Collections$Generic$IEqualityComparer$1$getHashCode2")](key) & 2147483647;
                for (var i = this.buckets[System.Array.index(hashCode % this.buckets.length, this.buckets)]; i >= 0; i = this.entries[System.Array.index(i, this.entries)].next) {
                    if (this.entries[System.Array.index(i, this.entries)].hashCode === hashCode && this.comparer[Bridge.geti(this.comparer, "System$Collections$Generic$IEqualityComparer$1$" + Bridge.getTypeAlias(TKey) + "$equals2", "System$Collections$Generic$IEqualityComparer$1$equals2")](this.entries[System.Array.index(i, this.entries)].key, key)) {
                        return i;
                    }
                }
            }
            return -1;
        },
        Initialize: function (capacity) {
            var size = System.Collections._HashHelpers.GetPrime(capacity);
            this.buckets = System.Array.init(size, 0, System.Int32);
            for (var i = 0; i < this.buckets.length; i = (i + 1) | 0) {
                this.buckets[System.Array.index(i, this.buckets)] = -1;
            }
            this.entries = System.Array.init(size, function (){
                return new (System.Collections.Generic._Dictionary$2.Entry(TKey,TValue))();
            }, System.Collections.Generic._Dictionary$2.Entry(TKey,TValue));
            this.freeList = -1;
        },
        Insert: function (key, value, add) {

            if (key == null) {
                throw new System.ArgumentNullException();
            }

            if (this.buckets == null) {
                this.Initialize(0);
            }
            var hashCode = this.comparer[Bridge.geti(this.comparer, "System$Collections$Generic$IEqualityComparer$1$" + Bridge.getTypeAlias(TKey) + "$getHashCode2", "System$Collections$Generic$IEqualityComparer$1$getHashCode2")](key) & 2147483647;
            var targetBucket = hashCode % this.buckets.length;


            for (var i = this.buckets[System.Array.index(targetBucket, this.buckets)]; i >= 0; i = this.entries[System.Array.index(i, this.entries)].next) {
                if (this.entries[System.Array.index(i, this.entries)].hashCode === hashCode && this.comparer[Bridge.geti(this.comparer, "System$Collections$Generic$IEqualityComparer$1$" + Bridge.getTypeAlias(TKey) + "$equals2", "System$Collections$Generic$IEqualityComparer$1$equals2")](this.entries[System.Array.index(i, this.entries)].key, key)) {
                    if (add) {
                        throw new System.ArgumentException();
                    }
                    this.entries[System.Array.index(i, this.entries)].value = value;
                    this.version = (this.version + 1) | 0;
                    return;
                }

            }
            var index;
            if (this.freeCount > 0) {
                index = this.freeList;
                this.freeList = this.entries[System.Array.index(index, this.entries)].next;
                this.freeCount = (this.freeCount - 1) | 0;
            } else {
                if (this.count === this.entries.length) {
                    this.Resize();
                    targetBucket = hashCode % this.buckets.length;
                }
                index = this.count;
                this.count = (this.count + 1) | 0;
            }

            this.entries[System.Array.index(index, this.entries)].hashCode = hashCode;
            this.entries[System.Array.index(index, this.entries)].next = this.buckets[System.Array.index(targetBucket, this.buckets)];
            this.entries[System.Array.index(index, this.entries)].key = key;
            this.entries[System.Array.index(index, this.entries)].value = value;
            this.buckets[System.Array.index(targetBucket, this.buckets)] = index;
            this.version = (this.version + 1) | 0;


        },
        Resize: function () {
            this.Resize$1(System.Collections._HashHelpers.ExpandPrime(this.count), false);
        },
        Resize$1: function (newSize, forceNewHashCodes) {
            //Contract.Assert(newSize >= entries.Length);
            var newBuckets = System.Array.init(newSize, 0, System.Int32);
            for (var i = 0; i < newBuckets.length; i = (i + 1) | 0) {
                newBuckets[System.Array.index(i, newBuckets)] = -1;
            }
            var newEntries = System.Array.init(newSize, function (){
                return new (System.Collections.Generic._Dictionary$2.Entry(TKey,TValue))();
            }, System.Collections.Generic._Dictionary$2.Entry(TKey,TValue));
            System.Array.copy(this.entries, 0, newEntries, 0, this.count);
            if (forceNewHashCodes) {
                for (var i1 = 0; i1 < this.count; i1 = (i1 + 1) | 0) {
                    if (newEntries[System.Array.index(i1, newEntries)].hashCode !== -1) {
                        newEntries[System.Array.index(i1, newEntries)].hashCode = (this.comparer[Bridge.geti(this.comparer, "System$Collections$Generic$IEqualityComparer$1$" + Bridge.getTypeAlias(TKey) + "$getHashCode2", "System$Collections$Generic$IEqualityComparer$1$getHashCode2")](newEntries[System.Array.index(i1, newEntries)].key) & 2147483647);
                    }
                }
            }
            for (var i2 = 0; i2 < this.count; i2 = (i2 + 1) | 0) {
                if (newEntries[System.Array.index(i2, newEntries)].hashCode >= 0) {
                    var bucket = newEntries[System.Array.index(i2, newEntries)].hashCode % newSize;
                    newEntries[System.Array.index(i2, newEntries)].next = newBuckets[System.Array.index(bucket, newBuckets)];
                    newBuckets[System.Array.index(bucket, newBuckets)] = i2;
                }
            }
            this.buckets = newBuckets;
            this.entries = newEntries;
        },
        tryGetValue: function (key, value) {
            var i = this.FindEntry(key);
            if (i >= 0) {
                value.v = this.entries[System.Array.index(i, this.entries)].value;
                return true;
            }
            value.v = Bridge.getDefaultValue(TValue);
            return false;
        },
        GetValueOrDefault: function (key) {
            var i = this.FindEntry(key);
            if (i >= 0) {
                return this.entries[System.Array.index(i, this.entries)].value;
            }
            return Bridge.getDefaultValue(TValue);
        }
    }
    }; });

    Bridge.define("System.Collections.Generic._Dictionary$2.Entry", function (TKey, TValue) { return {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new (System.Collections.Generic._Dictionary$2.Entry(TKey,TValue))(); }
            }
        },
        fields: {
            hashCode: 0,
            next: 0,
            key: Bridge.getDefaultValue(TKey),
            value: Bridge.getDefaultValue(TValue)
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1920233150, this.hashCode, this.next, this.key, this.value]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, System.Collections.Generic._Dictionary$2.Entry(TKey,TValue))) {
                    return false;
                }
                return Bridge.equals(this.hashCode, o.hashCode) && Bridge.equals(this.next, o.next) && Bridge.equals(this.key, o.key) && Bridge.equals(this.value, o.value);
            },
            $clone: function (to) {
                var s = to || new (System.Collections.Generic._Dictionary$2.Entry(TKey,TValue))();
                s.hashCode = this.hashCode;
                s.next = this.next;
                s.key = this.key;
                s.value = this.value;
                return s;
            }
        }
    }; });

    Bridge.define("System.Collections.IDictionaryEnumerator", {
        inherits: [System.Collections.IEnumerator],
        $kind: "interface"
    });

    Bridge.define("System.Collections.Generic._Dictionary$2.KeyCollection", function (TKey, TValue) { return {
        inherits: [System.Collections.Generic.ICollection$1(TKey),System.Collections.ICollection,System.Collections.Generic.IReadOnlyCollection$1(TKey)],
        fields: {
            dictionary: null
        },
        props: {
            Count: {
                get: function () {
                    return this.dictionary.Count;
                }
            },
            System$Collections$Generic$ICollection$1$IsReadOnly: {
                get: function () {
                    return true;
                }
            }
        },
        alias: [
            "copyTo", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TKey) + "$copyTo",
            "Count", "System$Collections$Generic$IReadOnlyCollection$1$" + Bridge.getTypeAlias(TKey) + "$Count",
            "Count", "System$Collections$ICollection$Count",
            "Count", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TKey) + "$Count",
            "System$Collections$Generic$ICollection$1$IsReadOnly", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TKey) + "$IsReadOnly",
            "System$Collections$Generic$ICollection$1$add", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TKey) + "$add",
            "System$Collections$Generic$ICollection$1$clear", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TKey) + "$clear",
            "System$Collections$Generic$ICollection$1$contains", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TKey) + "$contains",
            "System$Collections$Generic$ICollection$1$remove", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TKey) + "$remove",
            "System$Collections$Generic$IEnumerable$1$getEnumerator", "System$Collections$Generic$IEnumerable$1$" + Bridge.getTypeAlias(TKey) + "$getEnumerator"
        ],
        ctors: {
            ctor: function (dictionary) {
                this.$initialize();
                if (dictionary == null) {
                    throw new System.ArgumentNullException();
                }
                this.dictionary = dictionary;
            }
        },
        methods: {
            GetEnumerator: function () {
                return new (System.Collections.Generic._Dictionary$2.KeyCollection.Enumerator(TKey,TValue)).$ctor1(this.dictionary);
            },
            System$Collections$Generic$IEnumerable$1$getEnumerator: function () {
                return new (System.Collections.Generic._Dictionary$2.KeyCollection.Enumerator(TKey,TValue)).$ctor1(this.dictionary).$clone();
            },
            System$Collections$IEnumerable$getEnumerator: function () {
                return new (System.Collections.Generic._Dictionary$2.KeyCollection.Enumerator(TKey,TValue)).$ctor1(this.dictionary).$clone();
            },
            copyTo: function (array, index) {
                if (array == null) {
                    throw new System.ArgumentNullException();
                }

                if (index < 0 || index > array.length) {
                    throw new System.ArgumentOutOfRangeException();
                }

                if (((array.length - index) | 0) < this.dictionary.Count) {
                    throw new System.ArgumentException();
                }

                var count = this.dictionary.count;
                var entries = this.dictionary.entries;
                for (var i = 0; i < count; i = (i + 1) | 0) {
                    if (entries[System.Array.index(i, entries)].hashCode >= 0) {
                        array[System.Array.index(Bridge.identity(index, (index = (index + 1) | 0)), array)] = entries[System.Array.index(i, entries)].key;
                    }
                }
            },
            System$Collections$ICollection$copyTo: function (array, index) {
                if (array == null) {
                    throw new System.ArgumentNullException();
                }

                if (System.Array.getRank(array) !== 1) {
                    throw new System.ArgumentException();
                }

                if (System.Array.getLower(array, 0) !== 0) {
                    throw new System.ArgumentException();
                }

                if (index < 0 || index > array.length) {
                    throw new System.ArgumentOutOfRangeException();
                }

                if (((array.length - index) | 0) < this.dictionary.Count) {
                    throw new System.ArgumentException();
                }

                var keys = Bridge.as(array, System.Array.type(TKey));
                if (keys != null) {
                    this.copyTo(keys, index);
                } else {
                    var objects = Bridge.as(array, System.Array.type(System.Object));
                    if (objects == null) {
                        throw new System.ArgumentException();
                    }

                    var count = this.dictionary.count;
                    var entries = this.dictionary.entries;
                    for (var i = 0; i < count; i = (i + 1) | 0) {
                        if (entries[System.Array.index(i, entries)].hashCode >= 0) {
                            objects[System.Array.index(Bridge.identity(index, (index = (index + 1) | 0)), objects)] = entries[System.Array.index(i, entries)].key;
                        }
                    }
                }
            },
            System$Collections$Generic$ICollection$1$add: function (item) {
                throw new System.NotSupportedException();
            },
            System$Collections$Generic$ICollection$1$clear: function () {
                throw new System.NotSupportedException();
            },
            System$Collections$Generic$ICollection$1$contains: function (item) {
                return this.dictionary.containsKey(item);
            },
            System$Collections$Generic$ICollection$1$remove: function (item) {
                throw new System.NotSupportedException();
            }
        }
    }; });

    Bridge.define("System.Collections.Generic._Dictionary$2.KeyCollection.Enumerator", function (TKey, TValue) { return {
        inherits: [System.Collections.Generic.IEnumerator$1(TKey),System.Collections.IEnumerator],
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new (System.Collections.Generic._Dictionary$2.KeyCollection.Enumerator(TKey,TValue))(); }
            }
        },
        fields: {
            dictionary: null,
            index: 0,
            version: 0,
            currentKey: Bridge.getDefaultValue(TKey)
        },
        props: {
            Current: {
                get: function () {
                    return this.currentKey;
                }
            },
            System$Collections$IEnumerator$Current: {
                get: function () {
                    if (this.index === 0 || (this.index === ((this.dictionary.count + 1) | 0))) {
                        throw new System.InvalidOperationException();
                    }

                    return this.currentKey;
                }
            }
        },
        alias: [
            "dispose", "System$IDisposable$dispose",
            "moveNext", "System$Collections$IEnumerator$moveNext",
            "Current", ["System$Collections$Generic$IEnumerator$1$" + Bridge.getTypeAlias(TKey) + "$Current$1", "System$Collections$Generic$IEnumerator$1$Current$1"]
        ],
        ctors: {
            $ctor1: function (dictionary) {
                this.$initialize();
                this.dictionary = dictionary;
                this.version = dictionary.version;
                this.index = 0;
                this.currentKey = Bridge.getDefaultValue(TKey);
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            dispose: function () { },
            moveNext: function () {
                var $t, $t1;
                if (this.version !== this.dictionary.version) {
                    throw new System.InvalidOperationException();
                }

                while ((this.index >>> 0) < ((this.dictionary.count) >>> 0)) {
                    if (($t = this.dictionary.entries)[System.Array.index(this.index, $t)].hashCode >= 0) {
                        this.currentKey = ($t1 = this.dictionary.entries)[System.Array.index(this.index, $t1)].key;
                        this.index = (this.index + 1) | 0;
                        return true;
                    }
                    this.index = (this.index + 1) | 0;
                }

                this.index = (this.dictionary.count + 1) | 0;
                this.currentKey = Bridge.getDefaultValue(TKey);
                return false;
            },
            System$Collections$IEnumerator$reset: function () {
                if (this.version !== this.dictionary.version) {
                    throw new System.InvalidOperationException();
                }

                this.index = 0;
                this.currentKey = Bridge.getDefaultValue(TKey);
            },
            getHashCode: function () {
                var h = Bridge.addHash([3788985113, this.dictionary, this.index, this.version, this.currentKey]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, System.Collections.Generic._Dictionary$2.KeyCollection.Enumerator(TKey,TValue))) {
                    return false;
                }
                return Bridge.equals(this.dictionary, o.dictionary) && Bridge.equals(this.index, o.index) && Bridge.equals(this.version, o.version) && Bridge.equals(this.currentKey, o.currentKey);
            },
            $clone: function (to) {
                var s = to || new (System.Collections.Generic._Dictionary$2.KeyCollection.Enumerator(TKey,TValue))();
                s.dictionary = this.dictionary;
                s.index = this.index;
                s.version = this.version;
                s.currentKey = this.currentKey;
                return s;
            }
        }
    }; });

    Bridge.define("System.Collections.Generic._Dictionary$2.ValueCollection", function (TKey, TValue) { return {
        inherits: [System.Collections.Generic.ICollection$1(TValue),System.Collections.ICollection,System.Collections.Generic.IReadOnlyCollection$1(TValue)],
        fields: {
            dictionary: null
        },
        props: {
            Count: {
                get: function () {
                    return this.dictionary.Count;
                }
            },
            System$Collections$Generic$ICollection$1$IsReadOnly: {
                get: function () {
                    return true;
                }
            }
        },
        alias: [
            "copyTo", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TValue) + "$copyTo",
            "Count", "System$Collections$Generic$IReadOnlyCollection$1$" + Bridge.getTypeAlias(TValue) + "$Count",
            "Count", "System$Collections$ICollection$Count",
            "Count", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TValue) + "$Count",
            "System$Collections$Generic$ICollection$1$IsReadOnly", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TValue) + "$IsReadOnly",
            "System$Collections$Generic$ICollection$1$add", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TValue) + "$add",
            "System$Collections$Generic$ICollection$1$remove", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TValue) + "$remove",
            "System$Collections$Generic$ICollection$1$clear", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TValue) + "$clear",
            "System$Collections$Generic$ICollection$1$contains", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(TValue) + "$contains",
            "System$Collections$Generic$IEnumerable$1$getEnumerator", "System$Collections$Generic$IEnumerable$1$" + Bridge.getTypeAlias(TValue) + "$getEnumerator"
        ],
        ctors: {
            ctor: function (dictionary) {
                this.$initialize();
                if (dictionary == null) {
                    throw new System.ArgumentNullException();
                }
                this.dictionary = dictionary;
            }
        },
        methods: {
            GetEnumerator: function () {
                return new (System.Collections.Generic._Dictionary$2.ValueCollection.Enumerator(TKey,TValue)).$ctor1(this.dictionary);
            },
            System$Collections$Generic$IEnumerable$1$getEnumerator: function () {
                return new (System.Collections.Generic._Dictionary$2.ValueCollection.Enumerator(TKey,TValue)).$ctor1(this.dictionary).$clone();
            },
            System$Collections$IEnumerable$getEnumerator: function () {
                return new (System.Collections.Generic._Dictionary$2.ValueCollection.Enumerator(TKey,TValue)).$ctor1(this.dictionary).$clone();
            },
            copyTo: function (array, index) {
                if (array == null) {
                    throw new System.ArgumentNullException();
                }

                if (index < 0 || index > array.length) {
                    throw new System.ArgumentOutOfRangeException();
                }

                if (((array.length - index) | 0) < this.dictionary.Count) {
                    throw new System.ArgumentException();
                }

                var count = this.dictionary.count;
                var entries = this.dictionary.entries;
                for (var i = 0; i < count; i = (i + 1) | 0) {
                    if (entries[System.Array.index(i, entries)].hashCode >= 0) {
                        array[System.Array.index(Bridge.identity(index, (index = (index + 1) | 0)), array)] = entries[System.Array.index(i, entries)].value;
                    }
                }
            },
            System$Collections$ICollection$copyTo: function (array, index) {
                if (array == null) {
                    throw new System.ArgumentNullException();
                }

                if (System.Array.getRank(array) !== 1) {
                    throw new System.ArgumentException();
                }

                if (System.Array.getLower(array, 0) !== 0) {
                    throw new System.ArgumentException();
                }

                if (index < 0 || index > array.length) {
                    throw new System.ArgumentOutOfRangeException();
                }

                if (((array.length - index) | 0) < this.dictionary.Count) {
                    throw new System.ArgumentException();
                }

                var values = Bridge.as(array, System.Array.type(TValue));
                if (values != null) {
                    this.copyTo(values, index);
                } else {
                    var objects = Bridge.as(array, System.Array.type(System.Object));
                    if (objects == null) {
                        throw new System.ArgumentException();
                    }

                    var count = this.dictionary.count;
                    var entries = this.dictionary.entries;
                    for (var i = 0; i < count; i = (i + 1) | 0) {
                        if (entries[System.Array.index(i, entries)].hashCode >= 0) {
                            objects[System.Array.index(Bridge.identity(index, (index = (index + 1) | 0)), objects)] = entries[System.Array.index(i, entries)].value;
                        }
                    }
                }
            },
            System$Collections$Generic$ICollection$1$add: function (item) {
                throw new System.NotSupportedException();
            },
            System$Collections$Generic$ICollection$1$remove: function (item) {
                throw new System.NotSupportedException();
            },
            System$Collections$Generic$ICollection$1$clear: function () {
                throw new System.NotSupportedException();
            },
            System$Collections$Generic$ICollection$1$contains: function (item) {
                return this.dictionary.ContainsValue(item);
            }
        }
    }; });

    Bridge.define("System.Collections.Generic._Dictionary$2.ValueCollection.Enumerator", function (TKey, TValue) { return {
        inherits: [System.Collections.Generic.IEnumerator$1(TValue),System.Collections.IEnumerator],
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new (System.Collections.Generic._Dictionary$2.ValueCollection.Enumerator(TKey,TValue))(); }
            }
        },
        fields: {
            dictionary: null,
            index: 0,
            version: 0,
            currentValue: Bridge.getDefaultValue(TValue)
        },
        props: {
            Current: {
                get: function () {
                    return this.currentValue;
                }
            },
            System$Collections$IEnumerator$Current: {
                get: function () {
                    if (this.index === 0 || (this.index === ((this.dictionary.count + 1) | 0))) {
                        throw new System.InvalidOperationException();
                    }

                    return this.currentValue;
                }
            }
        },
        alias: [
            "dispose", "System$IDisposable$dispose",
            "moveNext", "System$Collections$IEnumerator$moveNext",
            "Current", ["System$Collections$Generic$IEnumerator$1$" + Bridge.getTypeAlias(TValue) + "$Current$1", "System$Collections$Generic$IEnumerator$1$Current$1"]
        ],
        ctors: {
            $ctor1: function (dictionary) {
                this.$initialize();
                this.dictionary = dictionary;
                this.version = dictionary.version;
                this.index = 0;
                this.currentValue = Bridge.getDefaultValue(TValue);
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            dispose: function () { },
            moveNext: function () {
                var $t, $t1;
                if (this.version !== this.dictionary.version) {
                    throw new System.InvalidOperationException();
                }

                while ((this.index >>> 0) < ((this.dictionary.count) >>> 0)) {
                    if (($t = this.dictionary.entries)[System.Array.index(this.index, $t)].hashCode >= 0) {
                        this.currentValue = ($t1 = this.dictionary.entries)[System.Array.index(this.index, $t1)].value;
                        this.index = (this.index + 1) | 0;
                        return true;
                    }
                    this.index = (this.index + 1) | 0;
                }
                this.index = (this.dictionary.count + 1) | 0;
                this.currentValue = Bridge.getDefaultValue(TValue);
                return false;
            },
            System$Collections$IEnumerator$reset: function () {
                if (this.version !== this.dictionary.version) {
                    throw new System.InvalidOperationException();
                }
                this.index = 0;
                this.currentValue = Bridge.getDefaultValue(TValue);
            },
            getHashCode: function () {
                var h = Bridge.addHash([3788985113, this.dictionary, this.index, this.version, this.currentValue]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, System.Collections.Generic._Dictionary$2.ValueCollection.Enumerator(TKey,TValue))) {
                    return false;
                }
                return Bridge.equals(this.dictionary, o.dictionary) && Bridge.equals(this.index, o.index) && Bridge.equals(this.version, o.version) && Bridge.equals(this.currentValue, o.currentValue);
            },
            $clone: function (to) {
                var s = to || new (System.Collections.Generic._Dictionary$2.ValueCollection.Enumerator(TKey,TValue))();
                s.dictionary = this.dictionary;
                s.index = this.index;
                s.version = this.version;
                s.currentValue = this.currentValue;
                return s;
            }
        }
    }; });

    Bridge.define("System.Collections.Generic._Dictionary$2.Enumerator", function (TKey, TValue) { return {
        inherits: [System.Collections.Generic.IEnumerator$1(System.Collections.Generic.KeyValuePair$2(TKey,TValue)),System.Collections.IDictionaryEnumerator],
        $kind: "struct",
        statics: {
            fields: {
                DictEntry: 0,
                KeyValuePair: 0
            },
            ctors: {
                init: function () {
                    this.DictEntry = 1;
                    this.KeyValuePair = 2;
                }
            },
            methods: {
                getDefaultValue: function () { return new (System.Collections.Generic._Dictionary$2.Enumerator(TKey,TValue))(); }
            }
        },
        fields: {
            dictionary: null,
            version: 0,
            index: 0,
            current: null,
            getEnumeratorRetType: 0
        },
        props: {
            Current: {
                get: function () {
                    return this.current;
                }
            },
            System$Collections$IEnumerator$Current: {
                get: function () {
                    if (this.index === 0 || (this.index === ((this.dictionary.count + 1) | 0))) {
                        throw new System.InvalidOperationException();
                    }

                    if (this.getEnumeratorRetType === System.Collections.Generic._Dictionary$2.Enumerator(TKey,TValue).DictEntry) {
                        return new System.Collections.DictionaryEntry.$ctor1(this.current.key, this.current.value).$clone();
                    } else {
                        return new (System.Collections.Generic.KeyValuePair$2(TKey,TValue))(this.current.key, this.current.value);
                    }
                }
            },
            System$Collections$IDictionaryEnumerator$Entry: {
                get: function () {
                    if (this.index === 0 || (this.index === ((this.dictionary.count + 1) | 0))) {
                        throw new System.InvalidOperationException();
                    }

                    return new System.Collections.DictionaryEntry.$ctor1(this.current.key, this.current.value);
                }
            },
            System$Collections$IDictionaryEnumerator$Key: {
                get: function () {
                    if (this.index === 0 || (this.index === ((this.dictionary.count + 1) | 0))) {
                        throw new System.InvalidOperationException();
                    }

                    return this.current.key;
                }
            },
            System$Collections$IDictionaryEnumerator$Value: {
                get: function () {
                    if (this.index === 0 || (this.index === ((this.dictionary.count + 1) | 0))) {
                        throw new System.InvalidOperationException();
                    }

                    return this.current.value;
                }
            }
        },
        alias: [
            "moveNext", "System$Collections$IEnumerator$moveNext",
            "Current", ["System$Collections$Generic$IEnumerator$1$System$Collections$Generic$KeyValuePair$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$Current$1", "System$Collections$Generic$IEnumerator$1$Current$1"],
            "dispose", "System$IDisposable$dispose"
        ],
        ctors: {
            init: function () {
                this.current = new (System.Collections.Generic.KeyValuePair$2(TKey,TValue))();
            },
            $ctor1: function (dictionary, getEnumeratorRetType) {
                this.$initialize();
                this.dictionary = dictionary;
                this.version = dictionary.version;
                this.index = 0;
                this.getEnumeratorRetType = getEnumeratorRetType;
                this.current = new (System.Collections.Generic.KeyValuePair$2(TKey,TValue))();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            moveNext: function () {
                var $t, $t1, $t2;
                if (this.version !== this.dictionary.version) {
                    throw new System.InvalidOperationException();
                }

                // Use unsigned comparison since we set index to dictionary.count+1 when the enumeration ends.
                // dictionary.count+1 could be negative if dictionary.count is Int32.MaxValue
                while ((this.index >>> 0) < ((this.dictionary.count) >>> 0)) {
                    if (($t = this.dictionary.entries)[System.Array.index(this.index, $t)].hashCode >= 0) {
                        this.current = new (System.Collections.Generic.KeyValuePair$2(TKey,TValue))(($t1 = this.dictionary.entries)[System.Array.index(this.index, $t1)].key, ($t2 = this.dictionary.entries)[System.Array.index(this.index, $t2)].value);
                        this.index = (this.index + 1) | 0;
                        return true;
                    }
                    this.index = (this.index + 1) | 0;
                }

                this.index = (this.dictionary.count + 1) | 0;
                this.current = new (System.Collections.Generic.KeyValuePair$2(TKey,TValue))();
                return false;
            },
            dispose: function () { },
            System$Collections$IEnumerator$reset: function () {
                if (this.version !== this.dictionary.version) {
                    throw new System.InvalidOperationException();
                }

                this.index = 0;
                this.current = new (System.Collections.Generic.KeyValuePair$2(TKey,TValue))();
            },
            getHashCode: function () {
                var h = Bridge.addHash([3788985113, this.dictionary, this.version, this.index, this.current, this.getEnumeratorRetType]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, System.Collections.Generic._Dictionary$2.Enumerator(TKey,TValue))) {
                    return false;
                }
                return Bridge.equals(this.dictionary, o.dictionary) && Bridge.equals(this.version, o.version) && Bridge.equals(this.index, o.index) && Bridge.equals(this.current, o.current) && Bridge.equals(this.getEnumeratorRetType, o.getEnumeratorRetType);
            },
            $clone: function (to) {
                var s = to || new (System.Collections.Generic._Dictionary$2.Enumerator(TKey,TValue))();
                s.dictionary = this.dictionary;
                s.version = this.version;
                s.index = this.index;
                s.current = this.current;
                s.getEnumeratorRetType = this.getEnumeratorRetType;
                return s;
            }
        }
    }; });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJkaWN0aW9uYXJ5LmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJOZXcgQnJpZGdlIFN0dWZmL0lEaWN0aW9uYXJ5LmNzIiwiTmV3IEJyaWRnZSBTdHVmZi9EaWN0aW9uYXJ5LmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OztvQkErSGdCQSxPQUFPQTs7O29CQUlQQSxZQUFZQTs7Ozs7b0JBUVpBLE9BQU9BOzs7b0JBSVBBLGNBQWNBOzs7Ozs4QkFJQ0EsS0FBWUE7O2dCQUUvQkEsWUFBWUE7Z0JBQ1pBLGNBQWNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0NpZ0JrQkE7b0JBRWhDQSxJQUFJQSxPQUFPQTt3QkFFUEEsTUFBTUEsSUFBSUE7O29CQUVkQSxPQUFPQSxDQUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQWhpQkpBLE9BQU9BOzs7OztvQkFNTEEsT0FBT0EsZUFBUUE7Ozs7O0FBVWpCQSxJQUFJQSxhQUFRQTt3QkFBTUEsWUFBT0EsS0FBSUEscUVBQWNBOztvQkFDM0NBLE9BQU9BOzs7OztvQkFRUEEsSUFBSUEsYUFBUUE7d0JBQU1BLFlBQU9BLEtBQUlBLHFFQUFjQTs7b0JBQzNDQSxPQUFPQTs7Ozs7b0JBUVBBLElBQUlBLGFBQVFBO3dCQUFNQSxZQUFPQSxLQUFJQSxxRUFBY0E7O29CQUMzQ0EsT0FBT0E7Ozs7O0FBU1BBLElBQUlBLGVBQVVBO3dCQUFNQSxjQUFTQSxLQUFJQSx1RUFBZ0JBOztvQkFDakRBLE9BQU9BOzs7OztvQkFRUEEsSUFBSUEsZUFBVUE7d0JBQU1BLGNBQVNBLEtBQUlBLHVFQUFnQkE7O29CQUNqREEsT0FBT0E7Ozs7O29CQVFQQSxJQUFJQSxlQUFVQTt3QkFBTUEsY0FBU0EsS0FBSUEsdUVBQWdCQTs7b0JBQ2pEQSxPQUFPQTs7Ozs7b0JBZ1ZMQTs7Ozs7b0JBK0VBQTs7Ozs7b0JBS0FBOzs7OztvQkFL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QTtnQkFDZEE7Ozs7Z0JBa0NBQSxJQUFJQSxpQkFBV0E7b0JBRVhBLE1BQU1BLElBQUlBOzs7Z0JBR2RBO2dCQUNBQSxlQUFVQSxLQUFJQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWNcclxue1xyXG4gICAgW0V4dGVybmFsXVxyXG4gICAgW1JlZmxlY3RhYmxlXVxyXG4gICAgW0NvbnZlbnRpb24oVGFyZ2V0ID0gQ29udmVudGlvblRhcmdldC5NZW1iZXIsIE1lbWJlciA9IENvbnZlbnRpb25NZW1iZXIuTWV0aG9kLCBOb3RhdGlvbiA9IE5vdGF0aW9uLkxvd2VyQ2FtZWxDYXNlKV1cclxuICAgIFtOYW1lKFwiU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuSURpY3Rpb25hcnkkMlwiKV1cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgX0lEaWN0aW9uYXJ5PFRLZXksIFRWYWx1ZT4gOiBJQ29sbGVjdGlvbjxLZXlWYWx1ZVBhaXI8VEtleSwgVFZhbHVlPj4sIElCcmlkZ2VDbGFzc1xyXG4gICAge1xyXG4gICAgICAgIFtBY2Nlc3NvcnNJbmRleGVyXVxyXG4gICAgICAgIFRWYWx1ZSB0aGlzW1RLZXkga2V5XVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgW05hbWUoXCJnZXRJdGVtXCIpXVxyXG4gICAgICAgICAgICBnZXQ7XHJcbiAgICAgICAgICAgIFtOYW1lKFwic2V0SXRlbVwiKV1cclxuICAgICAgICAgICAgc2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgSUNvbGxlY3Rpb248VEtleT4gS2V5c1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0O1xyXG4gICAgICAgICAgICBwcml2YXRlIHNldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIElDb2xsZWN0aW9uPFRWYWx1ZT4gVmFsdWVzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQ7XHJcbiAgICAgICAgICAgIHByaXZhdGUgc2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYm9vbCBDb250YWluc0tleShUS2V5IGtleSk7XHJcblxyXG4gICAgICAgIHZvaWQgQWRkKFRLZXkga2V5LCBUVmFsdWUgdmFsdWUpO1xyXG5cclxuICAgICAgICBib29sIFJlbW92ZShUS2V5IGtleSk7XHJcblxyXG4gICAgICAgIGJvb2wgVHJ5R2V0VmFsdWUoVEtleSBrZXksIG91dCBUVmFsdWUgdmFsdWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLkNvbGxlY3Rpb25zXHJcbntcclxuXHJcbiAgICB1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuICAgIHVzaW5nIEJyaWRnZTtcclxuICAgIFtFeHRlcm5hbF1cclxuICAgIFtVbmJveCh0cnVlKV1cclxuICAgIFtDb252ZW50aW9uKFRhcmdldCA9IENvbnZlbnRpb25UYXJnZXQuTWVtYmVyLCBNZW1iZXIgPSBDb252ZW50aW9uTWVtYmVyLk1ldGhvZCwgTm90YXRpb24gPSBOb3RhdGlvbi5Mb3dlckNhbWVsQ2FzZSldXHJcbiAgICBbUmVmbGVjdGFibGUsIE5hbWUoXCJTeXN0ZW0uQ29sbGVjdGlvbnMuSURpY3Rpb25hcnlcIildXHJcbiAgICBwdWJsaWMgaW50ZXJmYWNlIF9JRGljdGlvbmFyeSA6IElDb2xsZWN0aW9uLCBJRW51bWVyYWJsZSwgSUJyaWRnZUNsYXNzXHJcbiAgICB7XG4gICAgICAgIGJvb2wgSXNGaXhlZFNpemVcbiAgICAgICAge1xuICAgICAgICAgICAgZ2V0O1xuICAgICAgICAgICAgcHJpdmF0ZSBzZXQ7XG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYm9vbCBJc1JlYWRPbmx5XG4gICAgICAgIHtcbiAgICAgICAgICAgIGdldDtcbiAgICAgICAgICAgIHByaXZhdGUgc2V0O1xuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9iamVjdCB0aGlzW29iamVjdCBrZXldXG4gICAgICAgIHtcbiAgICAgICAgICAgIGdldDtcbiAgICAgICAgICAgIHNldDtcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBJQ29sbGVjdGlvbiBLZXlzXG4gICAgICAgIHtcbiAgICAgICAgICAgIGdldDtcbiAgICAgICAgICAgIHByaXZhdGUgc2V0O1xuICAgICAgICB9XHJcblxyXG4gICAgICAgIElDb2xsZWN0aW9uIFZhbHVlc1xuICAgICAgICB7XG4gICAgICAgICAgICBnZXQ7XG4gICAgICAgICAgICBwcml2YXRlIHNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZvaWQgQWRkKG9iamVjdCBrZXksIG9iamVjdCB2YWx1ZSk7XG5cbiAgICAgICAgdm9pZCBDbGVhcigpO1xuXG4gICAgICAgIGJvb2wgQ29udGFpbnMob2JqZWN0IGtleSk7XHJcblxyXG4gICAgICAgIG5ldyBJRGljdGlvbmFyeUVudW1lcmF0b3IgR2V0RW51bWVyYXRvcigpO1xyXG5cclxuICAgICAgICB2b2lkIFJlbW92ZShvYmplY3Qga2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBbRmlsZU5hbWUoXCJkaWN0aW9uYXJ5LmpzXCIpXVxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSURpY3Rpb25hcnlFbnVtZXJhdG9yIDogSUVudW1lcmF0b3JcbiAgICB7XG4gICAgICAgIERpY3Rpb25hcnlFbnRyeSBFbnRyeVxuICAgICAgICB7XG4gICAgICAgICAgICBnZXQ7XG4gICAgICAgICAgICBwcml2YXRlIHNldDtcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvYmplY3QgS2V5XG4gICAgICAgIHtcbiAgICAgICAgICAgIGdldDtcbiAgICAgICAgICAgIHByaXZhdGUgc2V0O1xuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9iamVjdCBWYWx1ZVxuICAgICAgICB7XG4gICAgICAgICAgICBnZXQ7XG4gICAgICAgICAgICBwcml2YXRlIHNldDtcbiAgICAgICAgfVxuICAgIH1cclxuXHJcbiAgICBbU2VyaWFsaXphYmxlXVxuICAgIFtGaWxlTmFtZShcImRpY3Rpb25hcnkuanNcIildXG4gICAgcHVibGljIHN0cnVjdCBEaWN0aW9uYXJ5RW50cnlcbiAgICB7XG4gICAgICAgIHByaXZhdGUgb2JqZWN0IF9rZXk7XG5cbiAgICAgICAgcHJpdmF0ZSBvYmplY3QgX3ZhbHVlO1xyXG5cclxuICAgICAgICBwdWJsaWMgb2JqZWN0IEtleVxuICAgICAgICB7XG4gICAgICAgICAgICBnZXRcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fa2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5fa2V5ID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9iamVjdCBWYWx1ZVxuICAgICAgICB7XG4gICAgICAgICAgICBnZXRcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEaWN0aW9uYXJ5RW50cnkob2JqZWN0IGtleSwgb2JqZWN0IHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxyXG59IiwiLy8gPT0rKz09XHJcbi8vIFxyXG4vLyAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gXHJcbi8vID09LS09PVxyXG4vKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4qKlxyXG4qKiBDbGFzczogIERpY3Rpb25hcnlcclxuKiogXHJcbioqIDxPV05FUj5NaWNyb3NvZnQ8L09XTkVSPlxyXG4qKlxyXG4qKiBQdXJwb3NlOiBHZW5lcmljIGhhc2ggdGFibGUgaW1wbGVtZW50YXRpb25cclxuKipcclxuKiogI0RpY3Rpb25hcnlWZXJzdXNIYXNodGFibGVUaHJlYWRTYWZldHlcclxuKiogSGFzaHRhYmxlIGhhcyBtdWx0aXBsZSByZWFkZXIvc2luZ2xlIHdyaXRlciAoTVIvU1cpIHRocmVhZCBzYWZldHkgYnVpbHQgaW50byBcclxuKiogY2VydGFpbiBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzLCB3aGVyZWFzIERpY3Rpb25hcnkgZG9lc24ndC4gSWYgeW91J3JlIFxyXG4qKiBjb252ZXJ0aW5nIGZyYW1ld29yayBjb2RlIHRoYXQgZm9ybWVybHkgdXNlZCBIYXNodGFibGUgdG8gRGljdGlvbmFyeSwgaXQnc1xyXG4qKiBpbXBvcnRhbnQgdG8gY29uc2lkZXIgd2hldGhlciBjYWxsZXJzIG1heSBoYXZlIHRha2VuIGEgZGVwZW5kZW5jZSBvbiBNUi9TV1xyXG4qKiB0aHJlYWQgc2FmZXR5LiBJZiBhIHJlYWRlciB3cml0ZXIgbG9jayBpcyBhdmFpbGFibGUsIHRoZW4gdGhhdCBtYXkgYmUgdXNlZFxyXG4qKiB3aXRoIGEgRGljdGlvbmFyeSB0byBnZXQgdGhlIHNhbWUgdGhyZWFkIHNhZmV0eSBndWFyYW50ZWUuIFxyXG4qKiBcclxuKiogUmVhZGVyIHdyaXRlciBsb2NrcyBkb24ndCBleGlzdCBpbiBzaWx2ZXJsaWdodCwgc28gd2UgZG8gdGhlIGZvbGxvd2luZyBhcyBhXHJcbioqIHJlc3VsdCBvZiByZW1vdmluZyBub24tZ2VuZXJpYyBjb2xsZWN0aW9ucyBmcm9tIHNpbHZlcmxpZ2h0OiBcclxuKiogMS4gSWYgdGhlIEhhc2h0YWJsZSB3YXMgZnVsbHkgc3luY2hyb25pemVkLCB0aGVuIHdlIHJlcGxhY2UgaXQgd2l0aCBhIFxyXG4qKiAgICBEaWN0aW9uYXJ5IHdpdGggZnVsbCBsb2NrcyBhcm91bmQgcmVhZHMvd3JpdGVzIChzYW1lIHRocmVhZCBzYWZldHlcclxuKiogICAgZ3VhcmFudGVlKS5cclxuKiogMi4gT3RoZXJ3aXNlLCB0aGUgSGFzaHRhYmxlIGhhcyB0aGUgZGVmYXVsdCBNUi9TVyB0aHJlYWQgc2FmZXR5IGJlaGF2aW9yLCBcclxuKiogICAgc28gd2UgZG8gb25lIG9mIHRoZSBmb2xsb3dpbmcgb24gYSBjYXNlLWJ5LWNhc2UgYmFzaXM6XHJcbioqICAgIGEuIElmIHRoZSAtLS0tIGNhbiBiZSBhZGRyZXNzZWQgYnkgcmVhcnJhbmdpbmcgdGhlIGNvZGUgYW5kIHVzaW5nIGEgdGVtcFxyXG4qKiAgICAgICB2YXJpYWJsZSAoZm9yIGV4YW1wbGUsIGl0J3Mgb25seSBwb3B1bGF0ZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgY3JlYXRlZClcclxuKiogICAgICAgdGhlbiB3ZSBhZGRyZXNzIHRoZSAtLS0tIHRoaXMgd2F5IGFuZCB1c2UgRGljdGlvbmFyeS5cclxuKiogICAgYi4gSWYgdGhlcmUncyBjb25jZXJuIGFib3V0IGRlZ3JhZGluZyBwZXJmb3JtYW5jZSB3aXRoIHRoZSBpbmNyZWFzZWQgXHJcbioqICAgICAgIGxvY2tpbmcsIHdlIGlmZGVmIHdpdGggRkVBVFVSRV9OT05HRU5FUklDX0NPTExFQ1RJT05TIHNvIHdlIGNhbiBhdCBcclxuKiogICAgICAgbGVhc3QgdXNlIEhhc2h0YWJsZSBpbiB0aGUgZGVza3RvcCBidWlsZCwgYnV0IERpY3Rpb25hcnkgd2l0aCBmdWxsIFxyXG4qKiAgICAgICBsb2NrcyBpbiBzaWx2ZXJsaWdodCBidWlsZHMuIE5vdGUgdGhhdCB0aGlzIGlzIGhlYXZpZXIgbG9ja2luZyB0aGFuIFxyXG4qKiAgICAgICBNUi9TVywgYnV0IHRoaXMgaXMgdGhlIG9ubHkgb3B0aW9uIHdpdGhvdXQgcmV3cml0aW5nIChvciBhZGRpbmcgYmFjaylcclxuKiogICAgICAgdGhlIHJlYWRlciB3cml0ZXIgbG9jay4gXHJcbioqICAgIGMuIElmIHRoZXJlJ3Mgbm8gcGVyZm9ybWFuY2UgY29uY2VybiAoZS5nLiBkZWJ1Zy1vbmx5IGNvZGUpIHdlIFxyXG4qKiAgICAgICBjb25zaXN0ZW50bHkgcmVwbGFjZSBIYXNodGFibGUgd2l0aCBEaWN0aW9uYXJ5IHBsdXMgZnVsbCBsb2NrcyB0byBcclxuKiogICAgICAgcmVkdWNlIGNvbXBsZXhpdHkuXHJcbioqICAgIGQuIE1vc3Qgb2Ygc2VyaWFsaXphdGlvbiBpcyBkZWFkIGNvZGUgaW4gc2lsdmVybGlnaHQuIEluc3RlYWQgb2YgdXBkYXRpbmdcclxuKiogICAgICAgdGhvc2UgSGFzaHRhYmxlIG9jY3VyZW5jZXMgaW4gc2VyaWFsaXphdGlvbiwgd2UgY2FydmVkIG91dCByZWZlcmVuY2VzIFxyXG4qKiAgICAgICB0byBzZXJpYWxpemF0aW9uIHN1Y2ggdGhhdCB0aGlzIGNvZGUgZG9lc24ndCBuZWVkIHRvIGJ1aWxkIGluIFxyXG4qKiAgICAgICBzaWx2ZXJsaWdodC4gXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxubmFtZXNwYWNlIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljXHJcbntcclxuICAgIHVzaW5nIEJyaWRnZTtcclxuICAgIHVzaW5nIFN5c3RlbTtcclxuICAgIHVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucztcclxuICAgIHVzaW5nIFN5c3RlbS5EaWFnbm9zdGljcztcclxuICAgIHVzaW5nIFN5c3RlbS5EaWFnbm9zdGljcy5Db250cmFjdHM7XHJcblxyXG4gICAgW1NlcmlhbGl6YWJsZV1cclxuICAgIFtTeXN0ZW0uUnVudGltZS5JbnRlcm9wU2VydmljZXMuQ29tVmlzaWJsZShmYWxzZSldXHJcbiAgICBbRmlsZU5hbWUoXCJkaWN0aW9uYXJ5LmpzXCIpXVxyXG4gICAgcHVibGljIGNsYXNzIF9EaWN0aW9uYXJ5PFRLZXksIFRWYWx1ZT4gOiBfSURpY3Rpb25hcnk8VEtleSwgVFZhbHVlPiwgX0lEaWN0aW9uYXJ5LCBJUmVhZE9ubHlEaWN0aW9uYXJ5PFRLZXksIFRWYWx1ZT5cclxuICAgIHtcclxuXHJcbiAgICAgICAgW0ZpbGVOYW1lKFwiZGljdGlvbmFyeS5qc1wiKV1cclxuICAgICAgICBwcml2YXRlIHN0cnVjdCBFbnRyeVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGludCBoYXNoQ29kZTsgICAgLy8gTG93ZXIgMzEgYml0cyBvZiBoYXNoIGNvZGUsIC0xIGlmIHVudXNlZFxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IG5leHQ7ICAgICAgICAvLyBJbmRleCBvZiBuZXh0IGVudHJ5LCAtMSBpZiBsYXN0XHJcbiAgICAgICAgICAgIHB1YmxpYyBUS2V5IGtleTsgICAgICAgICAgIC8vIEtleSBvZiBlbnRyeVxyXG4gICAgICAgICAgICBwdWJsaWMgVFZhbHVlIHZhbHVlOyAgICAgICAgIC8vIFZhbHVlIG9mIGVudHJ5XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGludFtdIGJ1Y2tldHM7XHJcbiAgICAgICAgcHJpdmF0ZSBFbnRyeVtdIGVudHJpZXM7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgY291bnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgdmVyc2lvbjtcclxuICAgICAgICBwcml2YXRlIGludCBmcmVlTGlzdDtcclxuICAgICAgICBwcml2YXRlIGludCBmcmVlQ291bnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBJRXF1YWxpdHlDb21wYXJlcjxUS2V5PiBjb21wYXJlcjtcclxuICAgICAgICBwcml2YXRlIEtleUNvbGxlY3Rpb24ga2V5cztcclxuICAgICAgICBwcml2YXRlIFZhbHVlQ29sbGVjdGlvbiB2YWx1ZXM7XHJcblxyXG4gICAgICAgIC8vIGNvbnN0YW50cyBmb3Igc2VyaWFsaXphdGlvblxyXG4gICAgICAgIHByaXZhdGUgY29uc3QgU3RyaW5nIFZlcnNpb25OYW1lID0gXCJWZXJzaW9uXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBTdHJpbmcgSGFzaFNpemVOYW1lID0gXCJIYXNoU2l6ZVwiOyAgLy8gTXVzdCBzYXZlIGJ1Y2tldHMuTGVuZ3RoXHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBTdHJpbmcgS2V5VmFsdWVQYWlyc05hbWUgPSBcIktleVZhbHVlUGFpcnNcIjtcclxuICAgICAgICBwcml2YXRlIGNvbnN0IFN0cmluZyBDb21wYXJlck5hbWUgPSBcIkNvbXBhcmVyXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBfRGljdGlvbmFyeSgpIDogdGhpcygwLCBudWxsKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIF9EaWN0aW9uYXJ5KGludCBjYXBhY2l0eSkgOiB0aGlzKGNhcGFjaXR5LCBudWxsKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIF9EaWN0aW9uYXJ5KElFcXVhbGl0eUNvbXBhcmVyPFRLZXk+IGNvbXBhcmVyKSA6IHRoaXMoMCwgY29tcGFyZXIpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgX0RpY3Rpb25hcnkoaW50IGNhcGFjaXR5LCBJRXF1YWxpdHlDb21wYXJlcjxUS2V5PiBjb21wYXJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjYXBhY2l0eSA8IDApIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgaWYgKGNhcGFjaXR5ID4gMCkgSW5pdGlhbGl6ZShjYXBhY2l0eSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGFyZXIgPSBjb21wYXJlciA/PyBFcXVhbGl0eUNvbXBhcmVyPFRLZXk+LkRlZmF1bHQ7XHJcblxyXG4jaWYgRkVBVFVSRV9DT1JFQ0xSXHJcbiAgICAgICAgICAgIGlmIChIYXNoSGVscGVycy5zX1VzZVJhbmRvbWl6ZWRTdHJpbmdIYXNoaW5nICYmIGNvbXBhcmVyID09IEVxdWFsaXR5Q29tcGFyZXI8c3RyaW5nPi5EZWZhdWx0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBhcmVyID0gKElFcXVhbGl0eUNvbXBhcmVyPFRLZXk+KSBOb25SYW5kb21pemVkU3RyaW5nRXF1YWxpdHlDb21wYXJlci5EZWZhdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiNlbmRpZiAvLyBGRUFUVVJFX0NPUkVDTFJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBfRGljdGlvbmFyeShfSURpY3Rpb25hcnk8VEtleSwgVFZhbHVlPiBkaWN0aW9uYXJ5KSA6IHRoaXMoZGljdGlvbmFyeSwgbnVsbCkgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBfRGljdGlvbmFyeShfSURpY3Rpb25hcnk8VEtleSwgVFZhbHVlPiBkaWN0aW9uYXJ5LCBJRXF1YWxpdHlDb21wYXJlcjxUS2V5PiBjb21wYXJlcikgOlxyXG4gICAgICAgICAgICB0aGlzKGRpY3Rpb25hcnkgIT0gbnVsbCA/IGRpY3Rpb25hcnkuQ291bnQgOiAwLCBjb21wYXJlcilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGljdGlvbmFyeSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKEtleVZhbHVlUGFpcjxUS2V5LCBUVmFsdWU+IHBhaXIgaW4gZGljdGlvbmFyeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQWRkKHBhaXIuS2V5LCBwYWlyLlZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElFcXVhbGl0eUNvbXBhcmVyPFRLZXk+IENvbXBhcmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IENvdW50XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gY291bnQgLSBmcmVlQ291bnQ7IH1cclxuICAgICAgICB9XHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSBDUzAxMDggLy8gTWVtYmVyIGhpZGVzIGluaGVyaXRlZCBtZW1iZXI7IG1pc3NpbmcgbmV3IGtleXdvcmRcclxuICAgICAgICBwdWJsaWMgS2V5Q29sbGVjdGlvbiBLZXlzXHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIENTMDEwOCAvLyBNZW1iZXIgaGlkZXMgaW5oZXJpdGVkIG1lbWJlcjsgbWlzc2luZyBuZXcga2V5d29yZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnRyYWN0LkVuc3VyZXMoQ29udHJhY3QuUmVzdWx0PEtleUNvbGxlY3Rpb24+KCkgIT0gbnVsbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5cyA9PSBudWxsKSBrZXlzID0gbmV3IEtleUNvbGxlY3Rpb24odGhpcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgSUNvbGxlY3Rpb248VEtleT4gX0lEaWN0aW9uYXJ5PFRLZXksIFRWYWx1ZT4uS2V5c1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXlzID09IG51bGwpIGtleXMgPSBuZXcgS2V5Q29sbGVjdGlvbih0aGlzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBrZXlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBJRW51bWVyYWJsZTxUS2V5PiBJUmVhZE9ubHlEaWN0aW9uYXJ5PFRLZXksIFRWYWx1ZT4uS2V5c1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXlzID09IG51bGwpIGtleXMgPSBuZXcgS2V5Q29sbGVjdGlvbih0aGlzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBrZXlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmFsdWVDb2xsZWN0aW9uIFZhbHVlc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnRyYWN0LkVuc3VyZXMoQ29udHJhY3QuUmVzdWx0PFZhbHVlQ29sbGVjdGlvbj4oKSAhPSBudWxsKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMgPT0gbnVsbCkgdmFsdWVzID0gbmV3IFZhbHVlQ29sbGVjdGlvbih0aGlzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIElDb2xsZWN0aW9uPFRWYWx1ZT4gX0lEaWN0aW9uYXJ5PFRLZXksIFRWYWx1ZT4uVmFsdWVzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlcyA9PSBudWxsKSB2YWx1ZXMgPSBuZXcgVmFsdWVDb2xsZWN0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgSUVudW1lcmFibGU8VFZhbHVlPiBJUmVhZE9ubHlEaWN0aW9uYXJ5PFRLZXksIFRWYWx1ZT4uVmFsdWVzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlcyA9PSBudWxsKSB2YWx1ZXMgPSBuZXcgVmFsdWVDb2xsZWN0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRWYWx1ZSB0aGlzW1RLZXkga2V5XVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBpID0gRmluZEVudHJ5KGtleSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+PSAwKSByZXR1cm4gZW50cmllc1tpXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBLZXlOb3RGb3VuZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJbnNlcnQoa2V5LCB2YWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoVEtleSBrZXksIFRWYWx1ZSB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEluc2VydChrZXksIHZhbHVlLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgSUNvbGxlY3Rpb248S2V5VmFsdWVQYWlyPFRLZXksIFRWYWx1ZT4+LkFkZChLZXlWYWx1ZVBhaXI8VEtleSwgVFZhbHVlPiBrZXlWYWx1ZVBhaXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGQoa2V5VmFsdWVQYWlyLktleSwga2V5VmFsdWVQYWlyLlZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJvb2wgSUNvbGxlY3Rpb248S2V5VmFsdWVQYWlyPFRLZXksIFRWYWx1ZT4+LkNvbnRhaW5zKEtleVZhbHVlUGFpcjxUS2V5LCBUVmFsdWU+IGtleVZhbHVlUGFpcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBpID0gRmluZEVudHJ5KGtleVZhbHVlUGFpci5LZXkpO1xyXG4gICAgICAgICAgICBpZiAoaSA+PSAwICYmIEVxdWFsaXR5Q29tcGFyZXI8VFZhbHVlPi5EZWZhdWx0LkVxdWFscyhlbnRyaWVzW2ldLnZhbHVlLCBrZXlWYWx1ZVBhaXIuVmFsdWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib29sIElDb2xsZWN0aW9uPEtleVZhbHVlUGFpcjxUS2V5LCBUVmFsdWU+Pi5SZW1vdmUoS2V5VmFsdWVQYWlyPFRLZXksIFRWYWx1ZT4ga2V5VmFsdWVQYWlyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGkgPSBGaW5kRW50cnkoa2V5VmFsdWVQYWlyLktleSk7XHJcbiAgICAgICAgICAgIGlmIChpID49IDAgJiYgRXF1YWxpdHlDb21wYXJlcjxUVmFsdWU+LkRlZmF1bHQuRXF1YWxzKGVudHJpZXNbaV0udmFsdWUsIGtleVZhbHVlUGFpci5WYWx1ZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJlbW92ZShrZXlWYWx1ZVBhaXIuS2V5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENsZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgYnVja2V0cy5MZW5ndGg7IGkrKykgYnVja2V0c1tpXSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgQXJyYXkuQ2xlYXI8Z2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5fRGljdGlvbmFyeTxUS2V5LCBUVmFsdWU+LkVudHJ5PihlbnRyaWVzLCAwLCBjb3VudCk7XHJcbiAgICAgICAgICAgICAgICBmcmVlTGlzdCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgZnJlZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIHZlcnNpb24rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ29udGFpbnNLZXkoVEtleSBrZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRmluZEVudHJ5KGtleSkgPj0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zVmFsdWUoVFZhbHVlIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY291bnQ7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cmllc1tpXS5oYXNoQ29kZSA+PSAwICYmIGVudHJpZXNbaV0udmFsdWUgPT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFcXVhbGl0eUNvbXBhcmVyPFRWYWx1ZT4gYyA9IEVxdWFsaXR5Q29tcGFyZXI8VFZhbHVlPi5EZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyaWVzW2ldLmhhc2hDb2RlID49IDAgJiYgYy5FcXVhbHMoZW50cmllc1tpXS52YWx1ZSwgdmFsdWUpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ29weVRvKEtleVZhbHVlUGFpcjxUS2V5LCBUVmFsdWU+W10gYXJyYXksIGludCBpbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChhcnJheSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiBhcnJheS5MZW5ndGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFycmF5Lkxlbmd0aCAtIGluZGV4IDwgQ291bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnQgY291bnQgPSB0aGlzLmNvdW50O1xyXG4gICAgICAgICAgICBFbnRyeVtdIGVudHJpZXMgPSB0aGlzLmVudHJpZXM7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVudHJpZXNbaV0uaGFzaENvZGUgPj0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJheVtpbmRleCsrXSA9IG5ldyBLZXlWYWx1ZVBhaXI8VEtleSwgVFZhbHVlPihlbnRyaWVzW2ldLmtleSwgZW50cmllc1tpXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbnVtZXJhdG9yIEdldEVudW1lcmF0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yKHRoaXMsIEVudW1lcmF0b3IuS2V5VmFsdWVQYWlyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIElFbnVtZXJhdG9yPEtleVZhbHVlUGFpcjxUS2V5LCBUVmFsdWU+PiBJRW51bWVyYWJsZTxLZXlWYWx1ZVBhaXI8VEtleSwgVFZhbHVlPj4uR2V0RW51bWVyYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3IodGhpcywgRW51bWVyYXRvci5LZXlWYWx1ZVBhaXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgRmluZEVudHJ5KFRLZXkga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChidWNrZXRzICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBoYXNoQ29kZSA9IGNvbXBhcmVyLkdldEhhc2hDb2RlKGtleSkgJiAweDdGRkZGRkZGO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IGJ1Y2tldHNbaGFzaENvZGUgJSBidWNrZXRzLkxlbmd0aF07IGkgPj0gMDsgaSA9IGVudHJpZXNbaV0ubmV4dClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cmllc1tpXS5oYXNoQ29kZSA9PSBoYXNoQ29kZSAmJiBjb21wYXJlci5FcXVhbHMoZW50cmllc1tpXS5rZXksIGtleSkpIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBJbml0aWFsaXplKGludCBjYXBhY2l0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBzaXplID0gX0hhc2hIZWxwZXJzLkdldFByaW1lKGNhcGFjaXR5KTtcclxuICAgICAgICAgICAgYnVja2V0cyA9IG5ldyBpbnRbc2l6ZV07XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgYnVja2V0cy5MZW5ndGg7IGkrKykgYnVja2V0c1tpXSA9IC0xO1xyXG4gICAgICAgICAgICBlbnRyaWVzID0gbmV3IEVudHJ5W3NpemVdO1xyXG4gICAgICAgICAgICBmcmVlTGlzdCA9IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEluc2VydChUS2V5IGtleSwgVFZhbHVlIHZhbHVlLCBib29sIGFkZClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBpZiAoa2V5ID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGJ1Y2tldHMgPT0gbnVsbCkgSW5pdGlhbGl6ZSgwKTtcclxuICAgICAgICAgICAgaW50IGhhc2hDb2RlID0gY29tcGFyZXIuR2V0SGFzaENvZGUoa2V5KSAmIDB4N0ZGRkZGRkY7XHJcbiAgICAgICAgICAgIGludCB0YXJnZXRCdWNrZXQgPSBoYXNoQ29kZSAlIGJ1Y2tldHMuTGVuZ3RoO1xyXG5cclxuI2lmIEZFQVRVUkVfUkFORE9NSVpFRF9TVFJJTkdfSEFTSElOR1xyXG4gICAgICAgICAgICBpbnQgY29sbGlzaW9uQ291bnQgPSAwO1xyXG4jZW5kaWZcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSBidWNrZXRzW3RhcmdldEJ1Y2tldF07IGkgPj0gMDsgaSA9IGVudHJpZXNbaV0ubmV4dClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVudHJpZXNbaV0uaGFzaENvZGUgPT0gaGFzaENvZGUgJiYgY29tcGFyZXIuRXF1YWxzKGVudHJpZXNbaV0ua2V5LCBrZXkpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhZGQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZW50cmllc1tpXS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb24rKztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4jaWYgRkVBVFVSRV9SQU5ET01JWkVEX1NUUklOR19IQVNISU5HXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25Db3VudCsrO1xyXG4jZW5kaWZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbnQgaW5kZXg7XHJcbiAgICAgICAgICAgIGlmIChmcmVlQ291bnQgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGZyZWVMaXN0O1xyXG4gICAgICAgICAgICAgICAgZnJlZUxpc3QgPSBlbnRyaWVzW2luZGV4XS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgZnJlZUNvdW50LS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gZW50cmllcy5MZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QnVja2V0ID0gaGFzaENvZGUgJSBidWNrZXRzLkxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGluZGV4ID0gY291bnQ7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbnRyaWVzW2luZGV4XS5oYXNoQ29kZSA9IGhhc2hDb2RlO1xyXG4gICAgICAgICAgICBlbnRyaWVzW2luZGV4XS5uZXh0ID0gYnVja2V0c1t0YXJnZXRCdWNrZXRdO1xyXG4gICAgICAgICAgICBlbnRyaWVzW2luZGV4XS5rZXkgPSBrZXk7XHJcbiAgICAgICAgICAgIGVudHJpZXNbaW5kZXhdLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGJ1Y2tldHNbdGFyZ2V0QnVja2V0XSA9IGluZGV4O1xyXG4gICAgICAgICAgICB2ZXJzaW9uKys7XHJcblxyXG4jaWYgRkVBVFVSRV9SQU5ET01JWkVEX1NUUklOR19IQVNISU5HXHJcbiBcclxuI2lmIEZFQVRVUkVfQ09SRUNMUlxyXG4gICAgICAgICAgICAvLyBJbiBjYXNlIHdlIGhpdCB0aGUgY29sbGlzaW9uIHRocmVzaG9sZCB3ZSdsbCBuZWVkIHRvIHN3aXRjaCB0byB0aGUgY29tcGFyZXIgd2hpY2ggaXMgdXNpbmcgcmFuZG9taXplZCBzdHJpbmcgaGFzaGluZ1xyXG4gICAgICAgICAgICAvLyBpbiB0aGlzIGNhc2Ugd2lsbCBiZSBFcXVhbGl0eUNvbXBhcmVyPHN0cmluZz4uRGVmYXVsdC5cclxuICAgICAgICAgICAgLy8gTm90ZSwgcmFuZG9taXplZCBzdHJpbmcgaGFzaGluZyBpcyB0dXJuZWQgb24gYnkgZGVmYXVsdCBvbiBjb3JlY2xyIHNvIEVxdWFsaXR5Q29tcGFyZXI8c3RyaW5nPi5EZWZhdWx0IHdpbGwgXHJcbiAgICAgICAgICAgIC8vIGJlIHVzaW5nIHJhbmRvbWl6ZWQgc3RyaW5nIGhhc2hpbmdcclxuIFxyXG4gICAgICAgICAgICBpZiAoY29sbGlzaW9uQ291bnQgPiBIYXNoSGVscGVycy5IYXNoQ29sbGlzaW9uVGhyZXNob2xkICYmIGNvbXBhcmVyID09IE5vblJhbmRvbWl6ZWRTdHJpbmdFcXVhbGl0eUNvbXBhcmVyLkRlZmF1bHQpIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21wYXJlciA9IChJRXF1YWxpdHlDb21wYXJlcjxUS2V5PikgRXF1YWxpdHlDb21wYXJlcjxzdHJpbmc+LkRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICBSZXNpemUoZW50cmllcy5MZW5ndGgsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiNlbHNlXHJcbiAgICAgICAgICAgIGlmKGNvbGxpc2lvbkNvdW50ID4gSGFzaEhlbHBlcnMuSGFzaENvbGxpc2lvblRocmVzaG9sZCAmJiBIYXNoSGVscGVycy5Jc1dlbGxLbm93bkVxdWFsaXR5Q29tcGFyZXIoY29tcGFyZXIpKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29tcGFyZXIgPSAoSUVxdWFsaXR5Q29tcGFyZXI8VEtleT4pIEhhc2hIZWxwZXJzLkdldFJhbmRvbWl6ZWRFcXVhbGl0eUNvbXBhcmVyKGNvbXBhcmVyKTtcclxuICAgICAgICAgICAgICAgIFJlc2l6ZShlbnRyaWVzLkxlbmd0aCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuI2VuZGlmIC8vIEZFQVRVUkVfQ09SRUNMUlxyXG4gXHJcbiNlbmRpZlxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZXNpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmVzaXplKF9IYXNoSGVscGVycy5FeHBhbmRQcmltZShjb3VudCksIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZXNpemUoaW50IG5ld1NpemUsIGJvb2wgZm9yY2VOZXdIYXNoQ29kZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0NvbnRyYWN0LkFzc2VydChuZXdTaXplID49IGVudHJpZXMuTGVuZ3RoKTtcclxuICAgICAgICAgICAgaW50W10gbmV3QnVja2V0cyA9IG5ldyBpbnRbbmV3U2l6ZV07XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbmV3QnVja2V0cy5MZW5ndGg7IGkrKykgbmV3QnVja2V0c1tpXSA9IC0xO1xyXG4gICAgICAgICAgICBFbnRyeVtdIG5ld0VudHJpZXMgPSBuZXcgRW50cnlbbmV3U2l6ZV07XHJcbiAgICAgICAgICAgIEFycmF5LkNvcHkoZW50cmllcywgMCwgbmV3RW50cmllcywgMCwgY291bnQpO1xyXG4gICAgICAgICAgICBpZiAoZm9yY2VOZXdIYXNoQ29kZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY291bnQ7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3RW50cmllc1tpXS5oYXNoQ29kZSAhPSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0VudHJpZXNbaV0uaGFzaENvZGUgPSAoY29tcGFyZXIuR2V0SGFzaENvZGUobmV3RW50cmllc1tpXS5rZXkpICYgMHg3RkZGRkZGRik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0VudHJpZXNbaV0uaGFzaENvZGUgPj0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgYnVja2V0ID0gbmV3RW50cmllc1tpXS5oYXNoQ29kZSAlIG5ld1NpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3RW50cmllc1tpXS5uZXh0ID0gbmV3QnVja2V0c1tidWNrZXRdO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0J1Y2tldHNbYnVja2V0XSA9IGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVja2V0cyA9IG5ld0J1Y2tldHM7XHJcbiAgICAgICAgICAgIGVudHJpZXMgPSBuZXdFbnRyaWVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgUmVtb3ZlKFRLZXkga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChidWNrZXRzICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBoYXNoQ29kZSA9IGNvbXBhcmVyLkdldEhhc2hDb2RlKGtleSkgJiAweDdGRkZGRkZGO1xyXG4gICAgICAgICAgICAgICAgaW50IGJ1Y2tldCA9IGhhc2hDb2RlICUgYnVja2V0cy5MZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBpbnQgbGFzdCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IGJ1Y2tldHNbYnVja2V0XTsgaSA+PSAwOyBsYXN0ID0gaSwgaSA9IGVudHJpZXNbaV0ubmV4dClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cmllc1tpXS5oYXNoQ29kZSA9PSBoYXNoQ29kZSAmJiBjb21wYXJlci5FcXVhbHMoZW50cmllc1tpXS5rZXksIGtleSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdCA8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Y2tldHNbYnVja2V0XSA9IGVudHJpZXNbaV0ubmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJpZXNbbGFzdF0ubmV4dCA9IGVudHJpZXNbaV0ubmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyaWVzW2ldLmhhc2hDb2RlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJpZXNbaV0ubmV4dCA9IGZyZWVMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyaWVzW2ldLmtleSA9IGRlZmF1bHQoVEtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJpZXNbaV0udmFsdWUgPSBkZWZhdWx0KFRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyZWVMaXN0ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJlZUNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFRyeUdldFZhbHVlKFRLZXkga2V5LCBvdXQgVFZhbHVlIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGkgPSBGaW5kRW50cnkoa2V5KTtcclxuICAgICAgICAgICAgaWYgKGkgPj0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBlbnRyaWVzW2ldLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFsdWUgPSBkZWZhdWx0KFRWYWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBtZXRob2QgZm9yIHRoZSBpbnRlcm5hbCBjYWxsZXJzIHRoYXQgd2VyZSBjb252ZXJ0ZWQgZnJvbSB1c2luZyBIYXNodGFibGUuXHJcbiAgICAgICAgLy8gTWFueSB3ZXJlIGNvbWJpbmluZyBrZXkgZG9lc24ndCBleGlzdCBhbmQga2V5IGV4aXN0cyBidXQgbnVsbCB2YWx1ZSAoZm9yIG5vbi12YWx1ZSB0eXBlcykgY2hlY2tzLlxyXG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIHRoZW0gdG8gY29udGludWUgZ2V0dGluZyB0aGF0IGJlaGF2aW9yIHdpdGggbWluaW1hbCBjb2RlIGRlbHRhLiBUaGlzIGlzIGJhc2ljYWxseVxyXG4gICAgICAgIC8vIFRyeUdldFZhbHVlIHdpdGhvdXQgdGhlIG91dCBwYXJhbVxyXG4gICAgICAgIGludGVybmFsIFRWYWx1ZSBHZXRWYWx1ZU9yRGVmYXVsdChUS2V5IGtleSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBpID0gRmluZEVudHJ5KGtleSk7XHJcbiAgICAgICAgICAgIGlmIChpID49IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbnRyaWVzW2ldLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0KFRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib29sIElDb2xsZWN0aW9uPEtleVZhbHVlUGFpcjxUS2V5LCBUVmFsdWU+Pi5Jc1JlYWRPbmx5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgSUNvbGxlY3Rpb248S2V5VmFsdWVQYWlyPFRLZXksIFRWYWx1ZT4+LkNvcHlUbyhLZXlWYWx1ZVBhaXI8VEtleSwgVFZhbHVlPltdIGFycmF5LCBpbnQgaW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb3B5VG8oYXJyYXksIGluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgSUNvbGxlY3Rpb24uQ29weVRvKEFycmF5IGFycmF5LCBpbnQgaW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYXJyYXkgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYXJyYXkuUmFuayAhPSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFycmF5LkdldExvd2VyQm91bmQoMCkgIT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiBhcnJheS5MZW5ndGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFycmF5Lkxlbmd0aCAtIGluZGV4IDwgQ291bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBLZXlWYWx1ZVBhaXI8VEtleSwgVFZhbHVlPltdIHBhaXJzID0gYXJyYXkgYXMgS2V5VmFsdWVQYWlyPFRLZXksIFRWYWx1ZT5bXTtcclxuICAgICAgICAgICAgaWYgKHBhaXJzICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvcHlUbyhwYWlycywgaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFycmF5IGlzIERpY3Rpb25hcnlFbnRyeVtdKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEaWN0aW9uYXJ5RW50cnlbXSBkaWN0RW50cnlBcnJheSA9IGFycmF5IGFzIERpY3Rpb25hcnlFbnRyeVtdO1xyXG4gICAgICAgICAgICAgICAgRW50cnlbXSBlbnRyaWVzID0gdGhpcy5lbnRyaWVzO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyaWVzW2ldLmhhc2hDb2RlID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWN0RW50cnlBcnJheVtpbmRleCsrXSA9IG5ldyBEaWN0aW9uYXJ5RW50cnkoZW50cmllc1tpXS5rZXksIGVudHJpZXNbaV0udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdFtdIG9iamVjdHMgPSBhcnJheSBhcyBvYmplY3RbXTtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaW50IGNvdW50ID0gdGhpcy5jb3VudDtcclxuICAgICAgICAgICAgICAgIEVudHJ5W10gZW50cmllcyA9IHRoaXMuZW50cmllcztcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY291bnQ7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cmllc1tpXS5oYXNoQ29kZSA+PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpbmRleCsrXSA9IG5ldyBLZXlWYWx1ZVBhaXI8VEtleSwgVFZhbHVlPihlbnRyaWVzW2ldLmtleSwgZW50cmllc1tpXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBJRW51bWVyYXRvciBJRW51bWVyYWJsZS5HZXRFbnVtZXJhdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvcih0aGlzLCBFbnVtZXJhdG9yLktleVZhbHVlUGFpcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib29sIF9JRGljdGlvbmFyeS5Jc0ZpeGVkU2l6ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib29sIF9JRGljdGlvbmFyeS5Jc1JlYWRPbmx5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIElDb2xsZWN0aW9uIF9JRGljdGlvbmFyeS5LZXlzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gKElDb2xsZWN0aW9uKUtleXM7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIElDb2xsZWN0aW9uIF9JRGljdGlvbmFyeS5WYWx1ZXNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiAoSUNvbGxlY3Rpb24pVmFsdWVzOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvYmplY3QgX0lEaWN0aW9uYXJ5LnRoaXNbb2JqZWN0IGtleV1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSXNDb21wYXRpYmxlS2V5KGtleSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IGkgPSBGaW5kRW50cnkoKFRLZXkpa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVudHJpZXNbaV0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJ5XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVEtleSB0ZW1wS2V5ID0gKFRLZXkpa2V5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1t0ZW1wS2V5XSA9IChUVmFsdWUpdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChJbnZhbGlkQ2FzdEV4Y2VwdGlvbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoSW52YWxpZENhc3RFeGNlcHRpb24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIElzQ29tcGF0aWJsZUtleShvYmplY3Qga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChrZXkgaXMgVEtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIF9JRGljdGlvbmFyeS5BZGQob2JqZWN0IGtleSwgb2JqZWN0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVEtleSB0ZW1wS2V5ID0gKFRLZXkpa2V5O1xyXG5cclxuICAgICAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEFkZCh0ZW1wS2V5LCAoVFZhbHVlKXZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChJbnZhbGlkQ2FzdEV4Y2VwdGlvbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoSW52YWxpZENhc3RFeGNlcHRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib29sIF9JRGljdGlvbmFyeS5Db250YWlucyhvYmplY3Qga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKElzQ29tcGF0aWJsZUtleShrZXkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29udGFpbnNLZXkoKFRLZXkpa2V5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgSURpY3Rpb25hcnlFbnVtZXJhdG9yIF9JRGljdGlvbmFyeS5HZXRFbnVtZXJhdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW51bWVyYXRvcih0aGlzLCBFbnVtZXJhdG9yLkRpY3RFbnRyeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIF9JRGljdGlvbmFyeS5SZW1vdmUob2JqZWN0IGtleSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChJc0NvbXBhdGlibGVLZXkoa2V5KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUmVtb3ZlKChUS2V5KWtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFtTZXJpYWxpemFibGVdXHJcbiAgICAgICAgW0ZpbGVOYW1lKFwiZGljdGlvbmFyeS5qc1wiKV1cclxuICAgICAgICBwdWJsaWMgc3RydWN0IEVudW1lcmF0b3IgOiBJRW51bWVyYXRvcjxLZXlWYWx1ZVBhaXI8VEtleSwgVFZhbHVlPj4sXHJcbiAgICAgICAgICAgIElEaWN0aW9uYXJ5RW51bWVyYXRvclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJpdmF0ZSBfRGljdGlvbmFyeTxUS2V5LCBUVmFsdWU+IGRpY3Rpb25hcnk7XHJcbiAgICAgICAgICAgIHByaXZhdGUgaW50IHZlcnNpb247XHJcbiAgICAgICAgICAgIHByaXZhdGUgaW50IGluZGV4O1xyXG4gICAgICAgICAgICBwcml2YXRlIEtleVZhbHVlUGFpcjxUS2V5LCBUVmFsdWU+IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIHByaXZhdGUgaW50IGdldEVudW1lcmF0b3JSZXRUeXBlOyAgLy8gV2hhdCBzaG91bGQgRW51bWVyYXRvci5DdXJyZW50IHJldHVybj9cclxuXHJcbiAgICAgICAgICAgIGludGVybmFsIGNvbnN0IGludCBEaWN0RW50cnkgPSAxO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBjb25zdCBpbnQgS2V5VmFsdWVQYWlyID0gMjtcclxuXHJcbiAgICAgICAgICAgIGludGVybmFsIEVudW1lcmF0b3IoX0RpY3Rpb25hcnk8VEtleSwgVFZhbHVlPiBkaWN0aW9uYXJ5LCBpbnQgZ2V0RW51bWVyYXRvclJldFR5cGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGljdGlvbmFyeSA9IGRpY3Rpb25hcnk7XHJcbiAgICAgICAgICAgICAgICB2ZXJzaW9uID0gZGljdGlvbmFyeS52ZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbnVtZXJhdG9yUmV0VHlwZSA9IGdldEVudW1lcmF0b3JSZXRUeXBlO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG5ldyBLZXlWYWx1ZVBhaXI8VEtleSwgVFZhbHVlPigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBNb3ZlTmV4dCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh2ZXJzaW9uICE9IGRpY3Rpb25hcnkudmVyc2lvbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVzZSB1bnNpZ25lZCBjb21wYXJpc29uIHNpbmNlIHdlIHNldCBpbmRleCB0byBkaWN0aW9uYXJ5LmNvdW50KzEgd2hlbiB0aGUgZW51bWVyYXRpb24gZW5kcy5cclxuICAgICAgICAgICAgICAgIC8vIGRpY3Rpb25hcnkuY291bnQrMSBjb3VsZCBiZSBuZWdhdGl2ZSBpZiBkaWN0aW9uYXJ5LmNvdW50IGlzIEludDMyLk1heFZhbHVlXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoKHVpbnQpaW5kZXggPCAodWludClkaWN0aW9uYXJ5LmNvdW50KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWN0aW9uYXJ5LmVudHJpZXNbaW5kZXhdLmhhc2hDb2RlID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gbmV3IEtleVZhbHVlUGFpcjxUS2V5LCBUVmFsdWU+KGRpY3Rpb25hcnkuZW50cmllc1tpbmRleF0ua2V5LCBkaWN0aW9uYXJ5LmVudHJpZXNbaW5kZXhdLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBkaWN0aW9uYXJ5LmNvdW50ICsgMTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBuZXcgS2V5VmFsdWVQYWlyPFRLZXksIFRWYWx1ZT4oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIEtleVZhbHVlUGFpcjxUS2V5LCBUVmFsdWU+IEN1cnJlbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGN1cnJlbnQ7IH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHZvaWQgRGlzcG9zZSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb2JqZWN0IElFbnVtZXJhdG9yLkN1cnJlbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IDAgfHwgKGluZGV4ID09IGRpY3Rpb25hcnkuY291bnQgKyAxKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0RW51bWVyYXRvclJldFR5cGUgPT0gRGljdEVudHJ5KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTeXN0ZW0uQ29sbGVjdGlvbnMuRGljdGlvbmFyeUVudHJ5KGN1cnJlbnQuS2V5LCBjdXJyZW50LlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBLZXlWYWx1ZVBhaXI8VEtleSwgVFZhbHVlPihjdXJyZW50LktleSwgY3VycmVudC5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2b2lkIElFbnVtZXJhdG9yLlJlc2V0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZlcnNpb24gIT0gZGljdGlvbmFyeS52ZXJzaW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG5ldyBLZXlWYWx1ZVBhaXI8VEtleSwgVFZhbHVlPigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBEaWN0aW9uYXJ5RW50cnkgSURpY3Rpb25hcnlFbnVtZXJhdG9yLkVudHJ5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSAwIHx8IChpbmRleCA9PSBkaWN0aW9uYXJ5LmNvdW50ICsgMSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEaWN0aW9uYXJ5RW50cnkoY3VycmVudC5LZXksIGN1cnJlbnQuVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvYmplY3QgSURpY3Rpb25hcnlFbnVtZXJhdG9yLktleVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gMCB8fCAoaW5kZXggPT0gZGljdGlvbmFyeS5jb3VudCArIDEpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50LktleTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb2JqZWN0IElEaWN0aW9uYXJ5RW51bWVyYXRvci5WYWx1ZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gMCB8fCAoaW5kZXggPT0gZGljdGlvbmFyeS5jb3VudCArIDEpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50LlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFtTZXJpYWxpemFibGVdXHJcbiAgICAgICAgW0ZpbGVOYW1lKFwiZGljdGlvbmFyeS5qc1wiKV1cclxuICAgICAgICBwdWJsaWMgc2VhbGVkIGNsYXNzIEtleUNvbGxlY3Rpb24gOiBJQ29sbGVjdGlvbjxUS2V5PiwgSUNvbGxlY3Rpb24sIElSZWFkT25seUNvbGxlY3Rpb248VEtleT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByaXZhdGUgX0RpY3Rpb25hcnk8VEtleSwgVFZhbHVlPiBkaWN0aW9uYXJ5O1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEtleUNvbGxlY3Rpb24oX0RpY3Rpb25hcnk8VEtleSwgVFZhbHVlPiBkaWN0aW9uYXJ5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGljdGlvbmFyeSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGljdGlvbmFyeSA9IGRpY3Rpb25hcnk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBFbnVtZXJhdG9yIEdldEVudW1lcmF0b3IoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVudW1lcmF0b3IoZGljdGlvbmFyeSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyB2b2lkIENvcHlUbyhUS2V5W10gYXJyYXksIGludCBpbmRleClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycmF5ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiBhcnJheS5MZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhcnJheS5MZW5ndGggLSBpbmRleCA8IGRpY3Rpb25hcnkuQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaW50IGNvdW50ID0gZGljdGlvbmFyeS5jb3VudDtcclxuICAgICAgICAgICAgICAgIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLl9EaWN0aW9uYXJ5PFRLZXksIFRWYWx1ZT4uRW50cnlbXSBlbnRyaWVzID0gZGljdGlvbmFyeS5lbnRyaWVzO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyaWVzW2ldLmhhc2hDb2RlID49IDApIGFycmF5W2luZGV4KytdID0gZW50cmllc1tpXS5rZXk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgQ291bnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGRpY3Rpb25hcnkuQ291bnQ7IH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYm9vbCBJQ29sbGVjdGlvbjxUS2V5Pi5Jc1JlYWRPbmx5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGdldCB7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZvaWQgSUNvbGxlY3Rpb248VEtleT4uQWRkKFRLZXkgaXRlbSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdFN1cHBvcnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2b2lkIElDb2xsZWN0aW9uPFRLZXk+LkNsZWFyKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdFN1cHBvcnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBib29sIElDb2xsZWN0aW9uPFRLZXk+LkNvbnRhaW5zKFRLZXkgaXRlbSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnkuQ29udGFpbnNLZXkoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJvb2wgSUNvbGxlY3Rpb248VEtleT4uUmVtb3ZlKFRLZXkgaXRlbSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdFN1cHBvcnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBJRW51bWVyYXRvcjxUS2V5PiBJRW51bWVyYWJsZTxUS2V5Pi5HZXRFbnVtZXJhdG9yKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yKGRpY3Rpb25hcnkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBJRW51bWVyYXRvciBJRW51bWVyYWJsZS5HZXRFbnVtZXJhdG9yKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yKGRpY3Rpb25hcnkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2b2lkIElDb2xsZWN0aW9uLkNvcHlUbyhBcnJheSBhcnJheSwgaW50IGluZGV4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXkgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFycmF5LlJhbmsgIT0gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXkuR2V0TG93ZXJCb3VuZCgwKSAhPSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiBhcnJheS5MZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhcnJheS5MZW5ndGggLSBpbmRleCA8IGRpY3Rpb25hcnkuQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgVEtleVtdIGtleXMgPSBhcnJheSBhcyBUS2V5W107XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5cyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENvcHlUbyhrZXlzLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0W10gb2JqZWN0cyA9IGFycmF5IGFzIG9iamVjdFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RzID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGludCBjb3VudCA9IGRpY3Rpb25hcnkuY291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuX0RpY3Rpb25hcnk8VEtleSwgVFZhbHVlPi5FbnRyeVtdIGVudHJpZXMgPSBkaWN0aW9uYXJ5LmVudHJpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJpZXNbaV0uaGFzaENvZGUgPj0gMCkgb2JqZWN0c1tpbmRleCsrXSA9IGVudHJpZXNbaV0ua2V5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgW1NlcmlhbGl6YWJsZV1cclxuICAgICAgICAgICAgW0ZpbGVOYW1lKFwiZGljdGlvbmFyeS5qc1wiKV1cclxuICAgICAgICAgICAgcHVibGljIHN0cnVjdCBFbnVtZXJhdG9yIDogSUVudW1lcmF0b3I8VEtleT4sIFN5c3RlbS5Db2xsZWN0aW9ucy5JRW51bWVyYXRvclxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9EaWN0aW9uYXJ5PFRLZXksIFRWYWx1ZT4gZGljdGlvbmFyeTtcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgaW50IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBpbnQgdmVyc2lvbjtcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgVEtleSBjdXJyZW50S2V5O1xyXG5cclxuICAgICAgICAgICAgICAgIGludGVybmFsIEVudW1lcmF0b3IoX0RpY3Rpb25hcnk8VEtleSwgVFZhbHVlPiBkaWN0aW9uYXJ5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGljdGlvbmFyeSA9IGRpY3Rpb25hcnk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiA9IGRpY3Rpb25hcnkudmVyc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEtleSA9IGRlZmF1bHQoVEtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIHZvaWQgRGlzcG9zZSgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIGJvb2wgTW92ZU5leHQoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2ZXJzaW9uICE9IGRpY3Rpb25hcnkudmVyc2lvbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKHVpbnQpaW5kZXggPCAodWludClkaWN0aW9uYXJ5LmNvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpY3Rpb25hcnkuZW50cmllc1tpbmRleF0uaGFzaENvZGUgPj0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEtleSA9IGRpY3Rpb25hcnkuZW50cmllc1tpbmRleF0ua2V5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGRpY3Rpb25hcnkuY291bnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRLZXkgPSBkZWZhdWx0KFRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgVEtleSBDdXJyZW50XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudEtleTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgT2JqZWN0IFN5c3RlbS5Db2xsZWN0aW9ucy5JRW51bWVyYXRvci5DdXJyZW50XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gMCB8fCAoaW5kZXggPT0gZGljdGlvbmFyeS5jb3VudCArIDEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudEtleTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdm9pZCBTeXN0ZW0uQ29sbGVjdGlvbnMuSUVudW1lcmF0b3IuUmVzZXQoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2ZXJzaW9uICE9IGRpY3Rpb25hcnkudmVyc2lvbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEtleSA9IGRlZmF1bHQoVEtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgW1NlcmlhbGl6YWJsZV1cclxuICAgICAgICBbRmlsZU5hbWUoXCJkaWN0aW9uYXJ5LmpzXCIpXVxyXG4gICAgICAgIHB1YmxpYyBzZWFsZWQgY2xhc3MgVmFsdWVDb2xsZWN0aW9uIDogSUNvbGxlY3Rpb248VFZhbHVlPiwgSUNvbGxlY3Rpb24sIElSZWFkT25seUNvbGxlY3Rpb248VFZhbHVlPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJpdmF0ZSBfRGljdGlvbmFyeTxUS2V5LCBUVmFsdWU+IGRpY3Rpb25hcnk7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgVmFsdWVDb2xsZWN0aW9uKF9EaWN0aW9uYXJ5PFRLZXksIFRWYWx1ZT4gZGljdGlvbmFyeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpY3Rpb25hcnkgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpY3Rpb25hcnkgPSBkaWN0aW9uYXJ5O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgRW51bWVyYXRvciBHZXRFbnVtZXJhdG9yKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yKGRpY3Rpb25hcnkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdm9pZCBDb3B5VG8oVFZhbHVlW10gYXJyYXksIGludCBpbmRleClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycmF5ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiBhcnJheS5MZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhcnJheS5MZW5ndGggLSBpbmRleCA8IGRpY3Rpb25hcnkuQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaW50IGNvdW50ID0gZGljdGlvbmFyeS5jb3VudDtcclxuICAgICAgICAgICAgICAgIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLl9EaWN0aW9uYXJ5PFRLZXksIFRWYWx1ZT4uRW50cnlbXSBlbnRyaWVzID0gZGljdGlvbmFyeS5lbnRyaWVzO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyaWVzW2ldLmhhc2hDb2RlID49IDApIGFycmF5W2luZGV4KytdID0gZW50cmllc1tpXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGludCBDb3VudFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnZXQgeyByZXR1cm4gZGljdGlvbmFyeS5Db3VudDsgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBib29sIElDb2xsZWN0aW9uPFRWYWx1ZT4uSXNSZWFkT25seVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnZXQgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2b2lkIElDb2xsZWN0aW9uPFRWYWx1ZT4uQWRkKFRWYWx1ZSBpdGVtKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm90U3VwcG9ydGVkRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJvb2wgSUNvbGxlY3Rpb248VFZhbHVlPi5SZW1vdmUoVFZhbHVlIGl0ZW0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RTdXBwb3J0ZWRFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdm9pZCBJQ29sbGVjdGlvbjxUVmFsdWU+LkNsZWFyKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdFN1cHBvcnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBib29sIElDb2xsZWN0aW9uPFRWYWx1ZT4uQ29udGFpbnMoVFZhbHVlIGl0ZW0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5LkNvbnRhaW5zVmFsdWUoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIElFbnVtZXJhdG9yPFRWYWx1ZT4gSUVudW1lcmFibGU8VFZhbHVlPi5HZXRFbnVtZXJhdG9yKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yKGRpY3Rpb25hcnkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBJRW51bWVyYXRvciBJRW51bWVyYWJsZS5HZXRFbnVtZXJhdG9yKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yKGRpY3Rpb25hcnkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2b2lkIElDb2xsZWN0aW9uLkNvcHlUbyhBcnJheSBhcnJheSwgaW50IGluZGV4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXkgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFycmF5LlJhbmsgIT0gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRFeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXkuR2V0TG93ZXJCb3VuZCgwKSAhPSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiBhcnJheS5MZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhcnJheS5MZW5ndGggLSBpbmRleCA8IGRpY3Rpb25hcnkuQ291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgVFZhbHVlW10gdmFsdWVzID0gYXJyYXkgYXMgVFZhbHVlW107XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVzICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ29weVRvKHZhbHVlcywgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFtdIG9iamVjdHMgPSBhcnJheSBhcyBvYmplY3RbXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0cyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbnQgY291bnQgPSBkaWN0aW9uYXJ5LmNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLl9EaWN0aW9uYXJ5PFRLZXksIFRWYWx1ZT4uRW50cnlbXSBlbnRyaWVzID0gZGljdGlvbmFyeS5lbnRyaWVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY291bnQ7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyaWVzW2ldLmhhc2hDb2RlID49IDApIG9iamVjdHNbaW5kZXgrK10gPSBlbnRyaWVzW2ldLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgW1NlcmlhbGl6YWJsZV1cclxuICAgICAgICAgICAgW0ZpbGVOYW1lKFwiZGljdGlvbmFyeS5qc1wiKV1cclxuICAgICAgICAgICAgcHVibGljIHN0cnVjdCBFbnVtZXJhdG9yIDogSUVudW1lcmF0b3I8VFZhbHVlPiwgU3lzdGVtLkNvbGxlY3Rpb25zLklFbnVtZXJhdG9yXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX0RpY3Rpb25hcnk8VEtleSwgVFZhbHVlPiBkaWN0aW9uYXJ5O1xyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBpbnQgaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGludCB2ZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBUVmFsdWUgY3VycmVudFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGludGVybmFsIEVudW1lcmF0b3IoX0RpY3Rpb25hcnk8VEtleSwgVFZhbHVlPiBkaWN0aW9uYXJ5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGljdGlvbmFyeSA9IGRpY3Rpb25hcnk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiA9IGRpY3Rpb25hcnkudmVyc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFZhbHVlID0gZGVmYXVsdChUVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyB2b2lkIERpc3Bvc2UoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBib29sIE1vdmVOZXh0KClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmVyc2lvbiAhPSBkaWN0aW9uYXJ5LnZlcnNpb24pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCh1aW50KWluZGV4IDwgKHVpbnQpZGljdGlvbmFyeS5jb3VudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWN0aW9uYXJ5LmVudHJpZXNbaW5kZXhdLmhhc2hDb2RlID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IGRpY3Rpb25hcnkuZW50cmllc1tpbmRleF0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBkaWN0aW9uYXJ5LmNvdW50ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBkZWZhdWx0KFRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBUVmFsdWUgQ3VycmVudFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgT2JqZWN0IFN5c3RlbS5Db2xsZWN0aW9ucy5JRW51bWVyYXRvci5DdXJyZW50XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gMCB8fCAoaW5kZXggPT0gZGljdGlvbmFyeS5jb3VudCArIDEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2b2lkIFN5c3RlbS5Db2xsZWN0aW9ucy5JRW51bWVyYXRvci5SZXNldCgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnNpb24gIT0gZGljdGlvbmFyeS52ZXJzaW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IGRlZmF1bHQoVFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K
