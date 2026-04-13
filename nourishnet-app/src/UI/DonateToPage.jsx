import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchHeader from './SearchHeader';
import './DonorPage.css';
import locations from '../data/locations_final_merged.json';

function DonateToPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { locId } = useParams();
  const loc = locations.find(l => l.id === locId);

  const [step, setStep] = useState(0);
  const [donationType, setDonationType] = useState(null);
  const [items, setItems] = useState('');
  const [lbs, setLbs] = useState('');
  const [moneyAmount, setMoneyAmount] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [method, setMethod] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const meals = lbs ? Math.round(Number(lbs) * 1.2) : 0;
  const co2 = lbs ? (Number(lbs) * 3.5).toFixed(1) : 0;
  const water = lbs ? Math.round(Number(lbs) * 108) : 0;

  const handleConfirm = () => {
    setShowThankYou(true);
    setTimeout(() => navigate('/donor'), 4000);
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) { const r = new FileReader(); r.onload = (ev) => setPhotoPreview(ev.target.result); r.readAsDataURL(file); }
  };

  if (!loc) return <div className="donor-root"><SearchHeader backTo="/donor" activeNav="home" navPrefix="/donor" /><p style={{ padding: 40, color: '#4a7c59' }}>{t('donation.locationNotFound')}</p></div>;

  const addr = [loc.address?.street, loc.address?.city, loc.address?.state, loc.address?.zip].filter(Boolean).join(', ');

  if (showThankYou) {
    return (
      <div className="donor-root">
        <SearchHeader backTo="/donor" activeNav="home" navPrefix="/donor" />
        <section className="donor-wizard" style={{ padding: '40px' }}>
          <div className="dw-thankyou">
            <span className="dw-thankyou-icon">🎉</span>
            <h2 className="dw-thankyou-title">{t('donation.thankYou')}</h2>
            <p className="dw-thankyou-msg" dangerouslySetInnerHTML={{ __html: t('donation.donationSubmitted', { name: loc.name }) }} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="donor-root">
      <SearchHeader backTo="/donor" activeNav="home" navPrefix="/donor" />
      <section className="donor-hero anim-fade-up">
        <h1 className="donor-title">{t('donation.donateTo', { name: loc.name })}</h1>
        <p className="donor-subtitle">📍 {addr}</p>
      </section>

      <section className="donor-wizard anim-fade-up anim-d1">
        <div className="dw-header">
          <h2 className="donor-section-title">{step === 0 ? t('donation.chooseDonationType') : step === 4 ? `✅ ${t('donation.review')}` : t('donation.stepOf', { step, total: 3 })}</h2>
          {step > 0 && step < 4 && (<div className="dw-progress">{[1,2,3].map(s => (<span key={s} className={`dw-dot${step >= s ? ' dw-dot--active' : ''}`} />))}</div>)}
        </div>

        {step === 0 && (
          <div className="dw-step">
            <div className="dw-choice-row">
              <button className="dw-choice-btn" onClick={() => { setDonationType('food'); setStep(1); }}><span className="dw-choice-icon">🍎</span><span className="dw-choice-label">{t('donation.food')}</span></button>
              <button className="dw-choice-btn" onClick={() => { setDonationType('money'); setStep(1); }}><span className="dw-choice-icon">💰</span><span className="dw-choice-label">{t('donation.money')}</span></button>
            </div>
          </div>
        )}

        {step === 1 && donationType === 'food' && (
          <div className="dw-step">
            <p className="dw-question">📦 {t('donation.whatDonating')}</p>
            <div className="dw-upload-row">
              <button className="dw-upload-box" onClick={() => fileInputRef.current?.click()}><span className="dw-upload-icon">📷</span><span>{t('ui.takePhoto')}</span></button>
              <input ref={fileInputRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={handlePhoto} />
              <button className="dw-upload-box" onClick={() => textareaRef.current?.focus()}><span className="dw-upload-icon">📝</span><span>{t('ui.typeItems')}</span></button>
            </div>
            {photoPreview && (<div className="dw-photo-preview"><img src={photoPreview} alt="Preview" className="dw-photo-img" /><button className="dw-photo-remove" onClick={() => setPhotoPreview(null)}>✕</button></div>)}
            <textarea ref={textareaRef} className="dw-textarea" placeholder={t('donation.describeItems')} value={items} onChange={e => setItems(e.target.value)} rows={3} />
            <div className="dw-qty-row"><label className="dw-label">{t('donation.weight')}</label><input className="dw-input" type="number" placeholder="lbs" value={lbs} onChange={e => setLbs(e.target.value)} /><span className="dw-unit">lbs</span></div>
            {lbs > 0 && (<div className="dw-impact-mini"><span>🍽️ ~{meals} {t('donation.meals')}</span><span>🌿 ~{co2} lbs CO₂</span></div>)}
            <div className="dw-nav"><button className="dw-back" onClick={() => setStep(0)}>← {t('donation.back')}</button><button className="dw-next" onClick={() => setStep(2)} disabled={!items && !lbs}>{t('donation.next')} →</button></div>
          </div>
        )}

        {step === 1 && donationType === 'money' && (
          <div className="dw-step">
            <p className="dw-question">💰 {t('donation.amount')}</p>
            <div className="dw-money-row">
              {['10','25','50','100'].map(amt => (<button key={amt} className={`dw-money-btn${moneyAmount === amt ? ' dw-money-btn--active' : ''}`} onClick={() => setMoneyAmount(amt)}>${amt}</button>))}
            </div>
            <div className="dw-qty-row"><span className="dw-unit">$</span><input className="dw-input" type="number" placeholder={t('donation.custom')} value={moneyAmount} onChange={e => setMoneyAmount(e.target.value)} /></div>
            <div className="dw-nav"><button className="dw-back" onClick={() => setStep(0)}>← {t('donation.back')}</button><button className="dw-next" onClick={() => setStep(2)} disabled={!moneyAmount}>{t('donation.next')} →</button></div>
          </div>
        )}

        {step === 2 && (
          <div className="dw-step">
            <p className="dw-question">📅 {t('donation.when')}</p>
            <div className="dw-date-row">
              <div className="dw-field"><label className="dw-label">{t('donation.date')}</label><input className="dw-input dw-input--wide" type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
              <div className="dw-field"><label className="dw-label">{t('donation.time')}</label><input className="dw-input dw-input--wide" type="time" value={time} onChange={e => setTime(e.target.value)} /></div>
            </div>
            <div className="dw-nav"><button className="dw-back" onClick={() => setStep(1)}>← {t('donation.back')}</button><button className="dw-next" onClick={() => setStep(donationType === 'food' ? 3 : 4)} disabled={!date}>{t('donation.next')} →</button></div>
          </div>
        )}

        {step === 3 && (
          <div className="dw-step">
            <p className="dw-question">🚗 {t('donation.deliveryMethod')}</p>
            <div className="dw-method-row">
              {[['self-drive','🚗','selfDrive'],['volunteer-pickup','🤝','volunteerPickup'],['mail','📦','shipMail']].map(([key,icon,labelKey]) => (
                <button key={key} className={`dw-method-btn${method === key ? ' dw-method-btn--active' : ''}`} onClick={() => setMethod(key)}>
                  <span className="dw-method-icon">{icon}</span><span>{t(`donation.${labelKey}`)}</span>
                </button>
              ))}
            </div>
            <div className="dw-nav"><button className="dw-back" onClick={() => setStep(2)}>← {t('donation.back')}</button><button className="dw-next" onClick={() => setStep(4)} disabled={!method}>{t('donation.review')} →</button></div>
          </div>
        )}

        {step === 4 && (
          <div className="dw-step">
            <div className="dw-summary">
              <div className="dw-summary-row"><span className="dw-summary-label">{t('donation.to')}</span><span>{loc.name}</span></div>
              <div className="dw-summary-row"><span className="dw-summary-label">{t('donation.type')}</span><span>{donationType === 'food' ? `🍎 ${t('donation.food')}` : `💰 ${t('donation.money')}`}</span></div>
              {items && <div className="dw-summary-row"><span className="dw-summary-label">{t('donation.items')}</span><span>{items}</span></div>}
              {lbs && <div className="dw-summary-row"><span className="dw-summary-label">{t('donation.weight')}</span><span>{lbs} lbs</span></div>}
              {moneyAmount && donationType === 'money' && <div className="dw-summary-row"><span className="dw-summary-label">{t('donation.amount')}</span><span>${moneyAmount}</span></div>}
              {date && <div className="dw-summary-row"><span className="dw-summary-label">{t('donation.date')}</span><span>{date} {time}</span></div>}
              {method && <div className="dw-summary-row"><span className="dw-summary-label">{t('donation.delivery')}</span><span>{method}</span></div>}
            </div>
            <div className="dw-nav"><button className="dw-back" onClick={() => setStep(donationType === 'food' ? 3 : 2)}>← {t('donation.back')}</button><button className="dw-confirm" onClick={handleConfirm}>✅ {t('donation.confirm')}</button></div>
          </div>
        )}
      </section>
    </div>
  );
}

export default DonateToPage;
