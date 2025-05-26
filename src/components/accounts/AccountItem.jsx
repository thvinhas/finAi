import AccountActions from "./AccountActions";

export default function AccountItem({ account, onUpdate, onEdit }) {
  const { name } = account;

  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "8px 0" }}>
      <div>
        <strong>{name}</strong>
      </div>
      <AccountActions onEdit={onEdit} account={account} onUpdate={onUpdate} />
    </div>
  );
}
