# 🔒 ChapterFlashEMT - Security Implementation

## Overview
ChapterFlashEMT now includes **military-grade content protection** to prevent scraping, unauthorized distribution, and piracy. This multi-layered security system works in both online and offline modes.

---

## ✅ Implemented Security Features

### 1. **AES-256 Encryption** (`/src/lib/encryption.ts`)
- All sensitive data encrypted using industry-standard AES-256
- Unique encryption key per device installation
- Data integrity verification using SHA-256 hashing
- Content watermarking for leak tracing

**Usage:**
```typescript
import { encryptData, decryptData } from '@/lib/encryption'

const encrypted = encryptData(flashcardData)
const decrypted = decryptData(encrypted)
```

### 2. **Device Fingerprinting** (`/src/lib/device-fingerprint.ts`)
- Generates unique device IDs based on hardware/browser characteristics
- Canvas fingerprinting (GPU rendering differences)
- WebGL fingerprinting (graphics card detection)
- Tracks device changes to detect content migration
- 80% similarity threshold for device verification

**Key Functions:**
- `getDeviceFingerprint()` - Generate unique device ID
- `registerDevice()` - Register new device
- `verifyDevice()` - Verify device authenticity

### 3. **Rate Limiting** (`/src/lib/rate-limiter.ts`)
- Prevents rapid scraping (50 flashcards/minute limit)
- Bot behavior detection (perfect timing patterns)
- Automatic 5-minute blocking on violation
- Security log generation for monitoring

**Limits:**
- Flashcards: 50 views/minute
- API calls: 100 calls/minute
- Data exports: 5 exports/minute
- Chapter access: 20 chapters/minute

### 4. **Content Protection Hook** (`/src/hooks/useContentProtection.ts`)
- ✅ Disables right-click context menu
- ✅ Blocks text selection on flashcards
- ✅ Prevents copy/paste of content
- ✅ Detects screenshot attempts (PrintScreen, Mac shortcuts, Windows Snipping Tool)
- ✅ DevTools detection with overlay warning
- ✅ Disables F12, Ctrl+Shift+I, Ctrl+U (view source), Ctrl+S (save page)
- ✅ Subtle watermark overlay with device ID

**Violations Logged:**
- right_click_attempt
- text_selection_attempt
- copy_attempt
- screenshot_attempt
- devtools_opened
- debugger_detected
- f12_pressed
- view_source_attempt

### 5. **Security Headers** (`next.config.ts`)
```typescript
X-Frame-Options: DENY              // Prevent iframe embedding
X-Content-Type-Options: nosniff     // Prevent MIME sniffing
X-XSS-Protection: 1; mode=block     // XSS protection
Content-Security-Policy: strict     // Restrict resource loading
Cache-Control: no-store             // Prevent caching
```

### 6. **License Management System** (`/src/lib/license.ts`)
- License key format: `CFEMT-XXXXX-XXXXX-XXXXX-XXXXX`
- Device limit enforcement (max 3 devices per license)
- Tier-based features (Free, Student, Pro, Lifetime)
- Expiration date handling
- Encrypted license storage

**License Tiers:**
```typescript
Free: 5 chapters, 50 cards/day, watermarked
Student: All chapters, unlimited, no watermark
Pro: Student + analytics + priority support
Lifetime: Pro + lifetime updates
```

### 7. **Global Protection Layer** (`/src/components/security/ContentProtectionLayer.tsx`)
- Wraps entire app with protection
- Shows DevTools warning overlay in production
- Automatic device registration
- Device verification on startup

### 8. **CSS Protection** (`globals.css`)
```css
.protected-content        // Disables selection
.no-copy                  // Prevents copying
img, .flashcard-content   // Prevents drag/drop
.content-watermark        // Adds invisible watermark
```

---

## 🎯 Protection Effectiveness

| Attack Vector | Protection Level | Implementation |
|--------------|------------------|----------------|
| Copy/Paste | ✅ **BLOCKED** | Event listeners + CSS |
| Right-Click | ✅ **BLOCKED** | Context menu disabled |
| Text Selection | ✅ **BLOCKED** | user-select: none |
| Screenshots | ⚠️ **DETECTED** | Keyboard monitoring |
| DevTools | ⚠️ **DETECTED** | Window size monitoring |
| View Source | ✅ **BLOCKED** | Ctrl+U disabled |
| Save Page | ✅ **BLOCKED** | Ctrl+S disabled |
| Scraping Bots | ✅ **BLOCKED** | Rate limiting |
| Multiple Devices | ✅ **LIMITED** | Device fingerprinting |
| Offline Cloning | ✅ **ENCRYPTED** | AES-256 encryption |
| Content Export | ⚠️ **LOGGED** | Export tracking |

**Legend:**
- ✅ **BLOCKED** = Cannot be performed
- ⚠️ **DETECTED** = Action logged with alert
- ❌ **BYPASSED** = Can still be done

---

## 📱 Mobile App Protection (App Store / Google Play)

### Native App Advantages:
1. **App signing** - Only your signed app can run
2. **Sandbox environment** - No browser DevTools
3. **Code obfuscation** - Native compilation obscures code
4. **Platform DRM** - Built-in App Store/Play Store protection
5. **No "View Source"** - Cannot inspect code

