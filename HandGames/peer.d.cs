using Bridge;
using Function = System.Delegate;
//using number = System.Double;
//using any = Bridge.Union<System.Delegate, object>;
//using boolean = System.Boolean;
#pragma warning disable CS0626
#pragma warning disable CS0824
//[assembly: Convention(Notation.LowerCamelCase)]

namespace PeerJs
{
    [External]
	public partial interface PeerJSOption
	{
		System.String key { get; set; }
		System.String host { get; set; }
		System.Double port { get; set; }
		System.String path { get; set; }
		System.Boolean secure { get; set; }
		System.Double debug { get; set; }
	}
	
	[External]
	public partial interface PeerConnectOption
	{
		System.String label { get; set; }
		System.Object metadata { get; set; }
		System.String serialization { get; set; }
		System.Boolean reliable { get; set; }
	}
	
	[External]
	public partial interface DataConnection
	{
		System.String label { get; set; }
		System.Object metadata { get; set; }
		System.Boolean open { get; set; }
		System.Object peerConnection { get; set; }
		System.String peer { get; set; }
		System.Boolean reliable { get; set; }
		System.String serialization { get; set; }
		System.String type { get; set; }
		System.Double buffSize { get; set; }
		void send (System.Object data);
		void close ();
		void on (System.String @event, DataConnection_on_Param_cb_ReturnType_32_2 cb);
		void on (DataConnection_on_Param_event_data @event, DataConnection_on_Param_cb_ReturnType_30_2 cb);
		void on (DataConnection_on_Param_event_open @event, DataConnection_on_Param_cb_ReturnType_28_2 cb);
		void on (DataConnection_on_Param_event_close @event, DataConnection_on_Param_cb_ReturnType_26_2 cb);
		void on (DataConnection_on_Param_event_error @event, DataConnection_on_Param_cb_ReturnType_24_2 cb);
		void off (System.String @event, Function fn, System.Boolean once = default(System.Boolean));
	}
	
	[External]
	public partial interface MediaConnection
	{
		System.Boolean open { get; set; }
		System.Object metadata { get; set; }
		System.String peer { get; set; }
		System.String type { get; set; }
		void answer (System.Object stream = default(System.Object));
		void close ();
		void on (System.String @event, MediaConnection_on_Param_cb_ReturnType_22_2 cb);
		void on (MediaConnection_on_Param_event_stream @event, MediaConnection_on_Param_cb_ReturnType_20_2 cb);
		void on (MediaConnection_on_Param_event_close @event, MediaConnection_on_Param_cb_ReturnType_18_2 cb);
		void on (MediaConnection_on_Param_event_error @event, MediaConnection_on_Param_cb_ReturnType_16_2 cb);
		void off (System.String @event, Function fn, System.Boolean once = default(System.Boolean));
	}
	
	[External]
	public partial interface utilSupportsObj
	{
		System.Boolean audioVideo { get; set; }
		System.Boolean data { get; set; }
		System.Boolean binary { get; set; }
		System.Boolean reliable { get; set; }
	}
	
	[External]
	public partial interface util
	{
		System.String browser { get; set; }
		utilSupportsObj supports { get; set; }
	}
	
