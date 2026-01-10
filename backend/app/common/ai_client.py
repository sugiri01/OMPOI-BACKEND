import time
import logging
from typing import Optional, Dict, Any
import httpx
from app.core.config import settings
from app.common.exceptions import RateLimitError

logger = logging.getLogger(__name__)

class AIClient:
    def __init__(self):
        self.api_key = settings.OPENROUTER_API_KEY
        self.base_url = settings.OPENROUTER_BASE_URL
        self.default_model = settings.OPENROUTER_DEFAULT_MODEL
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "HTTP-Referer": "https://ompoi.com",
            "X-Title": "OMPOI",
            "Content-Type": "application/json"
        }
        
        # Rate limiting state
        self.last_call_time = 0
        self.calls_this_minute = 0
        self.minute_start_time = time.time()
        self.MAX_CALLS_PER_MINUTE = 20

    async def _check_rate_limit(self):
        current_time = time.time()
        
        # Reset counter if minute has passed
        if current_time - self.minute_start_time > 60:
            self.calls_this_minute = 0
            self.minute_start_time = current_time
        
        if self.calls_this_minute >= self.MAX_CALLS_PER_MINUTE:
            wait_time = 60 - (current_time - self.minute_start_time)
            raise RateLimitError(f"Global rate limit exceeded. Try again in {int(wait_time)} seconds.")
        
        self.calls_this_minute += 1
        self.last_call_time = current_time

    async def generate_completion(
        self, 
        prompt: str, 
        model: Optional[str] = None,
        temperature: float = 0.7
    ) -> Dict[str, Any]:
        """Generate completion using OpenRouter"""
        await self._check_rate_limit()
        
        model = model or self.default_model
        
        payload = {
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": temperature
        }
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers=self.headers,
                    json=payload,
                    timeout=30.0
                )
                response.raise_for_status()
                return response.json()
            except httpx.HTTPStatusError as e:
                logger.error(f"AI API error: {e.response.text}")
                raise
            except Exception as e:
                logger.error(f"AI Client error: {str(e)}")
                raise

ai_client = AIClient()