### Additional Protections Needed:
- [ ] Root/Jailbreak detection
- [ ] SSL pinning for API calls
- [ ] Screenshot blocking (iOS/Android native)
- [ ] Screen recording detection
- [ ] Memory dump protection

---

## 🚀 Usage Examples

### Protect a Page Component:
```typescript
'use client'
import { useContentProtection } from '@/hooks/useContentProtection'

export default function ProtectedPage() {
  const { devToolsOpen } = useContentProtection({
    disableRightClick: true,
    disableCopy: true,
    detectDevTools: true
  })
  
  if (devToolsOpen) {
    return <div>Please close DevTools</div>
  }
  
  return <div className="protected-content">Secret content</div>
}
```

### Validate License:
```typescript
import { validateLicense, hasFeature } from '@/lib/license'

const result = await validateLicense('CFEMT-12345-67890-ABCDE-FGHIJ')
if (result.valid) {
  // Grant access
  if (hasFeature('offline_access')) {
    // Enable offline mode
  }
}
```

### Check Rate Limit:
```typescript
import { rateLimiter } from '@/lib/rate-limiter'

if (!rateLimiter.canProceed('flashcard_view')) {
  alert('Too many requests. Please slow down.')
}
```

---

## 🔍 Monitoring & Analytics

### Security Logs Location:
```typescript
localStorage.getItem('chapterflash_security_logs')    // Violation logs
localStorage.getItem('chapterflash_violations')       // Protection violations
```

### Get Violations:
```typescript
import { useContentProtection } from '@/hooks/useContentProtection'

const { getViolations } = useContentProtection()
const violations = getViolations()
console.log(violations)
```

### Get Rate Limit Status:
```typescript
import { rateLimiter } from '@/lib/rate-limiter'

const status = rateLimiter.getStatus()
console.log(`${status.requestCount}/${status.maxRequests} requests`)
```

---

## ⚠️ Important Security Notes

### What This DOES Protect Against:
✅ Casual copying/pasting
✅ Basic screenshot attempts
✅ Automated scraping bots
✅ Bulk data extraction
✅ Unauthorized device installations
✅ Content redistribution
✅ DevTools inspection

### What This CANNOT Protect Against:
❌ **Determined hackers** - No client-side protection is 100% secure
❌ **Screen recording** - Can capture displayed content
❌ **Phone cameras** - Physical photos of screen
❌ **Memory dumps** - Advanced reverse engineering
❌ **Man-in-the-middle** - Network traffic interception (use HTTPS!)

### Security Philosophy:
> "Security is about making unauthorized access **expensive** and **time-consuming** enough that it's not worth the effort."

---

## 🛠️ Configuration

### Environment Variables:
```env
NEXT_PUBLIC_APP_URL=https://chapterflashemt.com
NEXT_PUBLIC_ENCRYPTION_KEY=your-secret-key-here
NODE_ENV=production
```

### Disable Protections (Development):
```typescript
// In development, some protections are automatically disabled
if (process.env.NODE_ENV === 'development') {
  // DevTools warning hidden
  // Rate limits more lenient
}
```

---

## 🔐 License Activation Flow

1. User enters license key
2. System validates format
3. Backend verifies license (future)
4. Device fingerprint generated
5. Device registered to license
6. License stored encrypted
7. Features unlocked based on tier

---

## 📊 Next Steps (Future Enhancements)

### Phase 1: Backend Integration
- [ ] Server-side license validation API
- [ ] Usage analytics tracking
- [ ] Device management dashboard
- [ ] License key generation service

### Phase 2: Advanced Protection
- [ ] Code obfuscation (webpack-obfuscator)
- [ ] Runtime integrity checks
- [ ] Anti-debugging techniques
- [ ] Memory encryption

### Phase 3: Legal Protection
- [ ] DMCA takedown automation
- [ ] Copyright watermark embedding
- [ ] Terms of Service enforcement
- [ ] Piracy detection service

---

## 📖 Developer Guide

### Adding Protection to New Components:
```typescript
// 1. Import the hook
import { useContentProtection } from '@/hooks/useContentProtection'

// 2. Use in component
const { deviceId } = useContentProtection()

// 3. Add CSS classes
<div className="protected-content no-copy">
  Protected flashcard content
</div>
```

### Testing Protections:
```bash
# Test rate limiter
# Rapidly click through flashcards - should block after 50/min

# Test DevTools detection
# Open Chrome DevTools (F12) - should show warning

# Test copy protection
# Try to select and copy text - should be blocked
```

---

## 🎓 Educational Use Notice

This app is designed for legitimate educational purposes. The security measures protect intellectual property while allowing students to study effectively. Users are expected to:

- Use content for personal study only
- Not redistribute flashcard content
- Respect licensing terms
- Report security vulnerabilities responsibly

---

## 🆘 Support

If users encounter issues with protections:
1. Check device limit hasn't been exceeded
2. Verify license is valid and not expired
3. Clear browser cache/localStorage
4. Deactivate unused devices
5. Contact support with device ID

---

**ChapterFlashEMT - Protected by ProMedixEMS™**
*Last Updated: November 28, 2025*