	[External]
	public partial interface Peer
	{
		/// <summary>
		/// The brokering ID of this peer
		/// </summary>
		System.String id { get; set; }
		/// <summary>
		/// A hash of all connections associated with this peer, keyed by the remote peer's ID.
		/// </summary>
		System.Object connections { get; set; }
		/// <summary>
		/// false if there is an active connection to the PeerServer.
		/// </summary>
		System.Boolean disconnected { get; set; }
		/// <summary>
		/// true if this peer and all of its connections can no longer be used.
		/// </summary>
		System.Boolean destroyed { get; set; }
		/// <summary>
		/// 
		/// </summary><param name="id">
		/// The brokering ID of the remote peer (their peer.id).
		/// </param><param name="options">
		/// for specifying details about Peer Connection
		/// </param>
		PeerJs.DataConnection connect (System.String id, PeerJs.PeerConnectOption options = default(PeerJs.PeerConnectOption));
		/// <summary>
		/// Connects to the remote peer specified by id and returns a data connection.
		/// </summary><param name="id">
		/// The brokering ID of the remote peer (their peer.id).
		/// </param><param name="stream">
		/// The caller's media stream
		/// </param><param name="options">
		/// Metadata associated with the connection, passed in by whoever initiated the connection.
		/// </param>
		PeerJs.MediaConnection call (System.String id, System.Object stream, System.Object options = default(System.Object));
		/// <summary>
		/// Calls the remote peer specified by id and returns a media connection.
		/// </summary><param name="event">
		/// Event name
		/// </param><param name="cb">
		/// Callback Function
		/// </param>
		void on (System.String @event, Peer_on_Param_cb_ReturnType_14_2 cb);
		/// <summary>
		/// Emitted when a connection to the PeerServer is established.
		/// </summary><param name="event">
		/// Event name
		/// </param><param name="cb">
		/// id is the brokering ID of the peer
		/// </param>
		void on (Peer_on_Param_event_open @event, Peer_on_Param_cb_ReturnType_12_2 cb);
		/// <summary>
		/// Emitted when a new data connection is established from a remote peer.
		/// </summary><param name="event">
		/// Event name
		/// </param><param name="cb">
		/// Callback Function
		/// </param>
		void on (Peer_on_Param_event_connection @event, Peer_on_Param_cb_ReturnType_10_2 cb);
		/// <summary>
		/// Emitted when a remote peer attempts to call you.
		/// </summary><param name="event">
		/// Event name
		/// </param><param name="cb">
		/// Callback Function
		/// </param>
		void on (Peer_on_Param_event_call @event, Peer_on_Param_cb_ReturnType_8_2 cb);
		/// <summary>
		/// Emitted when the peer is destroyed and can no longer accept or create any new connections.
		/// </summary><param name="event">
		/// Event name
		/// </param><param name="cb">
		/// Callback Function
		/// </param>
		void on (Peer_on_Param_event_close @event, Peer_on_Param_cb_ReturnType_6_2 cb);
		/// <summary>
		/// Emitted when the peer is disconnected from the signalling server
		/// </summary><param name="event">
		/// Event name
		/// </param><param name="cb">
		/// Callback Function
		/// </param>
		void on (Peer_on_Param_event_disconnected @event, Peer_on_Param_cb_ReturnType_4_2 cb);
		/// <summary>
		/// Errors on the peer are almost always fatal and will destroy the peer.
		/// </summary><param name="event">
		/// Event name
		/// </param><param name="cb">
		/// Callback Function
		/// </param>
		void on (Peer_on_Param_event_error @event, Peer_on_Param_cb_ReturnType_2_2 cb);
		/// <summary>
		/// Remove event listeners.(EventEmitter3)
		/// </summary><param name="event">
		/// The event we want to remove.
		/// </param><param name="fn">
		/// The listener that we need to find.
		/// </param><param name="once">
		/// Only remove once listeners.
		/// </param>
		void off (System.String @event, Function fn, System.Boolean once = default(System.Boolean));
		/// <summary>
		/// Close the connection to the server, leaving all existing data and media connections intact.
		/// </summary>
		void disconnect ();
		/// <summary>
		/// Attempt to reconnect to the server with the peer's old ID
		/// </summary>
		void reconnect ();
		/// <summary>
		/// Close the connection to the server and terminate all existing connections.
		/// </summary>
		void destroy ();
		/// <summary>
		/// Retrieve a data/media connection for this peer.
		/// </summary><param name="id">
		/// 
		/// </param>
		System.Object getConnection (Peer peer, System.String id);
		/// <summary>
		/// Get a list of available peer IDs
		/// </summary><param name="callback">
		/// 
		/// </param>
		void listAllPeers (Peer_listAllPeers_Param_callback_ReturnType_2_2 callback);
	}
	
}

[External]
[Name("Bridge.global")]
public static partial class Global
{
	[External]
	public partial interface Peer_Type
	{
		/// <summary>
		/// A peer can connect to other peers and listen for connections.
		/// </summary><param name="id">
		/// Other peers can connect to this peer using the provided ID.
		/// If no ID is given, one will be generated by the brokering server.
		/// </param><param name="options">
		/// for specifying details about PeerServer
		/// </param>
		[Template("new {this}({id}, {options})")]
		PeerJs.Peer @new (System.String id, PeerJs.PeerJSOption options = default(PeerJs.PeerJSOption));
		/// <summary>
		/// A peer can connect to other peers and listen for connections.
		/// </summary><param name="options">
		/// for specifying details about PeerServer
		/// </param>
		[Template("new {this}({options})")]
		PeerJs.Peer @new (PeerJs.PeerJSOption options);
	}
	
