#!/usr/bin/env bash
# 데이터베이스 마이그레이션 실행
python manage.py migrate

# 정적 파일 수집
python manage.py collectstatic --no-input