	public extern static Peer_Type Peer { get; set; }
}

[External]
public partial class NullType
{
	extern NullType();
}

[External]
public partial class UndefinedType
{
	extern UndefinedType();
	public extern static UndefinedType Undefined
	{
		[Template("undefined")]
		get;
	}
}

[External]
public partial class VoidType : UndefinedType
{
	extern VoidType();
}

[External]
public partial class Symbol
{
	public extern Symbol (System.String value);
	public extern Symbol ();
}

[External, Enum(Emit.StringNamePreserveCase)]
public enum DataConnection_on_Param_event_data
{
	data,
}

[External, Enum(Emit.StringNamePreserveCase)]
public enum DataConnection_on_Param_event_open
{
	open,
}

[External, Enum(Emit.StringNamePreserveCase)]
public enum DataConnection_on_Param_event_close
{
	close,
}

[External, Enum(Emit.StringNamePreserveCase)]
public enum DataConnection_on_Param_event_error
{
	error,
}

[External, Enum(Emit.StringNamePreserveCase)]
public enum MediaConnection_on_Param_event_stream
{
	stream,
}

[External, Enum(Emit.StringNamePreserveCase)]
public enum MediaConnection_on_Param_event_close
{
}

[External, Enum(Emit.StringNamePreserveCase)]
public enum MediaConnection_on_Param_event_error
{
}

[External, Enum(Emit.StringNamePreserveCase)]
public enum Peer_on_Param_event_open
{
}

[External, Enum(Emit.StringNamePreserveCase)]
public enum Peer_on_Param_event_connection
{
	connection,
}

[External, Enum(Emit.StringNamePreserveCase)]
public enum Peer_on_Param_event_call
{
	call,
}

[External, Enum(Emit.StringNamePreserveCase)]
public enum Peer_on_Param_event_close
{
}

[External, Enum(Emit.StringNamePreserveCase)]
public enum Peer_on_Param_event_disconnected
{
	disconnected,
}

[External, Enum(Emit.StringNamePreserveCase)]
public enum Peer_on_Param_event_error
{
}

[External]
public delegate void DataConnection_on_Param_cb_ReturnType_32_2 ();

[External]
public delegate void DataConnection_on_Param_cb_ReturnType_30_2 (System.Object data);

[External]
public delegate void DataConnection_on_Param_cb_ReturnType_28_2 ();

[External]
public delegate void DataConnection_on_Param_cb_ReturnType_26_2 ();

[External]
public delegate void DataConnection_on_Param_cb_ReturnType_24_2 (System.Object err);

[External]
public delegate void MediaConnection_on_Param_cb_ReturnType_22_2 ();

[External]
public delegate void MediaConnection_on_Param_cb_ReturnType_20_2 (System.Object stream);

[External]
public delegate void MediaConnection_on_Param_cb_ReturnType_18_2 ();

[External]
public delegate void MediaConnection_on_Param_cb_ReturnType_16_2 (System.Object err);

[External]
public delegate void Peer_on_Param_cb_ReturnType_14_2 ();

[External]
public delegate void Peer_on_Param_cb_ReturnType_12_2 (System.String id);

[External]
public delegate void Peer_on_Param_cb_ReturnType_10_2 (PeerJs.DataConnection dataConnection);

[External]
public delegate void Peer_on_Param_cb_ReturnType_8_2 (PeerJs.MediaConnection mediaConnection);

[External]
public delegate void Peer_on_Param_cb_ReturnType_6_2 ();

[External]
public delegate void Peer_on_Param_cb_ReturnType_4_2 ();

[External]
public delegate void Peer_on_Param_cb_ReturnType_2_2 (System.Object err);

[External]
public delegate void Peer_listAllPeers_Param_callback_ReturnType_2_2 (string[] peerIds);

